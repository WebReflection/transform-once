/*! (c) Andrea Giammarchi - ISC */

// no-op WeakValue mock as WeakRef support is still too little
// use https://github.com/WebReflection/weak-value#readme otherwise
class WeakValue {
  has() { return false; }
  set() {}
}

const helpers = {WeakSet, WeakMap, WeakValue};
const {apply} = Reflect;

export default function (callback) {'use strict';
  const {WeakSet, WeakMap, WeakValue} = (this || helpers);
  const ws = new WeakSet;
  const wm = new WeakMap;
  const wv = new WeakValue;
  return function (any) {
    if (ws.has(any))
      return any;

    if (wm.has(any))
      return wm.get(any);

    if (wv.has(any))
      return wv.get(any);

    const value = apply(callback, this, arguments);
    ws.add(value);
    if (value !== any)
      (typeof any === 'object' && any ? wm : wv).set(any, value);
    return value;
  };
};
