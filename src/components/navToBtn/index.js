import { always, contramap } from '../../lib/fp/pointfree';
import { dispatch } from '../../lib/frp/connect';
import memo from '../../lib/utils/memo';
import actions from '../../lib/frp/actions';
import View from '../../lib/fp/adt/View';

import './styles.scss';

export const navToBtn = View(({ text, ...p }) => (
  <button {...p}>{text}</button>
));

export const navToBtnProps = ({ text, goto }) =>
  always({
    text,
    onClick: () => {
      dispatch({
        type: actions.fable.navigation.GOTO_PATH,
        payload: goto,
      });
    },
    className: 'nav-to-btn',
  });

export default memo(store =>
  contramap(navToBtnProps(store))(navToBtn)
);
