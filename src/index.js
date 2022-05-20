import App$ from './App';
import fables$ from './lib/fables';

import { createUI } from './lib/utils/createUI';
import { createStores } from './lib/utils/createStores';
import unsubOnUnmount from './lib/utils/unsubOnUnmount';

import reportWebVitals from './reportWebVitals';

import './index.scss';

const rootEl = document.getElementById('root');
const ui$ = createUI(rootEl, App$);
const store$ = createStores(fables$);
unsubOnUnmount([ui$, store$]);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
