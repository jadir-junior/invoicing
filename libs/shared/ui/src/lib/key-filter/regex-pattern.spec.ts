/* eslint-disable no-useless-escape */
import { regexPattern } from './regex-pattern';

describe('Regex Pattern in KeyFilter tests', () => {
  it(`when pattern is int must return /[\d\-]/`, () => {
    expect(regexPattern('int')).toEqual(/[\d\-]/);
  });

  it(`when pattern is num must return /[\d\-\.]/`, () => {
    expect(regexPattern('num')).toEqual(/[\d\-\.]/);
  });

  it(`when pattern is money must return /[\d\.\s,]/`, () => {
    expect(regexPattern('money')).toEqual(/[\d\.\s,]/);
  });

  it(`if pattern doesn't have pattern must return /./`, () => {
    expect(regexPattern(undefined)).toEqual(/./);
  });

  it(`if a pass a pattern in regex`, () => {
    expect(regexPattern(/[a-z0-9_]/i)).toEqual(/[a-z0-9_]/i);
  });
});
