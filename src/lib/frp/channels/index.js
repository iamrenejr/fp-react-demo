import { BehaviorSubject } from 'rxjs';
import { mapN } from '../../fp/pointfree';
import { actionDefaults } from '../actions';

export const actionToChannel = init => new BehaviorSubject(init);
export const channels = mapN(3, actionToChannel)(actionDefaults);
export default channels;
