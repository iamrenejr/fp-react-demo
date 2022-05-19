import memo from '../../lib/utils/memo';

import './styles.scss';

export const SetSpeedBtn = props => (
  <button
    onClick={props.onClick}
    disabled={props.disabled}
    className="speed-btn"
  >
    {props.text}
  </button>
);

export default memo(SetSpeedBtn);
