import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  InjectionToken,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { Config } from '../utils/config/config';
import { VoidListener } from '../utils/types/listener';
import { DomHandler } from '../utils/dom/dom-handler';

@Directive({
  selector: '[ivRipple]',
  standalone: true,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'iv-ripple',
  },
})
export class RippleDirective implements AfterViewInit, OnDestroy {
  animationListener: VoidListener;
  mouseDownListener: VoidListener;
  timeout?: NodeJS.Timeout;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: InjectionToken<unknown>,
    private renderer: Renderer2,
    public config: Config,
    public zone: NgZone,
    public el: ElementRef
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.config && this.config.ripple) {
        this.zone.runOutsideAngular(() => {
          this.create();
          this.mouseDownListener = this.renderer.listen(
            this.el.nativeElement,
            'mousedown',
            this.onMouseDown.bind(this)
          );
        });
      }
    }
  }

  ngOnDestroy(): void {
    if (this.config && this.config.ripple) {
      this.remove();
    }
  }

  getInk(): HTMLElement | null {
    const children: HTMLElement[] = this.el.nativeElement.children;
    for (let i = 0; i < children.length; i++) {
      if (
        typeof children[i].className === 'string' &&
        children[i].className.indexOf('iv-ink') !== -1
      ) {
        return children[i];
      }
    }

    return null;
  }

  onMouseDown(event: MouseEvent): void {
    const ink = this.getInk();
    if (
      !ink ||
      this.document.defaultView?.getComputedStyle(ink, null).display === 'none'
    ) {
      return;
    }

    DomHandler.removeClass(ink, 'iv-ink-active');

    if (!DomHandler.getHeight(ink) && !DomHandler.getWidth(ink)) {
      const dimension = Math.max(
        DomHandler.getOuterWidth(ink),
        DomHandler.getOuterHeight(this.el.nativeElement)
      );
      ink.style.height = dimension + 'px';
      ink.style.width = dimension + 'px';
    }

    const offset = DomHandler.getOffset(this.el.nativeElement);
    const x =
      event.pageX -
      offset.left +
      this.document.body.scrollTop -
      DomHandler.getWidth(ink) / 2;
    const y =
      event.pageY -
      offset.top +
      this.document.body.scrollLeft -
      DomHandler.getHeight(ink) / 2;

    this.renderer.setStyle(ink, 'top', y + 'px');
    this.renderer.setStyle(ink, 'left', x + 'px');
    DomHandler.addClass(ink, 'iv-ink-active');

    this.timeout = setTimeout(() => {
      const ink = this.getInk();
      if (ink) {
        DomHandler.removeClass(ink, 'iv-ink-active');
      }
    }, 401);
  }

  onAnimationEnd(event: Event): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    DomHandler.removeClass(
      event.currentTarget as HTMLElement,
      'iv-link-active'
    );
  }

  create(): void {
    const ink = this.renderer.createElement('span');
    this.renderer.addClass(ink, 'iv-ink');
    this.renderer.appendChild(this.el.nativeElement, ink);
    this.renderer.setAttribute(ink, 'aria-hidden', 'true');
    this.renderer.setAttribute(ink, 'role', 'presentation');

    if (!this.animationListener) {
      this.animationListener = this.renderer.listen(
        ink,
        'animationend',
        this.onAnimationEnd.bind(this)
      );
    }
  }

  remove(): void {
    const ink = this.getInk();
    if (ink) {
      this.mouseDownListener && this.mouseDownListener();
      this.animationListener && this.animationListener();
      this.mouseDownListener = null;
      this.animationListener = null;

      DomHandler.removeElement(ink);
    }
  }
}
