import { enfable, noop } from '../../../fp/pointfree';
import actions from '../../../frp/actions';
import connect from '../../../frp/connect';

export const navigation = enfable(store => (rej, res) => {
  const [state] = store;
  const [target] = state;
  const { pathname: source } = location;
  if (target === source) rej(null);
  else res((location.href = target));
  return noop;
});

export default connect([
  actions.fable.navigation.NAVIGATE, //
])(navigation);
