import lightBox from '../../components/lightBox';
import navToBtn from '../../components/navToBtn';
import setSpeedBtn from '../../components/setSpeedBtn';

import { add, concat, map, uiPipe } from '../../lib/fp/pointfree';
import memo, { memop } from '../../lib/utils/memo';
import actions from '../../lib/frp/actions';
import connect from '../../lib/frp/connect';
import View from '../../lib/fp/adt/View';

import './styles.scss';

export const lightStateCalculator = size =>
  memo(step =>
    new Array(size).fill(0).map((_, idx) => {
      const pattern = Math.pow(2, idx);
      const threshold = step - pattern + 1;
      return threshold < 1 ? 0 : Math.ceil(threshold / pattern) % 2;
    })
  );

export const wrapLights = x => <div className="lightbox">{x}</div>;
export const wrapCmdBtns = x => <div className="cmd-btns">{x}</div>;
export const wrapInDiv = x => <div className="light-layout">{x}</div>;

export const lightbox = memop(([step, lightsCount, delay]) =>
  uiPipe(
    concat(
      uiPipe(
        concat(
          lightStateCalculator(lightsCount)(step)
            .map(lightBox)
            .reduce(concat, View.empty)
        ),
        map(wrapLights)
      )
    ),
    concat(
      uiPipe(
        concat(
          navToBtn({
            text: 'Go To Math',
            goto: '/',
          })
        ),
        concat(
          setSpeedBtn({
            text: 'Faster',
            speed: add(-45),
            disabled: delay <= 10,
          })
        ),
        concat(
          setSpeedBtn({
            text: 'Slower',
            speed: add(45),
            disabled: delay >= 120,
          })
        ),
        map(wrapCmdBtns)
      )
    ),
    map(wrapInDiv)
  )
);

export default connect([
  actions.page.lightbox.BOX_INDEX,
  actions.page.lightbox.LIGHTS_COUNT,
  actions.page.lightbox.ANIMATION_DELAY,
])(lightbox);
