import memo, { memop } from '../../lib/utils/memo';
import {
  add,
  concat,
  map,
  seedPipe,
  tap,
} from '../../lib/fp/pointfree';
import onUnmount from '../../lib/utils/onUnmount';
import lightBox from '../../components/lightBox';
import actions from '../../lib/frp/actions';
import connect from '../../lib/frp/connect';
import View from '../../lib/fp/adt/View';

const MAX_LIGHTS = 15;

const maxLightStateStep = memo(i =>
  i === 1 ? 1 : 1 + 2 * maxLightStateStep(i - 1)
);

const lightStateCalculator = size =>
  memo(step =>
    new Array(size).fill(0).map((_, idx) => {
      const pattern = Math.pow(2, idx);
      const threshold = step - pattern + 1;
      return threshold < 1 ? 0 : Math.ceil(threshold / pattern) % 2;
    })
  );

const lightState = lightStateCalculator(MAX_LIGHTS);

const wrapInDiv = x => <div className="lightbox">{x}</div>;

export const lightbox = memop(({ state: [step], dispatch }) =>
  seedPipe(
    tap(() => {
      const timer = setTimeout(() => {
        const maxStep = maxLightStateStep(MAX_LIGHTS);
        dispatch({
          type: actions.page.lightbox.BOX_INDEX,
          payload: step >= maxStep ? 0 : add(1),
        });
      }, 100);
      onUnmount(() => clearTimeout(timer));
    }),
    concat(lightState(step).map(lightBox).reduce(concat, View.empty)),
    map(wrapInDiv)
  )
);

export default connect([actions.page.lightbox.BOX_INDEX])(lightbox);
