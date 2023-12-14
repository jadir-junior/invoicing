interface zIndex {
  modal: number;
  overlay: number;
  menu: number;
  tooltip: number;
}

export class Config {
  static zIndex: zIndex = {
    modal: 1100,
    overlay: 1000,
    menu: 1000,
    tooltip: 1100,
  };
}
