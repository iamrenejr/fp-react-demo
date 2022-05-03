import compose from 'lodash/fp/compose';

const Reader = f => ({
  runReader: x => f(x),
  map: g => Reader(compose(g, f)),
  ap: Rb => Reader(x => f(x)(Rb.runReader(x))),
  chain: g => Reader(x => compose(g, f)(x).runReader(x)),
});
Reader.of = x => Reader(() => x);
Reader.ask = () => Reader(x => x);

export default Reader;
