/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IvTemplate } from '../template/iv-template.directive';

@Component({
  selector: 'iv-card',
  standalone: true,
  imports: [CommonModule, IvTemplate],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements AfterContentInit {
  @ContentChildren(IvTemplate) templates: QueryList<IvTemplate> | undefined;

  headerTemplate: TemplateRef<any> | null = null;
  titleTemplate: TemplateRef<any> | null = null;
  contentTemplate: TemplateRef<any> | null = null;
  footerTemplate: TemplateRef<any> | null = null;

  ngAfterContentInit(): void {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case 'header':
          this.headerTemplate = item.template;
          break;
        case 'title':
          this.titleTemplate = item.template;
          break;
        case 'content':
          this.contentTemplate = item.template;
          break;
        case 'footer':
          this.footerTemplate = item.template;
          break;
      }
    });
  }
}
