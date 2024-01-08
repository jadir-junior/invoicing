import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from '../../template/template.component';
import { ItemToggleEvent, MenuItem, ProcessedItem } from '../menu-item.model';
import { PanelMenuSubComponent } from './panel-menu-sub.component';

@Component({
  selector: 'iv-panel-menu-list',
  standalone: true,
  imports: [CommonModule, PanelMenuSubComponent],
  templateUrl: './panel-menu-list.component.html',
  styleUrl: './panel-menu.component.css',
})
export class PanelMenuListComponent implements OnChanges {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  activeItemPath = signal<any[]>([]);
  processedItems = signal<ProcessedItem[]>([]);

  @Input() panelId?: string;
  @Input() items?: MenuItem[];
  @Input() itemTemplate?: TemplateRef<TemplateComponent>;
  @Input() transitionOptions?: string;
  @Input() activeItem?: MenuItem | null;
  @Input() tabindex?: number;
  @Input() root = false;
  @Input() parentExpanded = false;

  @ViewChild('submenu') subMenuViewChild?: TemplateRef<TemplateComponent>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['items'] && changes['items'].currentValue) {
      this.processedItems.set(
        this.createProcessedItems(changes['items'].currentValue || []),
      );
    }
  }

  createProcessedItems(
    items: MenuItem[],
    level = 0,
    parent = {},
    parentKey = '',
  ): ProcessedItem[] {
    const processedItems: ProcessedItem[] = [];

    items?.forEach((item, index) => {
      const key = (parentKey !== '' ? parentKey + '_' : '') + index;
      const newProcessedItem: ProcessedItem = {
        icon: item.icon ?? '',
        expanded: item.expanded ?? false,
        separator: item.separator ?? false,
        item: item,
        index: index,
        level: level,
        key: key,
        parent: parent,
        parentKey: parentKey,
      };

      if (item.items) {
        newProcessedItem['items'] = this.createProcessedItems(
          item.items,
          level + 1,
          newProcessedItem,
          key,
        );
      }

      processedItems.push(newProcessedItem);
    });

    return processedItems;
  }

  isItemActive(processedItem: MenuItem) {
    return this.activeItemPath().some(
      (path) => path.key === processedItem.parentKey,
    );
  }

  onItemToggle(event: ItemToggleEvent): void {
    const { processedItem, expanded } = event;
    if (processedItem?.expanded) {
      processedItem.expanded = !processedItem?.expanded;
    }

    const activeItemPath = this.activeItemPath().filter(
      (p) => p.parentKey !== processedItem?.parentKey,
    );
    expanded && activeItemPath.push(processedItem);

    this.activeItemPath.set(activeItemPath);
    this.processedItems.update((value) =>
      value.map((i) => (i === processedItem ? processedItem : i)),
    );
  }
}
