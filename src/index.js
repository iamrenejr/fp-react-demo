import App$ from './App';
import fables$ from './lib/fables';
import createDOMRoot from './lib/utils/createDOMRoot';
import releaseEffects from './lib/utils/releaseEffects';
import reportWebVitals from './reportWebVitals';

import './index.scss';

const root = createDOMRoot('root');
releaseEffects(root, App$, fables$);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
