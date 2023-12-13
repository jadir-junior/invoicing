import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'iv-item-center',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="iv-item-center">
      <div class="iv-item-center-divider"></div>
      @if(label) {
      <div class="iv-item-center-content">{{ label }}</div>
      } @else {
      <div class="iv-item-center-content">
        <ng-content></ng-content>
      </div>
      }
      <div class="iv-item-center-divider"></div>
    </div>
  `,
  styles: `
    .iv-item-center-divider {
      flex: 1 1 auto;
      border: 1px solid #e2e8f0;
      border-top: 1px;
    }

    .iv-item-center {
      display: flex;
      align-items: center;
    }

    .iv-item-center-content {
      margin: 0 0.5rem;
    }
  `,
})
export class ItemCenterComponent {
  @Input() label: string | undefined;
}
