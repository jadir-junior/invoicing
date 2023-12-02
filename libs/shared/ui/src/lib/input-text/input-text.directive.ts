import {
  AfterViewInit,
  Directive,
  HostBinding,
  Input,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

export type Size = 'large' | 'normal' | 'small';

@Directive({
  selector: '[ivInputText]',
  standalone: true,
})
export class InputTextDirective implements OnChanges, AfterViewInit {
  initialClasses = 'iv-input-text';

  @Input() size: Size = 'normal';

  @HostBinding('class') classes = this.initialClasses;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['size']) {
      this.onChangeClasses();
    }
  }

  ngAfterViewInit(): void {
    this.onChangeClasses();
  }

  private onChangeClasses(): void {
    this.classes = `${this.initialClasses} ${this.sizeClass()}`;
    this.cd.detectChanges();
  }

  private sizeClass(): string {
    switch (this.size) {
      case 'small':
        return 'iv-input-text-size-small';
      case 'normal':
        return '';
      case 'large':
        return 'iv-input-text-size-large';
      default:
        return '';
    }
  }
}
