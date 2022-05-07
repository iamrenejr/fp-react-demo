import { always, compose, map, pipe } from 'ramda';
import View from '../adt/View';

export {
  add,
  always,
  chain,
  concat,
  compose,
  identity,
  map,
  pipe,
} from 'ramda';

export const toNull = always(null);

export const tap = f => map(x => compose(toNull, f)(x) || x);

export const contramap = f => x => x.contramap(f);

export const flip = f => x => y => f(y)(x);

export const seed = f => compose(f, View.of)(<></>);

export const seedPipe = compose(seed, pipe);

export const asObservable = s$ => s$.asObservable();
