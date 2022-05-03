import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';

import App$ from './App';
import { identity } from './lib/fp/utils';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const unfoldApp = app => root.render(<React.StrictMode>{app.fold(identity)}</React.StrictMode>);

App$.subscribe(unfoldApp);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
