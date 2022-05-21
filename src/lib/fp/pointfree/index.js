export {
  add,
  always,
  chain,
  concat,
  compose,
  flatten,
  identity,
  map,
  pipe,
} from 'ramda';

import Future from 'fluture';
import { always, compose, map } from 'ramda';
import View from '../adt/View';
import { memop } from '../../utils/memo';

export const noop = always({});

export const contramap = f => x => x.contramap(f);

export const asObservable = s$ => s$.asObservable();

export const mapN = (n, f) => (n <= 1 ? map(f) : map(mapN(n - 1, f)));

export const enfable = cb => memop(compose(Future, cb));

export const pagify = cb =>
  memop(st => contramap(always(st))(View(memop(cb))));
