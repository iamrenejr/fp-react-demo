import memo from '../../lib/utils/memo';

import './styles.scss';

export const lightBox = props => (
  <div className={props.on ? 'light-on' : 'light-off'}>&nbsp;</div>
);

export default memo(lightBox);
