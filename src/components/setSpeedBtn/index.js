import { always, contramap } from '../../lib/fp/pointfree';
import { dispatch } from '../../lib/frp/connect';
import memo from '../../lib/utils/memo';
import actions from '../../lib/frp/actions';
import View from '../../lib/fp/adt/View';

import './styles.scss';

export const navToBtn = View(({ text, ...p }) => (
  <button {...p}>{text}</button>
));

export const navToBtnProps = ({ text, speed, disabled }) =>
  always({
    text,
    onClick: () => {
      dispatch({
        type: actions.page.lightbox.ANIMATION_DELAY,
        payload: speed,
      });
    },
    disabled,
    className: 'speed-btn',
  });

export default memo(store =>
  contramap(navToBtnProps(store))(navToBtn)
);
