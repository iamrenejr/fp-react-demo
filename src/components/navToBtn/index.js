import memo from '../../lib/utils/memo';

import './styles.scss';

export const NavToBtn = props => (
  <button onClick={props.onClick} className="nav-to-btn">
    {props.text}
  </button>
);

export default memo(NavToBtn);
