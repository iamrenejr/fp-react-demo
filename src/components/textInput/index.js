import memo from '../../lib/utils/memo';

export const textInput = props => (
  <input
    type="text"
    placeholder="Put your answer here"
    value={props.textVal}
    onChange={props.onChange}
    className="answer-box"
  />
);

export default memo(textInput);
