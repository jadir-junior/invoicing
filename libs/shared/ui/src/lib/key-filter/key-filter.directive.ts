/* eslint-disable no-useless-escape */
import { Directive, Input, HostListener } from '@angular/core';
import { regexPattern } from './regex-pattern';

export type KeyFilterPattern = 'int' | 'money' | 'num';

export type Pattern = RegExp | KeyFilterPattern | null | undefined;

export const DEFAULT_MASK: Record<KeyFilterPattern, RegExp> = {
  int: /[\d\-]/,
  money: /[\d\.\s,]/,
  num: /[\d\-\.]/,
};

@Directive({
  selector: '[ivKeyFilter]',
  standalone: true,
})
export class KeyFilterDirective {
  @Input({ alias: 'ivKeyFilter', transform: regexPattern })
  regex: Pattern;

  @HostListener('keypress', ['$event'])
  onKeyPress(keyboardEvent: KeyboardEvent) {
    const code = keyboardEvent.code;
    const key = keyboardEvent.key;

    if (code === 'Enter') {
      return;
    }

    if (!this.validatePattern(key)) {
      keyboardEvent.preventDefault();
    }
  }

  private validatePattern(key: string): boolean {
    return (<RegExp>this.regex).test(key);
  }
}
