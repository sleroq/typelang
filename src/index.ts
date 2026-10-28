import type { Tokenize } from './tokenize';
import type { Parse } from './parse';
import type { EvalAndReturnLast } from './eval';
import type { Cast } from './utils/generalUtils';
import type { AnalyzeSequence } from './analyze';

export type Eval<I extends string> = Tokenize<I> extends infer T
  ? Parse<Cast<T, Array<any>>> extends infer P
    ? AnalyzeSequence<Cast<P, Array<any>>> extends infer A
      ? EvalAndReturnLast<{}, Cast<A, Array<any>>>
      : never
    : never
  : never;
