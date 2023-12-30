interface Dimensions {
  width: number;
  height: number;
}

interface Viewport {
  width: number;
  height: number;
}

export class DomHandler {
  public static isElement(obj: HTMLElement | string) {
    return typeof HTMLElement === 'object'
      ? obj instanceof HTMLElement
      : obj &&
          typeof obj === 'object' &&
          obj !== null &&
          obj.nodeType === 1 &&
          obj.nodeName === 'string';
  }

  public static appendChild(
    element: HTMLElement,
    target: HTMLElement | string
  ) {
    if (this.isElement(target)) {
      (target as HTMLElement).appendChild(element);
    } else if (target) {
      // TODO target.el target.el.nativeElement
      // (target as ElementRef).nativeElement.r;
    } else {
      throw `Cannot append ${target} to ${element}`;
    }
  }

  public static relativePosition(
    element: HTMLElement,
    target: HTMLElement
  ): void {
    const elementDimensions = element.offsetParent
      ? { width: element.offsetWidth, height: element.offsetHeight }
      : this.getHiddenElementDimensions(element);
    const targetHeight = target.offsetHeight;
    const targetOffset = target.getBoundingClientRect();
    const windowScrollTop = this.getWindowScrollTop();
    const windowScrollLeft = this.getWindowScrollLeft();
    const viewport = this.getViewport();
    const relativeElement = this.getClosestRelativeElement(element);
    const relativeElementOffset = relativeElement?.getBoundingClientRect() || {
      top: -1 * windowScrollTop,
      left: -1 * windowScrollLeft,
    };
    let top: number;
    let left: number;

    if (
      targetOffset.top + targetHeight + elementDimensions.height >
      viewport.height
    ) {
      top =
        targetOffset.top - relativeElementOffset.top - elementDimensions.height;
      element.style.transformOrigin = 'bottom';
      if (targetOffset.top + top < 0) {
        top = -1 * targetOffset.top;
      }
    } else {
      top = targetHeight + targetOffset.top - relativeElementOffset.top;
      element.style.transformOrigin = 'top';
    }

    const horizontalOverflow =
      targetOffset.left + elementDimensions.width - viewport.width;
    const targetLeftOffsetInSpaceOfRelativeElement =
      targetOffset.left - relativeElementOffset.left;
    if (elementDimensions.width > viewport.width) {
      // element wider then viewport and cannot fir on screen (align at left side of viewport)
      left = (targetOffset.left - relativeElementOffset.left) * -1;
    } else if (horizontalOverflow > 0) {
      // element wider then viewport but can be fit on screen (align at right side of viewport)
      left = targetLeftOffsetInSpaceOfRelativeElement - horizontalOverflow;
    } else {
      // element fits on screen (align with target)
      left = targetOffset.left - relativeElementOffset.left;
    }

    element.style.top = `${top}px`;
    element.style.left = `${left}px`;
  }

  public static absolutePosition(
    element: HTMLElement,
    target: HTMLElement
  ): void {
    const elementDimensions = element.offsetParent
      ? { width: element.offsetWidth, height: element.offsetHeight }
      : this.getHiddenElementDimensions(element);
    const elementOuterHeight = elementDimensions.height;
    const elementOuterWidth = elementDimensions.width;
    const targetOuterHeight = target.offsetHeight;
    const targetOuterWidth = target.offsetWidth;
    const targetOffset = target.getBoundingClientRect();
    const windowScrollTop = this.getWindowScrollTop();
    const windowScrollLeft = this.getWindowScrollLeft();
    const viewport = this.getViewport();
    let top: number;
    let left: number;

    if (
      targetOffset.top + targetOuterHeight + elementOuterHeight >
      viewport.height
    ) {
      top = targetOffset.top + windowScrollTop - elementOuterHeight;
      element.style.transformOrigin = 'bottom';

      if (top < 0) {
        top = windowScrollTop;
      }
    } else {
      top = targetOuterHeight + targetOffset.top + windowScrollTop;
      element.style.transformOrigin = 'top';
    }

    if (targetOffset.left + elementOuterWidth > viewport.width) {
      left = Math.max(
        0,
        targetOffset.left +
          windowScrollLeft +
          targetOuterWidth -
          elementOuterWidth
      );
    } else {
      left = targetOffset.left + windowScrollLeft;
    }

    element.style.top = `${top}px`;
    element.style.left = `${left}px`;
  }

