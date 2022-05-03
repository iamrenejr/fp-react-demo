import answerBox from '../../lib/pipeline/answerBox';
import results from '../../lib/pipeline/results';
import View from '../../lib/fp/adt/View';
import { componentState, observePage } from '../../lib/frp/observePage';

import './styles.scss';

export const STATE = {
  INPUT_TEXT: 'INPUT_TEXT_STATE',
  BUTTON: 'BUTTON_STATE',
  ANSWER: 'ANSWER_STATE',
};

export const title = View(p => (
  <header className="title">
    <span>
      {p.addend1} + {p.addend2} = ?
    </span>
  </header>
));

export const textboxProps = () => ({
  placeholder: 'Put your answer here',
  onChange: ev => componentState(STATE.INPUT_TEXT).next(ev.target.value),
  value: (() => {
    const val = componentState(STATE.INPUT_TEXT).getValue();
    return val === STATE.INPUT_TEXT ? '' : val;
  })(),
  className: 'answer-box',
});

export const buttonProps = () => ({
  text: 'Submit',
  onClick: _ => {
    const val = componentState(STATE.INPUT_TEXT).getValue();
    componentState(STATE.INPUT_TEXT).next('');
    componentState(STATE.BUTTON).next('clicked');
    componentState(STATE.ANSWER).next(val);
  },
  disabled: (() => {
    const val = componentState(STATE.INPUT_TEXT).getValue();
    return val === STATE.INPUT_TEXT || val === '';
  })(),
  className: 'submit',
});

export const resultsProps = () => ({
  text: (() => {
    const ans = componentState(STATE.ANSWER).getValue();
    const val = componentState(STATE.INPUT_TEXT).getValue();
    return ans === STATE.ANSWER || (ans !== STATE.ANSWER && val)
      ? null
      : Number(ans) === 21
      ? 'Correct! :)'
      : 'Incorrect! :(';
  })(),
  className: 'results',
});

export const wrapInLayout = x => <div className="home-layout">{x}</div>;

export const Home = title
  .contramap(() => ({
    addend1: 12,
    addend2: 9,
  }))
  .concat(
    answerBox({
      textboxProps,
      buttonProps,
    })
  )
  .concat(results(resultsProps))
  .map(wrapInLayout);

export default observePage([STATE.INPUT_TEXT, STATE.BUTTON, STATE.ANSWER])(Home);
