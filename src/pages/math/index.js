import title from '../../components/title';
import button from '../../components/button';
import textInput from '../../components/textInput';
import resultsBox from '../../components/resultsBox';

import { concat, map, seedPipe } from '../../lib/fp/pointfree';
import { memop } from '../../lib/utils/memo';
import actions from '../../lib/frp/actions';
import connect from '../../lib/frp/connect';

import './styles.scss';

export const wrapInDiv = x => <div>{x}</div>;

export const wrapInLayout = x => <div className="layout">{x}</div>;

export const home = memop(store =>
  seedPipe(
    concat(title(store)),
    concat(
      seedPipe(
        concat(textInput(store)),
        concat(button(store)),
        map(wrapInDiv)
      )
    ),
    concat(resultsBox(store)),
    map(wrapInLayout)
  )
);

export default connect([actions.INPUT_TEXT, actions.ANSWER])(home);
