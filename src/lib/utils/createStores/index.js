import { fork } from 'fluture';

import { identity } from '../../fp/pointfree';
import { dispatch } from '../../frp/connect';
import toErrorState from '../toErrorState';

export const createStores = st$ =>
  st$.subscribe(
    fork(trace =>
      dispatch({
        type: toErrorState(trace.action),
        payload: trace,
      })
    )(identity)
  );
