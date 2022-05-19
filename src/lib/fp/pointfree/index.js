import Future from 'fluture';
import { always, compose, map, pipe } from 'ramda';
import View from '../adt/View';
import { memop } from '../../utils/memo';

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

export const noop = always({});

export const toNull = always(null);

export const tap = f => map(x => compose(toNull, f)(x) || x);

export const contramap = f => x => x.contramap(f);

export const flip = f => x => y => f(y)(x);

export const seed = f => compose(f, View.of)(<></>);

export const uiPipe = compose(seed, pipe);

export const enfable = cb => memop(compose(Future, cb));

export const asObservable = s$ => s$.asObservable();

export const mapN = (n, f) =>
  n === 1 ? map(f) : map(mapN(n - 1, f));
