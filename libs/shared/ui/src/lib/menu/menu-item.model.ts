export interface MenuItem {
  command?(event: MenuItemCommandEvent): void;
  disabled?: boolean;
  escape?: boolean;
  icon?: string;
  id?: string;
  items?: MenuItem[];
  label?: string;
  separator?: boolean;
  // TODO refactor type routerLink
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  routerLink?: any;
}

export interface MenuItemCommandEvent {
  originalEvent?: Event;
  item?: MenuItem;
  index?: number;
}
