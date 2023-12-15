import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Style } from '../models/style.model';
import { TemplateComponent } from '../template/template.component';
import { IvTemplate } from '../template/iv-template.directive';

@Component({
  selector: 'iv-toolbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="toolbarClasses" [ngStyle]="style" role="toolbar">
      <ng-content></ng-content>

      @if(endTemplate) {
      <div class="iv-toolbar-group-right iv-toolbar-group-end">
        <ng-container *ngTemplateOutlet="endTemplate"></ng-container>
      </div>
      }
    </div>
  `,
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent implements AfterContentInit {
  @Input() style?: Style;

  @ContentChildren(IvTemplate) templates?: QueryList<IvTemplate>;

  endTemplate?: TemplateRef<TemplateComponent>;

  ngAfterContentInit(): void {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case 'end':
        case 'right':
          this.endTemplate = item.template;
          break;
      }
    });
  }

  get toolbarClasses() {
    return {
      'iv-toolbar': true,
    };
  }
}
