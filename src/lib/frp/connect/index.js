import { combineLatest, Observable } from 'rxjs';
import { asObservable, compose, map, pipe } from '../../fp/pointfree';
import { isFunc } from '../../fp/predicates';
import channels from '../channels';

export const keysToObservables = pipe(
  map(type => channels.get(type)),
  map(asObservable),
  combineLatest
);

export const dispatch = action => {
  const { type, payload } = action;
  const channel$ = channels.get(type);
  const prevState = channel$.getValue();
  const newState = isFunc(payload) ? payload(prevState) : payload;
  if (prevState === newState) return;
  channel$.next(newState);
};

export const connect = stateKeys => page =>
  new Observable(obs => {
    const next = compose(x => obs.next(x), page);
    const combined$ = keysToObservables(stateKeys);
    combined$.subscribe(state => next({ state, dispatch }));
  });

export default connect;
