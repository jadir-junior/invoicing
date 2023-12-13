import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Klass {
  [klass: string]: string;
}

@Component({
  selector: 'iv-sign-in-with-microsoft',
  standalone: true,
  imports: [CommonModule],
  template: `<button
    class="iv-button-microsoft"
    (click)="onClick.emit()"
    [style]="style"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 21 21"
    >
      <title>MS-SymbolLockup</title>
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
    Sign in with Microsoft
  </button>`,
  styles: `
    .iv-button-microsoft {
      padding: 0 12px;
      height: 41px;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 1rem;
      color: #fff;
      background: #2f2f2f;
      cursor: pointer;
      justify-content: center;
    }

    svg {
      margin-right: 12px;
    }
  `,
})
export class SignInWithMicrosoftComponent {
  @Input() style?: Klass;
  @Output() onClick = new EventEmitter();
}
