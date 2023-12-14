import { ElementRef } from '@angular/core';

export interface Message {
  originalEvent?: Event;
  target: ElementRef;
}
