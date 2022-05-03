export { chain, concat, compose, identity, map, pipe } from 'ramda';

export const contramap = f => x => x.contramap(f);

export const flip = f => x => y => f(y)(x);
