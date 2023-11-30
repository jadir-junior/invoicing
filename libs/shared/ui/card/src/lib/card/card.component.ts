/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IvTemplate } from '@invoicing/iv-template';

@Component({
  selector: 'iv-card',
  standalone: true,
  imports: [CommonModule, IvTemplate],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements AfterContentInit {
  @ContentChildren(IvTemplate) templates: QueryList<IvTemplate> | undefined;

  headerTemplate: TemplateRef<any> | undefined;

  ngAfterContentInit(): void {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case 'header':
          this.headerTemplate = item.template;
          break;
      }
    });
  }
}
