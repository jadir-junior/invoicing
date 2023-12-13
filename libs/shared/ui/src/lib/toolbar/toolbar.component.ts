import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Style } from '../models/style.model';

@Component({
  selector: 'iv-toolbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="toolbarClasses" [ngStyle]="style" role="toolbar">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  @Input() style?: Style;

  get toolbarClasses() {
    return {
      'iv-toolbar': true,
    };
  }
}
