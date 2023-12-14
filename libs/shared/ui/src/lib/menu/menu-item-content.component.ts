import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from './menu-item.model';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[ivMenuItemContent]',
  standalone: true,
  imports: [CommonModule],
  template: `<div
    class="iv-menuitem-content"
    (click)="onItemClick($event, item)"
  >
    @if(!itemTemplate) { @if(!item?.routerLink) {
    <a
      [attr.tabindex]="-1"
      [attr.aria-hidden]="true"
      [attr.aria-label]="item.label"
      [ngClass]="{ 'iv-disabled': item.disabled }"
      class="iv-menuitem-link"
    >
      <ng-container
        *ngTemplateOutlet="itemContent; context: { $implicit: item }"
      ></ng-container>
    </a>
    } }

    <ng-template #itemContent>
      @if(item?.icon) {
      <span class="material-icons-outlined iv-menuitem-icon">{{
        item.icon
      }}</span>
      } @if(item.escape !== false) {
      <span class="iv-menuitem-text">{{ item.label }}</span>
      }
    </ng-template>
  </div>`,
  styleUrl: './menu.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class MenuItemContentComponent {
  @Input('ivMenuItemContent') item?: MenuItem;

  @Input() itemTemplate?: HTMLElement;

  @Output() onMenuItemClick = new EventEmitter();

  onItemClick(event: Event, item: MenuItem): void {
    this.onMenuItemClick.emit({ originalEvent: event, item });
  }
}