  private static getClosestRelativeElement(
    element: HTMLElement | null
  ): HTMLElement | null {
    if (!element) {
      return null;
    }

    return getComputedStyle(element).getPropertyValue('position') === 'relative'
      ? element
      : this.getClosestRelativeElement(element.parentElement);
  }

  public static getHiddenElementDimensions(element: HTMLElement): Dimensions {
    element.style.visibility = 'hidden';
    element.style.display = 'block';

    const dimensions: Dimensions = {
      width: element.offsetWidth,
      height: element.offsetHeight,
    };

    element.style.display = 'none';
    element.style.visibility = 'visible';

    return dimensions;
  }

  public static getWindowScrollTop(): number {
    const doc = document.documentElement;
    return (window.scrollY || doc.scrollTop) - (doc.clientTop || 0);
  }

  public static getWindowScrollLeft(): number {
    const doc = document.documentElement;
    return (window.scrollX || doc.scrollLeft) - (doc.clientLeft || 0);
  }

  public static getViewport(): Viewport {
    const element = document.documentElement;
    const body = document.getElementsByTagName('body')[0];
    const width = window.innerWidth || element.clientWidth || body.clientWidth;
    const height =
      window.innerHeight || element.clientHeight || body.clientHeight;

    return { width, height };
  }

  public static isTouchDevice(): boolean {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  public static getParents(element: Node, parents: Node[] = []): Node[] {
    return element['parentNode'] === null
      ? parents
      : this.getParents(
          element.parentNode,
          parents.concat([element.parentNode])
        );
  }

  public static findSingle(
    element: HTMLElement,
    selector: string
  ): HTMLElement | null {
    return this.isElement(element) ? element.querySelector(selector) : null;
  }

  public static getAttribute(
    element: HTMLElement,
    name: string
  ): string | number | boolean | null | undefined {
    if (element) {
      const value = element.getAttribute(name);

      if (value && !isNaN(+value)) {
        return +value;
      }

      if (value === 'true' || value === 'false') {
        return value === 'true';
      }

      return value;
    }

    return undefined;
  }

  public static removeClass(element: HTMLElement, className: string): void {
    if (element && className) {
      if (element.classList) {
        element.classList.remove(className);
      } else {
        element.className = element.className.replace(
          new RegExp(
            '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
            'gi'
          ),
          ' '
        );
      }
    }
  }

  public static getHeight(element: HTMLElement): number {
    let height = element.offsetHeight;
    const style = getComputedStyle(element);

    height -=
      parseFloat(style.paddingTop) +
      parseFloat(style.paddingBottom) +
      parseFloat(style.borderTopWidth) +
      parseFloat(style.borderBottomWidth);

    return height;
  }

  public static getWidth(element: HTMLElement): number {
    let width = element.offsetWidth;
    const style = getComputedStyle(element);

    width -=
      parseFloat(style.paddingLeft) +
      parseFloat(style.paddingRight) +
      parseFloat(style.borderLeftWidth) +
      parseFloat(style.borderRightWidth);

    return width;
  }

  public static getOuterWidth(element: HTMLElement, margin?: boolean): number {
    let width = element.offsetWidth;

    if (margin) {
      const style = getComputedStyle(element);
      width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    }

    return width;
  }

  public static getOuterHeight(element: HTMLElement, margin?: boolean): number {
    let height = element.offsetHeight;

    if (margin) {
      const style = getComputedStyle(element);
      height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
    }

    return height;
  }

  // public static overflowCheck(node: Node): boolean {
  // const overflowRegex = /(auto|scroll)/;
  // const styleDeclaration = window['getComputedStyle'](node, null);
  // return (
  //   overflowRegex.test(styleDeclaration.getPropertyValue('overflow')) ||
  //   overflowRegex.test(styleDeclaration.getPropertyValue('overflowX')) ||
  //   overflowRegex.test(styleDeclaration.getPropertyValue('overflowY'))
  // );
  // }

  // public static getScrollableParents(element: HTMLElement) {
  // let scrollableParents = [];
  // if (element) {
  //   const parents = this.getParents(element);
  //   for (const parent of parents) {
  //     if (parent.nodeType !== 9 && this.overflowCheck(parent)) {
  //     }
  //   }
  // }
  // }
}
