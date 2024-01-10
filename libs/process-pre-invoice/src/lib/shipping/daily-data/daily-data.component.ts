import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CardComponent,
  IconComponent,
  PageEvent,
  PaginatorComponent,
} from '@invoicing/ui';

@Component({
  selector: 'invoicing-daily-data',
  standalone: true,
  imports: [CommonModule, CardComponent, PaginatorComponent, IconComponent],
  templateUrl: './daily-data.component.html',
  styleUrl: './daily-data.component.css',
})
export class DailyDataComponent {
  first = 0;
  rows = 10;

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
  }
}
