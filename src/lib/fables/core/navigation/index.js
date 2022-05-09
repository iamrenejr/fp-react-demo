import Future, { chain, resolve } from 'fluture';
import { map, noop, pipe } from '../../../fp/pointfree';
import { memop } from '../../../../lib/utils/memo';
import actions from '../../../../lib/frp/actions';
import connect from '../../../../lib/frp/connect';

export const navigation = memop(state =>
  pipe(
    chain(() =>
      Future((_, res) => {
        const curr = location.pathname;
        const [goto] = state;
        res(goto === curr ? null : goto);
        return noop;
      })
    ),
    map(goto => goto && (location.href = goto))
  )(resolve(null))
);

export default connect([
  actions.fable.navigation.GOTO_PATH, //
])(navigation);
