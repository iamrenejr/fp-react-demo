import Title from '../../components/Title';
import TextInput from '../../components/TextInput';
import SubmitAnswer from '../../components/SubmitAnswer';
import ResultsBox from '../../components/ResultsBox';
import NavToBtn from '../../components/NavToBtn';

import { rootUI } from '../../lib/fp/pointfree';
import actions from '../../lib/frp/actions';
import connect from '../../lib/frp/connect';

import './styles.scss';

export const home = rootUI(store => {
  const [state, dispatch] = store;
  const [textVal, , result, math] = state;

  const onTextInput = ev =>
    dispatch([
      {
        type: actions.page.math.INPUT_TEXT,
        payload: ev.target.value,
      },
      {
        type: actions.page.math.RESULTS_FLAG,
        payload: 0,
      },
    ]);

  const onSubmitAnswer = () => {
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
      payload: Number(textVal) === math.answer ? 1 : -1,
    });
  };

  const toLightbox = () =>
    dispatch({
      type: actions.fable.navigation.NAVIGATE,
      payload: '/lightbox',
    });

  return (
    <div className="math-layout">
      <Title addend1={math.addend1} addend2={math.addend2} />
      <div>
        <TextInput textVal={textVal} onChange={onTextInput} />
        <SubmitAnswer textVal={textVal} onClick={onSubmitAnswer} />
      </div>
      <ResultsBox result={result} />
      <NavToBtn text="Go To Lightbox" onClick={toLightbox} />
    </div>
  );
});

export default connect([
  actions.page.math.INPUT_TEXT,
  actions.page.math.ANSWER,
  actions.page.math.RESULTS_FLAG,
  actions.fable.getQuestion.MATH_QUESTION,
])(home);
