import { always, contramap } from '../../lib/fp/pointfree';
import memo from '../../lib/utils/memo';
import View from '../../lib/fp/adt/View';

export const title = View(p => (
  <header className="title">
    <span>
      {p.addend1} + {p.addend2} = ?
    </span>
  </header>
));

export const titleProps = always;

export default memo(store => contramap(titleProps(store))(title));
