import { always, contramap } from '../../lib/fp/pointfree';
import memo from '../../lib/utils/memo';
import View from '../../lib/fp/adt/View';

export const results = View(({ text, ...p }) =>
  text ? <span {...p}>{text}</span> : null
);

export const resultsProps = ({ state }) =>
  always({
    text: (() => {
      const [textVal, ans] = state;
      return (!textVal && !ans) || textVal
        ? null
        : Number(ans) === 21
        ? 'Correct! :)'
        : 'Incorrect! :(';
    })(),
    className: 'results',
  });

export default memo(store => contramap(resultsProps(store))(results));
