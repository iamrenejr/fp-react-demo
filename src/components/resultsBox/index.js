import memo from '../../lib/utils/memo';

export const results = props => {
  const text =
    props.result === 0
      ? null
      : props.result === 1
      ? 'Correct! :)'
      : 'Incorrect! :(';
  if (!text) return null;
  return <span className="results">{text}</span>;
};

export default memo(results);
