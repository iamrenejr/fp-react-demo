import title from '../../components/title';
import button from '../../components/button';
import textInput from '../../components/textInput';
import resultsBox from '../../components/resultsBox';
import navToBtn from '../../components/navToBtn';

import { concat, map, seedPipe } from '../../lib/fp/pointfree';
import { memop } from '../../lib/utils/memo';
import actions from '../../lib/frp/actions';
import connect from '../../lib/frp/connect';

import './styles.scss';

export const wrapInDiv = x => <div>{x}</div>;

export const wrapInLayout = x => <div className="layout">{x}</div>;

export const home = memop(state =>
  seedPipe(
    concat(title(state[3])),
    concat(
      seedPipe(
        concat(textInput(state)),
        concat(
          button({
            textVal: state[0],
            math: state[3],
          })
        ),
        map(wrapInDiv)
      )
    ),
    concat(resultsBox(state[2])),
    concat(
      navToBtn({
        text: 'Go To Lightbox',
        goto: '/lightbox',
      })
    ),
    map(wrapInLayout)
  )
);

export default connect([
  actions.page.math.INPUT_TEXT,
  actions.page.math.ANSWER,
  actions.page.math.RESULTS_FLAG,
  actions.fable.getQuestion.MATH_QUESTION,
])(home);
