import { add, enfable } from '../../../fp/pointfree';
import connect from '../../../frp/connect';
import actions from '../../../frp/actions';
import memo from '../../../utils/memo';

const maxLightStateStep = memo(i =>
  i === 1 ? 1 : 1 + 2 * maxLightStateStep(i - 1)
);

export const tickAnimate = enfable(store => (rej, res) => {
  const [state, dispatch] = store;
  const [delay, step, lightsCount] = state;
  const timer = setTimeout(() => {
    const maxStep = maxLightStateStep(lightsCount);
    res(
      dispatch({
        type: actions.page.lightbox.BOX_INDEX,
        payload: step >= maxStep ? 0 : add(1),
      })
    );
  }, delay);
  return () => rej(clearTimeout(timer));
});

export default connect([
  actions.page.lightbox.ANIMATION_DELAY,
  actions.page.lightbox.BOX_INDEX,
  actions.page.lightbox.LIGHTS_COUNT,
])(tickAnimate);
