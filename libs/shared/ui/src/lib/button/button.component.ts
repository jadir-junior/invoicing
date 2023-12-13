import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Style } from '../models/style.model';

type Severity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'help'
  | 'danger'
  | 'default';

@Component({
  selector: 'iv-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvButtonComponent {
  @Input() style?: Style;

  @Input() label: string | undefined;
  @Input() severity: Severity = 'primary';
  @Input() link = false;
  @Input() block = false;
  @Input() rounded = false;
  @Input() text = false;

  @Input() icon?: string;
  @Input() iconPosition: 'right' | 'left' = 'left';

  @ViewChild('content') content!: ElementRef;

  @Output() onClick: EventEmitter<Event> = new EventEmitter();

  isContentEmpty(): boolean {
    return this.content?.nativeElement?.childNodes?.length ? true : false;
  }

  get iconClass(): { [klass: string]: string | boolean } {
    return {
      'iv-button-icon': true,
      [`iv-button-icon-${this.iconPosition}`]:
        this.isContentEmpty() || this.label ? true : false,
    };
  }

  get buttonClass(): { [klass: string]: string | boolean } {
    return {
      'iv-button': true,
      [`iv-button-${this.severity}`]: true,
      'iv-button-link': this.link,
      'iv-button-icon-only':
        !this.isContentEmpty() && !this.label ? true : false,
      'iv-button-block': this.block,
      'iv-button-rounded': this.rounded,
      'iv-button-text': this.text,
    };
  }
}
