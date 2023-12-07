import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';

type Severity = 'primary' | 'secondary' | 'default';

@Component({
  selector: 'iv-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvButtonComponent {
  @Input() label: string | undefined;
  @Input() severity: Severity = 'primary';
  @Input() link = false;

  @Output() onClick: EventEmitter<Event> = new EventEmitter();

  get buttonClass(): { [klass: string]: string | boolean } {
    return {
      'iv-button': true,
      [`iv-button-${this.severity}`]: true,
      'iv-button-link': this.link,
    };
  }
}
