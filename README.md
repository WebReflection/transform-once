# transform-once

[![build status](https://github.com/WebReflection/transform-once/actions/workflows/node.js.yml/badge.svg)](https://github.com/WebReflection/transform-once/actions) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/transform-once/badge.svg?branch=main)](https://coveralls.io/github/WebReflection/transform-once?branch=main) [![CSP strict](https://webreflection.github.io/csp/strict.svg)](https://webreflection.github.io/csp/#-csp-strict)

A basic helper to simplify relations among values. Optionally compatible with [WeakValue](https://github.com/WebReflection/weak-value#readme) too.

```js
import transformOnce from 'transform-once';

const $ = transformOnce(value => {
  return {object: Math.random()};
});

// references are transformed once
$(globalThis) === $(globalThis):

// transformed values are returned too
$(globalThis) === $($(globalThis)):

$(globalThis);
// {object: 0.123456789}
```

### Provide WeakRef Ability

If the input needs to be referenced, it is possible to use *WeakRef* based utility, such as *WeakValue* to automatically cleanup once the related reference is gone.

```js
import transformOnce from 'transform-once';
import WeakValue from 'weak-value';

// pass as context all needed classes (which are these three)
const transform = transformOnce.bind({WeakMap, WeakSet, WeakValue});

// now create a transformer that works with primitives too
const $ = transform(value => ({[typeof value]: Math.random()}));

$(1) === $(1);
$(1) === $($(1));
$($) === $($($));
$(1);
// {number: 0.123456789}
```

Alternative, it is also possible to pass a `Map` instead, but it's up to the program to clear its content, whenever it's necessary.

```js
import transformOnce from 'transform-once';
const transform = transformOnce.bind({WeakMap, WeakSet, WeakValue: Map});

// same as before but primitives are not weakly referenced
const $ = transform(value => ({[typeof value]: Math.random()}));
```

By default this module does *not* provide any weakly reference mechanism so each time a primitive is passed along, it will be transformed.
