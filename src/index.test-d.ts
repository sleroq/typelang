import type { Eval } from '.';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (
  <T>() => T extends B ? 1 : 2
)
  ? true
  : false;
type Expect<T extends true> = T;

export type Tests = [
  // Empty
  Expect<Equal<Eval<''>, null>>,

  // Numbers
  Expect<Equal<Eval<'123'>, '123'>>,

  // Strings
  Expect<Equal<Eval<'"hello"'>, 'hello'>>,

  // Booleans
  Expect<Equal<Eval<'True'>, true>>,
  Expect<Equal<Eval<'False'>, false>>,

  // Conditionals
  Expect<Equal<Eval<'(If True "yes" "no")'>, 'yes'>>,
  Expect<Equal<Eval<'(If False "yes" "no")'>, 'no'>>,
  Expect<Equal<Eval<'(If 1 "truthy" "nope")'>, 'truthy'>>,

  // Core functions:
  // - Join (concat)
  Expect<Equal<Eval<'(Join "hello" "world")'>, 'helloworld'>>,
  Expect<Equal<Eval<'(Join "a" "b" "c" "d")'>, 'abcd'>>,
  // - Equals
  Expect<Equal<Eval<'(Eq 2 2)'>, true>>,
  Expect<Equal<Eval<'(Eq "you" "me")'>, false>>,
  // - Logical and
  Expect<Equal<Eval<'(And True True)'>, true>>,
  Expect<Equal<Eval<'(And False False)'>, false>>,
  // - Logical or
  Expect<Equal<Eval<'(Or True False)'>, true>>,
  Expect<Equal<Eval<'(Or False True)'>, true>>,
  // - Increase by one
  Expect<Equal<Eval<'(++ 2)'>, '3'>>,
  // - Decrease by one
  Expect<Equal<Eval<'(-- 5)'>, '4'>>,

  // Variables
  Expect<Equal<Eval<'(Def x 1) x'>, '1'>>,
  Expect<Equal<Eval<'undefined_variable'>, null>>,
  Expect<Equal<Eval<'(Def x 2) (++ x)'>, '3'>>,
  Expect<Equal<Eval<'(++ x) (Def x 2)'>, '2'>>,
  Expect<
    Equal<Eval<'(Def x (++ 3)) (Def y (++ x)) (Join "result: " y)'>, 'result: 5'>
  >,

  // Function declarations
  // To declare a function: `(Fun FunctionName (arg1 arg2) (FunctionBody))`
  Expect<Equal<Eval<'(Fun Ask (q) (Join q "?")) (Ask "Here")'>, 'Here?'>>,
  // - Variables declared inside a function can't be accessed from outside
  Expect<Equal<Eval<'(Fun Add2 (n) (Def n 5)) n'>, null>>,
  // - Functions scope can still access global variables
  Expect<
    Equal<Eval<'(Def x "!") (Fun AddBang (i) (Join i x)) (AddBang "hey")'>, 'hey!'>
  >,
  // - Functions scope can overshadow global scope
  Expect<Equal<Eval<'(Def x 3) (Fun Add (x) (++ x)) (Add 1)'>, '2'>>,

  // More example scripts
  Expect<Equal<Eval<'(Eq (++ 1) 1)'>, false>>,
  Expect<Equal<Eval<'(Join (Join "foo" " " "bar") " " "baz")'>, 'foo bar baz'>>,
  Expect<Equal<Eval<'(Def n 4) (++ (++ (++ n)))'>, '7'>>,
  Expect<Equal<Eval<'(If (Eq "2" "3") "equals!" "not!")'>, 'not!'>>,
  Expect<Equal<Eval<'(Or (Eq 3 1) (Eq 1 1))'>, true>>,
  Expect<
    Equal<
      Eval<'(Def x "Hello") (If True (Join x " " "World!") "Bye!")'>,
      'Hello World!'
    >
  >,
  Expect<Equal<Eval<'(Def a 3) (Def b (++ a)) (++ b)'>, '5'>>,

  // Invalid syntax
  Expect<Equal<Eval<'(++ (++ '>, never>>,
  Expect<Equal<Eval<') ++'>, never>>,
  Expect<Equal<Eval<'"aa'>, never>>,
];
