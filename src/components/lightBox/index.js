import { always, contramap } from '../../lib/fp/pointfree';
import memo from '../../lib/utils/memo';
import View from '../../lib/fp/adt/View';

import './styles.scss';

export const lightBox = View(p => <div {...p}>&nbsp;</div>);

export const lightBoxProps = on =>
  always({
    className: on ? 'light-on' : 'light-off',
  });

export default memo(store =>
  contramap(lightBoxProps(store))(lightBox)
);
