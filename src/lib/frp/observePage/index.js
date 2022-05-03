import memo from 'memoizee';
import { combineLatest, BehaviorSubject, Observable } from 'rxjs';
import { compose, map } from '../../../lib/fp/utils';

export const componentState = memo(key => new BehaviorSubject(key));

export const keysToObservables = map(k => componentState(k).asObservable());

export const combineKeysFromObservables = compose(combineLatest, keysToObservables);

export const observePage = stateKeys => page =>
  new Observable(obs => {
    const combined$ = combineKeysFromObservables(stateKeys);
    combined$.subscribe(() => obs.next(page));
  });

export default observePage;
