import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IvTemplate } from '../template/iv-template.directive';
import { TemplateComponent } from '../template/template.component';

type klass = { [klass: string]: string } | null | undefined;

@Component({
  selector: 'iv-card',
  standalone: true,
  imports: [CommonModule, IvTemplate],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements AfterContentInit {
  @Input() title: string | undefined;
  @Input() subtitle: string | undefined;
  @Input() style: klass;

  @ContentChildren(IvTemplate) templates: QueryList<IvTemplate> | undefined;

  headerTemplate: TemplateRef<TemplateComponent> | null = null;
  titleTemplate: TemplateRef<TemplateComponent> | null = null;
  subtitleTemplate: TemplateRef<TemplateComponent> | null = null;
  contentTemplate: TemplateRef<TemplateComponent> | null = null;
  footerTemplate: TemplateRef<TemplateComponent> | null = null;

  ngAfterContentInit(): void {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case 'header':
          this.headerTemplate = item.template;
          break;
        case 'title':
          this.titleTemplate = item.template;
          break;
        case 'subtitle':
          this.subtitleTemplate = item.template;
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
