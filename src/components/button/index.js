import { always, contramap } from '../../lib/fp/pointfree';
import memo from '../../lib/utils/memo';
import actions from '../../lib/frp/actions';
import View from '../../lib/fp/adt/View';

export const button = View(({ text, ...p }) => (
  <button {...p}>{text}</button>
));

export const buttonProps = ({ state, dispatch }) =>
  always({
    text: 'Submit',
    onClick: _ => {
      const [textVal] = state;
      dispatch({ type: actions.INPUT_TEXT, payload: '' });
      dispatch({ type: actions.ANSWER, payload: textVal });
    },
    disabled: (() => {
      const [textVal] = state;
      return textVal === actions.INPUT_TEXT || textVal === '';
    })(),
    className: 'submit',
  });

export default memo(store => contramap(buttonProps(store))(button));
