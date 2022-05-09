import Future, { chain, resolve } from 'fluture';
import { add, compose, map, pipe } from '../../../fp/pointfree';
import memo, { memop } from '../../../../lib/utils/memo';
import connect, { dispatch } from '../../../../lib/frp/connect';
import actions from '../../../../lib/frp/actions';

const maxLightStateStep = memo(i =>
  i === 1 ? 1 : 1 + 2 * maxLightStateStep(i - 1)
);

export const tickAnimation = memop(state =>
  pipe(
    chain(() =>
      Future((_, res) => {
        const [delay, , lightsCount] = state;
        const timer = setTimeout(() => {
          compose(res, maxLightStateStep)(lightsCount);
        }, delay);
        return () => clearTimeout(timer);
      })
    ),
    map(maxStep => {
      const [, step] = state;
      dispatch({
        type: actions.page.lightbox.BOX_INDEX,
        payload: step >= maxStep ? 0 : add(1),
      });
    })
  )(resolve(null))
);

export default connect([
  actions.page.lightbox.ANIMATION_DELAY,
  actions.page.lightbox.BOX_INDEX,
  actions.page.lightbox.LIGHTS_COUNT,
])(tickAnimation);
