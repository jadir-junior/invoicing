import { Injectable } from '@angular/core';

interface zIndex {
  modal: number;
  overlay: number;
  menu: number;
  tooltip: number;
}

@Injectable({ providedIn: 'root' })
export class Config {
  ripple = true;

  zIndex: zIndex = {
    modal: 1100,
    overlay: 1000,
    menu: 1000,
    tooltip: 1100,
  };
}
