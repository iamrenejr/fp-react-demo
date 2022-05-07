import compose from 'lodash/fp/compose';

const View = f => ({
  map: g => View(compose(g, f)),
  contramap: g => View(compose(f, g)),
  chain: g => View(x => f(x).concat(y => g(y).f(x))),
  fold: f,
  concat: x =>
    View(p => (
      <>
        {x.fold(p)}
        {f(p)}
      </>
    )),
});
View.of = x => View(() => x);
View.empty = View.of(null);

export default View;
