import Future, { chain, resolve } from 'fluture';
import { map, pipe } from '../../../fp/pointfree';
import { memop } from '../../../../lib/utils/memo';
import connect, { dispatch } from '../../../../lib/frp/connect';
import actions from '../../../../lib/frp/actions';

export const getQuestion = memop(() =>
  pipe(
    chain(() =>
      Future((_, res) => {
        const timer = setTimeout(() => {
          const addend1 = Math.floor(Math.random() * 25);
          const addend2 = Math.floor(Math.random() * 25);
          const correctAnswer = addend1 + addend2;
          res({
            addend1,
            addend2,
            correctAnswer,
          });
        }, 100);
        return () => clearTimeout(timer);
      })
    ),
    map(payload => {
      dispatch({
        type: actions.fable.getQuestion.MATH_QUESTION,
        payload,
      });
    })
  )(resolve(null))
);

export default connect([actions.page.math.ANSWER])(getQuestion);
