import actions from '../../frp/actions';
import { dispatch } from '../../frp/connect';

export const navigator = dispatcher => payload => () =>
  dispatcher({ type: actions.fable.navigation.NAVIGATE, payload });

export default navigator(dispatch);
