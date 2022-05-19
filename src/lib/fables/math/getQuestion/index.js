import { enfable } from '../../../fp/pointfree';
import connect from '../../../frp/connect';
import actions from '../../../frp/actions';

export const getQuestion = enfable(store => (rej, res) => {
  const [, dispatch] = store;
  const timer = setTimeout(() => {
    const addend1 = Math.floor(Math.random() * 25);
    const addend2 = Math.floor(Math.random() * 25);
    const answer = addend1 + addend2;
    res(
      dispatch({
        type: actions.fable.getQuestion.MATH_QUESTION,
        payload: { addend1, addend2, answer },
      })
    );
  }, 100);
  return () => rej(clearTimeout(timer));
});

export default connect([actions.page.math.ANSWER])(getQuestion);
