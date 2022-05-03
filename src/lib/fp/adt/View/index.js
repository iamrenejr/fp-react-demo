import compose from 'lodash/fp/compose';

const View = f => ({
  map: g => View(compose(g, f)),
  contramap: g => View(compose(f, g)),
  chain: g => compose(g, f),
  fold: f,
  concat: x =>
    View(p => (
      <>
        {f(p)}
        {x.fold(p)}
      </>
    )),
});
View.of = x => View(() => x);
View.empty = View.of(null);

export default View;
