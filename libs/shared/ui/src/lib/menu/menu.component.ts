import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  Renderer2,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { OverlayService } from '../services/overlay.service';
import {
  AnimationEvent,
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ZIndexUtils } from '../utils/z-index-utils/z-index-utils';
import { Config } from '../utils/config/config';
import { DomHandler } from '../utils/dom/dom-handler';
import { MenuItem } from './menu-item.model';
import { MenuItemContentComponent } from './menu-item-content.component';

type VoidListener = VoidFunction | null | undefined;

interface Menu {
  currentTarget: HTMLElement;
  target: HTMLElement;
  relativeAlign: boolean | undefined;
}

type MenuEventClick = Event & { originalEvent: Event; item: MenuItem };

type MenuEvent = Event & Menu;

@Component({
  selector: 'iv-menu',
  standalone: true,
  imports: [CommonModule, MenuItemContentComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  animations: [
    trigger('overlayAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scaleY(0.8)' }),
        animate('{{showTransitionParams}}'),
      ]),
      transition(':leave', [
        animate('{{hideTransitionParams}}', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class MenuComponent {
  @Input() popup = false;
  @Input() autoIndex = true;
  @Input() baseZIndex = 0;
  @Input() appendTo: 'body' | HTMLElement = 'body';

  @Input() showTransitionOptions = '.12s cubic-bezier(0, 0, 0.2, 1)';
  @Input() hideTransitionOptions = '.1s linear';

  @Input() model?: MenuItem[];

  @Output() onShow = new EventEmitter();

  @ViewChild('container') containerViewChild?: ElementRef;

  container?: HTMLDivElement;
  target?: HTMLElement;
  overlayVisible = false;
  focused = false;
  visible = false;
  preventDocumentDefault = false;
  relativeAlign = false;

  documentClickListener: VoidListener;
  documentResizeListener: VoidListener;

  renderer = inject(Renderer2);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private cd: ChangeDetectorRef,
    private overlayService: OverlayService,
    private el: ElementRef
  ) {}

  hasSubMenu(): boolean {
    if (this.model) {
      for (const item of this.model) {
        if (item.items) {
          return true;
        }
      }
    }

    return false;
  }

  toggle(event: MenuEvent): void {
    if (this.visible) {
      this.hide();
    } else {
      // check to add more features in show
      this.show(event);
    }

    this.preventDocumentDefault = true;
  }

  show(event: MenuEvent): void {
    this.target = event.currentTarget;
    this.relativeAlign = event.relativeAlign ?? false;
    this.visible = true;
    this.preventDocumentDefault = true;
    this.overlayVisible = true;
    this.cd.markForCheck();
  }

  onOverlayAnimationStart(event: AnimationEvent): void {
    switch (event.toState) {
      case 'visible':
        if (this.popup) {
          this.container = event.element;
          this.moveOnTop();
          this.onShow.emit();
          this.appendOverlay();
          this.alignOverlay();
          this.bindDocumentClickListener();
          this.bindDocumentResizeListener();
          // TODO bindScrollListener();
          // TODO DomHandle.focus(this.listViewChild.nativeElement)
          // TODO changeFocusedOptionsIndex(0)
        }
        break;
      case 'void':
        // onOverlayHide()
        // onHide.emit();
        break;
    }
  }

  hide(): void {
    this.visible = false;
    this.relativeAlign = false;
    this.cd.markForCheck();
  }

  onOverlayClick(event: Event) {
    if (this.popup) {
      this.overlayService.add({
        originalEvent: event,
        target: this.el.nativeElement,
      });
    }

    this.preventDocumentDefault = true;
  }

  private moveOnTop(): void {
    if (this.autoIndex && this.container) {
      ZIndexUtils.set(
        'menu',
        this.container,
        this.baseZIndex + Config.zIndex.menu
      );
    }
  }

  private appendOverlay(): void {
    if (this.appendTo && this.container) {
      if (this.appendTo === 'body') {
        this.renderer.appendChild(this.document.body, this.container);
      } else {
        DomHandler.appendChild(this.container, this.appendTo);
      }
    }
  }

  private alignOverlay(): void {
    if (this.container && this.target) {
      if (this.relativeAlign) {
        DomHandler.relativePosition(this.container, this.target);
      } else {
        DomHandler.absolutePosition(this.container, this.target);
      }
    }
  }

  private bindDocumentResizeListener(): void {
    if (!this.documentResizeListener) {
      const window = this.document.defaultView;
      this.documentResizeListener = this.renderer.listen(
        window,
        'resize',
        this.onWindowResize.bind(this)
      );
    }
  }

  private bindDocumentClickListener(): void {
    // TODO REFACTOR WITH CORRECT TYPES
    if (!this.documentClickListener) {
      const documentTarget: HTMLElement = this.el
        ? this.el.nativeElement.ownerDocument
        : 'document';

      this.documentClickListener = this.renderer.listen(
        documentTarget,
        'click',
        (event: MenuEvent) => {
          const isOutsiseContainer =
            this.containerViewChild?.nativeElement &&
            !this.containerViewChild?.nativeElement.contains(event.target);
          const isOutsideTarget = !(
            this.target &&
            (this.target === event.target || this.target.contains(event.target))
          );
          if (!this.popup && isOutsiseContainer && isOutsideTarget) {
            // TODO onListBlur()
            // this.onListBlur();
          }

          if (
            this.preventDocumentDefault &&
            this.overlayVisible &&
            isOutsiseContainer &&
            isOutsideTarget
          ) {
            this.hide();
            this.preventDocumentDefault = false;
          }
        }
      );
    }
  }

  private bindScrollListener(): void {
    // if(!this.scr)
  }

  private onWindowResize(): void {
    if (this.visible && !DomHandler.isTouchDevice()) {
      this.hide();
    }
  }

  onListBlur(): void {
    this.focused = false;
    // TODO changeFocusedOptionIndex
    // TODO selectedOptionIndex.set
    // TODO focusedOptionIndex.set
    // TODO onBlur.emit
  }

  itemClick(event: MenuEventClick): void {
    const { originalEvent, item } = event;

    if (item.disabled) {
      originalEvent.preventDefault();
      return;
    }

    if (item.command) {
      item.command({
        originalEvent,
        item,
      });
    }

    if (this.popup) {
      this.hide();
    }
  }

  get menuClasses() {
    return {
      'iv-menu': true,
      'iv-menu-overlay': this.popup,
    };
  }
}
