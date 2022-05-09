import { always, contramap } from '../../lib/fp/pointfree';
import memo from '../../lib/utils/memo';
import View from '../../lib/fp/adt/View';

export const results = View(({ text, ...p }) =>
  text ? <span {...p}>{text}</span> : null
);

export const resultsProps = resultsFlag =>
  always({
    text:
      resultsFlag === 0
        ? null
        : resultsFlag === 1
        ? 'Correct! :)'
        : 'Incorrect! :(',
    className: 'results',
  });

export default memo(store => contramap(resultsProps(store))(results));
