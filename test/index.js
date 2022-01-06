const WeakValue = require('weak-value');
const transformOnce = require('../cjs');

const transformer = value => ({[typeof value]: {}.toString.call(value)});

const withWeakValue = transformOnce.bind({
  WeakMap, WeakSet, WeakValue
});
test(withWeakValue(transformer));

const withMapValue = transformOnce.bind({
  WeakMap, WeakSet, WeakValue: Map
});
test(withMapValue(transformer));

// test without WeakValue ability
const $ = transformOnce(transformer);
console.assert($(1) !== $(1));

function test($) {
  console.assert($(1) === $(1));
  console.assert($(1) === $($(1)));
  console.assert($(null) === $(null));
  console.assert($(null) === $($(null)));
  console.assert($($) === $($));
  console.assert($($) === $($($)));
  console.assert($(global) === $(global));
  console.assert($(global) === $($(global)));
  console.log($(1));
  console.log($(null));
  console.log($($));
  console.log($(global));
  console.log('');
}
