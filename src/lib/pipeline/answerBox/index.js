import { concat, contramap, flip, map, pipe } from '../../fp/utils';
import View from '../../fp/adt/View';

export const seed = View.of(<></>);
export const textbox = View(p => <input {...p} type="text" />);
export const button = View(({ text, ...p }) => <button {...p}>{text}</button>);
export const wrapDiv = x => <div>{x}</div>;

export const answerBoxPipeline = ({ textboxProps, buttonProps }) =>
  pipe(
    concat(contramap(buttonProps)(button)),
    concat(contramap(textboxProps)(textbox)),
    map(wrapDiv)
  );

export const flipped = flip(answerBoxPipeline);

export const seeded = flipped(seed);

export default seeded;
