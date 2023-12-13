import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'iv-error',
  standalone: true,
  imports: [CommonModule],
  template: `<small><ng-content></ng-content></small>`,
  styles: `
    small {
      color: var(--danger-color);
    }
  `,
})
export class ErrorComponent {}
