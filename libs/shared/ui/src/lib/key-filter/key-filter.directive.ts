import { Directive, Provider, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

export type KeyFilterPattern =
  | 'pint'
  | 'int'
  | 'pnum'
  | 'money'
  | 'num'
  | 'hex'
  | 'email'
  | 'alpha'
  | 'alphanum';

  const DEFAULT_MASK: Record<KeyFilterPattern, RegExp> = {
    pint: /[\d]/,
    int: /[\d\-]/,
    pnum: /[\d\.]/,
    money: /[\d\.\s,]/,
    num: /[\d\-\.]/,
    hex: /[0-9a-f]/i,
    email: /[a-z0-9_\.\-@]/i,
    alpha: /[a-z_]/i,
    alphanum: /[a-z0-9]_/i
  }

export const KEYFILTER_VALIDATOR: Provider = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => KeyFilterDirective),
  multi: true,
};

@Directive({
  selector: '[ivKeyFilter]',
  providers: [KEYFILTER_VALIDATOR],
  standalone: true,
})
export class KeyFilterDirective implements Validator {
  @Input('ivKeyFilter') set pattern(
    pattern: RegExp | KeyFilterPattern | null | undefined
  ) {
    this._pattern = pattern;

    if(pattern instanceof RegExp) {
      this.regex = pattern
    } else if (pattern in )
  }

  _pattern: RegExp | KeyFilterPattern | null | undefined;
  regex: RegExp = /./;

  constructor() {}

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    throw new Error('Method not implemented.');
  }

  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
}
