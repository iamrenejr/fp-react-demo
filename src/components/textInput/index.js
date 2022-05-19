import { always, contramap } from '../../lib/fp/pointfree';
import { dispatch } from '../../lib/frp/connect';
import memo from '../../lib/utils/memo';
import actions from '../../lib/frp/actions';
import View from '../../lib/fp/adt/View';

export const textInput = View(p => <input {...p} type="text" />);

export const textInputProps = value =>
  always({
    placeholder: 'Put your answer here',
    onChange: ev =>
      dispatch([
        {
          type: actions.page.math.INPUT_TEXT,
          payload: ev.target.value,
        },
        {
          type: actions.page.math.RESULTS_FLAG,
          payload: 0,
        },
      ]),
    value,
    className: 'answer-box',
  });

export default memo(store =>
  contramap(textInputProps(store))(textInput)
);
