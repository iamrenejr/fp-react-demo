import { always, contramap } from '../../lib/fp/pointfree';
import memo from '../../lib/utils/memo';
import actions from '../../lib/frp/actions';
import View from '../../lib/fp/adt/View';

import './styles.scss';

export const button = View(({ text, ...p }) => (
  <button {...p}>{text}</button>
));

export const buttonProps = ({ textVal, math, dispatch }) =>
  always({
    text: 'Submit',
    onClick: _ => {
      dispatch({
        type: actions.page.math.INPUT_TEXT,
        payload: '',
      });
      dispatch({
        type: actions.page.math.ANSWER,
        payload: textVal,
      });
      dispatch({
        type: actions.page.math.RESULTS_FLAG,
        payload: Number(textVal) === math.correctAnswer ? 1 : -1,
      });
    },
    disabled: textVal === '',
    className: 'submit',
  });

export default memo(store => contramap(buttonProps(store))(button));
