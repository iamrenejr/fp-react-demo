import React from 'react';
import ReactDOM from 'react-dom/client';

import App$ from './App';
import fables$ from './lib/fables';

import { dispatch } from './lib/frp/connect';
import toErrorState from './lib/utils/toErrorState';

import { fork } from 'fluture';
import { pairwise, startWith } from 'rxjs';
import { identity } from './lib/fp/pointfree';
import onUnmount from './lib/utils/onUnmount';
import reportWebVitals from './reportWebVitals';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

const render = ([prevApp, app]) =>
  root.render(
    <React.StrictMode>
      {(app || prevApp).fold(identity)}
    </React.StrictMode>
  );

const UISubscription = App$.pipe(
  startWith(null),
  pairwise()
).subscribe(render);

const fableSubscription = fables$.subscribe(data => {
  const onErr = trace =>
    dispatch({
      type: toErrorState(trace.action),
      payload: trace,
    });
  fork(onErr)(identity)(data);
});

onUnmount(() => {
  UISubscription.unsubscribe();
  fableSubscription.unsubscribe();
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
