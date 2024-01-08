export interface MenuItem {
  command?(event: MenuItemCommandEvent): void;
  disabled?: boolean;
  escape?: boolean;
  icon?: string;
  id?: string;
  items?: MenuItem[];
  label?: string;
  separator?: boolean;
  visible?: boolean;
  expanded?: boolean;
  url?: string;
  target?: string;
  title?: string;
  key?: string;
  parentKey?: string;
  // TODO refactor type routerLink
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  routerLink?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface MenuItemCommandEvent {
  originalEvent?: Event;
  item?: MenuItem;
  index?: number;
}

export interface ItemToggleEvent {
  originalEvent: Event;
  processedItem?: ProcessedItem;
  expanded?: boolean;
}

export interface ProcessedItem {
  icon?: string;
  expanded?: boolean;
  separator?: boolean;
  item: MenuItem;
  items?: ProcessedItem[];
  index: number;
  level: number;
  key: string;
  parent: MenuItem;
  parentKey: string;
}
