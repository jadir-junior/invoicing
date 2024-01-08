import {
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
  signal,
  AfterContentInit,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../menu-item.model';
import { Style } from '../../models/style.model';
import { DomHandler } from '../../utils/dom/dom-handler';
import { ObjectUtils } from '../../utils/object-utils/object-utils';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { TemplateComponent } from '../../template/template.component';
import { IvTemplate } from '../../template/iv-template.directive';
import { RippleDirective } from '../../ripple/ripple.directive';
import { PanelMenuListComponent } from './panel-menu-list.component';
import { PanelMenuSubComponent } from './panel-menu-sub.component';

interface AnimationParams {
  transitionParams?: string;
  height: string;
}

export interface PanelMenuAnimation {
  value: string;
  params: AnimationParams;
}

@Component({
  selector: 'iv-panel-menu',
  standalone: true,
  imports: [
    CommonModule,
    RippleDirective,
    PanelMenuListComponent,
    PanelMenuSubComponent,
  ],
  templateUrl: './panel-menu.component.html',
  styleUrl: './panel-menu.component.css',
  animations: [
    trigger('rootItem', [
      state('hidden', style({ height: '0' })),
      state('visible', style({ height: '*' })),
      transition('visible <=> hidden', [animate('{{transitionParams}}')]),
      transition('void => *', animate(0)),
    ]),
  ],
})
export class PanelMenuComponent implements AfterContentInit {
  activeItem = signal<MenuItem | null>(null);
  animating = false;

  @Input() model?: MenuItem[];
  @Input() style?: Style;
  @Input() transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
  @Input() id?: string;
  @Input() tabindex = 0;

  @ViewChild('container') containerViewChild?: ElementRef;

  @ContentChildren(IvTemplate) templates?: QueryList<IvTemplate>;

  submenuIconTemplate: TemplateRef<TemplateComponent> | null = null;
  itemTemplate?: TemplateRef<TemplateComponent>;

  ngAfterContentInit(): void {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case 'submenuicon':
          this.submenuIconTemplate = item.template;
          break;
        default:
          this.itemTemplate = item.template;
          break;
      }
    });
  }

  isItemDisabled(item: MenuItem): boolean {
    return item.disabled ?? false;
  }

  isItemActive(item: MenuItem): boolean {
    return item.expanded ? true : false;
  }

  isItemVisible(item: MenuItem): boolean {
    return item?.visible !== false;
  }

  isItemGroup(item: MenuItem) {
    const v = ObjectUtils.isNotEmpty(item.items);
    return v;
  }

  changeActiveItem(item: MenuItem, selfActive = false): void {
    if (!this.isItemDisabled(item)) {
      let activeItem;

      if (selfActive) {
        activeItem = item;
      } else {
        if (this.activeItem && ObjectUtils.equals(item, this.activeItem)) {
          activeItem = null;
        } else {
          activeItem = item;
        }
      }

      this.activeItem.set(activeItem);
    }
  }

  onToggleDone(): void {
    this.animating = false;
  }

  onHeaderClick(event: Event, item: MenuItem): void {
    if (this.isItemDisabled(item)) {
      event.preventDefault();
      return;
    }

    if (item.command) {
      item.command({ originalEvent: event, item });
    }

    // TODO: IF MULTIPLE

    item.expanded = !item.expanded;
    this.changeActiveItem(item);
    this.animating = true;
    DomHandler.focus(event.currentTarget as HTMLElement);
  }

  findNextHeader(
    panelElement: HTMLElement | Element | null,
    selfCheck = false,
  ): HTMLElement | null {
    const nextPanelElement = selfCheck
      ? panelElement
      : panelElement?.nextElementSibling;

    if (nextPanelElement) {
      const headerElement = DomHandler.findSingle(
        nextPanelElement,
        '[data-pc-section]="header"',
      );

      return headerElement
        ? DomHandler.getAttribute(headerElement, 'data-p-disabled')
          ? this.findNextHeader(headerElement.parentElement)
          : headerElement
        : null;
    }

    return null;
  }

  findPrevHeader(
    panelElement: HTMLElement | null,
    selfCheck = false,
  ): HTMLElement | null {
    const prevPanelElement = selfCheck
      ? panelElement
      : panelElement?.previousElementSibling;

    if (prevPanelElement) {
      const headerElement = DomHandler.findSingle(
        prevPanelElement,
        '[data-pc-section="header"]',
      );

      return headerElement
        ? DomHandler.getAttribute(headerElement, 'data-p-disabled')
          ? this.findPrevHeader(headerElement.parentElement)
          : headerElement
        : null;
    }

    return null;
  }

  findFirstHeader() {
    return this.findNextHeader(
      this.containerViewChild?.nativeElement.firstElementChild,
      true,
    );
  }

  getPanelId(index: number, item: MenuItem): string {
    return item && item.id ? item.id : `${this.id}_${index}`;
  }

  getAnimation(item: MenuItem): PanelMenuAnimation {
    return item.expanded
      ? {
          value: 'visible',
          params: {
            transitionParams: this.animating ? this.transitionOptions : '0ms',
            height: '*',
          },
        }
      : {
          value: 'hidden',
          params: {
            transitionParams: this.transitionOptions,
            height: '0',
          },
        };
  }

  get panelMenuClass() {
    return {
      'iv-panelmenu': true,
    };
  }
}
