import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'iv-icon',
  standalone: true,
  imports: [CommonModule],
  template: `@if (icon) {
    <span class="material-icons-outlined"> {{ icon }} </span>
  }`,
})
export class IconComponent {
  @Input() icon?: string;
}
