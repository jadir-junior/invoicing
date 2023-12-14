/* eslint-disable @typescript-eslint/no-explicit-any */

import { DomHandler } from './dom-handler';

export class ConnectOverlayScrollHandler {
  // TODO REFACTOR TO CORRECT TYPES
  element: HTMLElement | null = null;
  listener: any | null = null;
  scrollableParents: HTMLElement[] | null = null;

  constructor(element: HTMLElement, listener: VoidFunction) {
    this.element = element;
    this.listener = listener;
  }

  bindScrollListener(): void {
    // this.scrollableParents = DomHandler.get
  }
}
