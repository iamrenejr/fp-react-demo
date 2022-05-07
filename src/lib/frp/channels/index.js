import { BehaviorSubject } from 'rxjs';
import { Map } from 'immutable';
import { map } from '../../fp/pointfree';
import { actionDefaults } from '../actions';

export const immutableActions = Map(actionDefaults);
export const actionToChannel = init => new BehaviorSubject(init);
export const channels = map(actionToChannel)(immutableActions);
export default channels;
