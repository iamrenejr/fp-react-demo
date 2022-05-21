import React from 'react';
import { pairwise, startWith } from 'rxjs';
import { fork } from 'fluture';
import { identity } from '../../fp/pointfree';
import { dispatch } from '../../frp/connect';
import deriveErrorState from '../deriveErrorState';

export const cleanOnUnmount = streams => {
  const EVENT = 'beforeunload';
  const onUnmount = () => {
    streams.map(s$ => s$.unsubscribe());
    removeEventListener(EVENT, onUnmount);
  };
  addEventListener(EVENT, onUnmount);
};

export const renderDOM = (root, ui$) =>
  ui$
    .pipe(startWith(null), pairwise())
    .subscribe(([prevApp, app]) =>
      root.render(
        <React.StrictMode>
          {(app || prevApp).fold(identity)}
        </React.StrictMode>
      )
    );

export const dispatchEvents = f$ =>
  f$.subscribe(
    fork(trace =>
      dispatch({
        type: deriveErrorState(trace.action),
        payload: trace,
      })
    )(identity)
  );

export const releaseEffects = (root, App$, fables$) => {
  const ui$ = renderDOM(root, App$);
  const store$ = dispatchEvents(fables$);
  cleanOnUnmount([ui$, store$]);
};

export default releaseEffects;
