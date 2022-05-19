import { combineLatest, Observable } from 'rxjs';
import { asObservable, compose, map, pipe } from '../../fp/pointfree';
import { isFunc } from '../../fp/predicates/isFunc';
import { isArray } from '../../fp/predicates/isArray';
import channels from '../channels';

export const keysToObservable = pipe(
  map(type => channels.getIn(type)),
  map(asObservable),
  combineLatest
);

export const dispatch = actions => {
  (isArray(actions) ? actions : [actions]).map(action => {
    const { type, payload } = action;
    const channel$ = channels.getIn(type);
    const prevState = channel$.getValue();
    const newState = isFunc(payload) ? payload(prevState) : payload;
    if (prevState === newState) return false;
    channel$.next(newState);
    return true;
  });
};

export const connect = stateKeys => page =>
  new Observable(obs => {
    const next = compose(x => obs.next(x), page);
    const combined$ = keysToObservable(stateKeys);
    combined$.subscribe(state => next([state, dispatch]));
  });

export default connect;
