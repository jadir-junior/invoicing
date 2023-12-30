import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Style } from '../models/style.model';

@Component({
  selector: 'iv-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `<div
    [ngClass]="containerClass"
    [ngStyle]="style"
    [attr.aria-label]="ariaLabel"
  >
    <ng-content></ng-content>
    @if(label) {
    <span class="iv-avatar-text">{{ label }}</span>
    } @else if(icon) {
    <span class="material-icons-outlined">{{ icon }}</span>
    } @else {
    <img [src]="image" />
    }
  </div>`,
  styleUrl: './avatar.component.css',
})
export class AvatarComponent {
  @Input() label?: string;
  @Input() icon?: string;
  @Input() image?: string;
  @Input() shape: 'square' | 'circle' = 'square';
  @Input() size: 'normal' | 'large' | 'x-large' = 'normal';
  @Input() ariaLabel?: string;
  @Input() style?: Style;

  get containerClass() {
    return {
      'iv-avatar': true,
      'iv-avatar-image': this.image !== undefined,
      'iv-avatar-circle': this.shape === 'circle',
      [`iv-avatar-${this.size}`]: true,
    };
  }
}
