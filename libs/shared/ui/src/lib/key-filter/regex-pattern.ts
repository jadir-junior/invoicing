import { DEFAULT_MASK, Pattern } from './key-filter.directive';

export function regexPattern(pattern: Pattern): Pattern {
  if (pattern instanceof RegExp) {
    return pattern;
  } else if (pattern && pattern in DEFAULT_MASK) {
    return DEFAULT_MASK[pattern];
  } else {
    return /./;
  }
}
