import memo from '../../lib/utils/memo';

import './styles.scss';

export const button = props => (
  <button
    onClick={props.onClick}
    disabled={props.textVal === ''}
    className="submit"
  >
    Submit
  </button>
);

export default memo(button);
