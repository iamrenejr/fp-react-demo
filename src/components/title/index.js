import memo from '../../lib/utils/memo';

export const title = props => (
  <header className="title">
    <span>
      {props.addend1} + {props.addend2} = ?
    </span>
  </header>
);

export default memo(title);
