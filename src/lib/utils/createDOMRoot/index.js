import ReactDOM from 'react-dom/client';
import { compose } from '../../fp/pointfree';

export const createDOMRoot = compose(
  ReactDOM.createRoot, //
  id => document.getElementById(id)
);

export default createDOMRoot;
