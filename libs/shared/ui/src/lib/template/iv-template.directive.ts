import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ivTemplate]',
  standalone: true,
})
export class IvTemplate {
  @Input() type: string | undefined;

  @Input('ivTemplate') name!: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(public template: TemplateRef<any>) {}

  getType(): string {
    return this.name;
  }
}
