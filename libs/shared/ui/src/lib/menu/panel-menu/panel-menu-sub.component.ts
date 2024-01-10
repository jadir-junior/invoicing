import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
  forwardRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from '../../template/template.component';
import { ItemToggleEvent, MenuItem, ProcessedItem } from '../menu-item.model';
import { ObjectUtils } from '../../utils/object-utils/object-utils';
import { PanelMenuAnimation, PanelMenuComponent } from './panel-menu.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RouterModule } from '@angular/router';
import { RippleDirective } from '../../ripple/ripple.directive';

@Component({
  selector: 'iv-panel-menu-sub',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RippleDirective,
    forwardRef(() => PanelMenuComponent),
  ],
  templateUrl: './panel-menu-sub.component.html',
  styleUrl: './panel-menu.component.css',
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('submenu', [
      state('hidden', style({ height: '0' })),
      state('visible', style({ height: '*' })),
      transition('visible <=> hidden', [animate('{{transitionParams}}')]),
      transition('void => *', animate(0)),
    ]),
  ],
})
export class PanelMenuSubComponent {
  @Input() root = false;
  @Input() parentExpanded = false;

  @Input() panelId?: string;
  @Input() itemTemplate?: TemplateRef<TemplateComponent>;
  @Input() activeItemPath: MenuItem[] = [];
  @Input() transitionOptions?: string;
  @Input() items?: ProcessedItem[];
  @Input() level = 0;

  @Output() itemToggle = new EventEmitter<ItemToggleEvent>();
  @Output() menuFocus = new EventEmitter();
  @Output() menuBlur = new EventEmitter();

  panelMenu = inject(PanelMenuComponent);

  getItemProp(
    processedItem: ProcessedItem,
    name: string,
    params?: { originalEvent: Event; item: MenuItem },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any {
    return processedItem && processedItem.item
      ? ObjectUtils.getItemValue(processedItem.item[name], params)
      : undefined;
  }

  getAnimation(processedItem: ProcessedItem): PanelMenuAnimation {
    return this.isItemActive(processedItem)
      ? {
          value: 'visible',
          params: {
            transitionParams: this.transitionOptions,
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

  getItemId(processedItem: ProcessedItem): string {
    return processedItem.item?.id ?? `${this.panelId}_${processedItem.key}`;
  }

  isItemVisible(processedItem: MenuItem): boolean {
    return processedItem.visible !== false;
  }

  isItemGroup(processedItem: MenuItem): boolean {
    return ObjectUtils.isNotEmpty(processedItem.items);
  }

  isItemExpanded(processedItem: MenuItem): boolean {
    return !!processedItem.expanded;
  }

  isItemActive(processedItem: MenuItem): boolean {
    return (
      this.isItemExpanded(processedItem) ||
      this.activeItemPath.some((path) => path?.key === processedItem?.key)
    );
  }

  isItemDisabled(processedItem: ProcessedItem): boolean {
    return this.getItemProp(processedItem, 'disabled') ? true : false;
  }

  onItemClick(event: Event, processedItem: ProcessedItem): void {
    if (!this.isItemDisabled(processedItem)) {
      this.getItemProp(processedItem, 'command', {
        originalEvent: event,
        item: processedItem.item,
      });

      this.itemToggle.emit({
        originalEvent: event,
        processedItem: processedItem,
        expanded: !this.isItemActive(processedItem),
      });
    }
  }

  onItemToggle(event: ItemToggleEvent) {
    this.itemToggle.emit(event);
  }
}
