import { contramap } from '../../fp/utils';
import View from '../../fp/adt/View';

export const results = View(({ text, ...p }) => <span {...p}>{text}</span>);

export const resultsPipeline = resultsProps => contramap(resultsProps)(results);

export default resultsPipeline;
