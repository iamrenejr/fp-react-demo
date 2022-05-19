import LightBox from '../../components/LightBox';
import NavToBtn from '../../components/NavToBtn';
import SetSpeedBtn from '../../components/SetSpeedBtn';

import { add, rootUI } from '../../lib/fp/pointfree';
import actions from '../../lib/frp/actions';
import connect from '../../lib/frp/connect';
import memo from '../../lib/utils/memo';

import './styles.scss';

export const lightStateCalculator = size =>
  memo(step =>
    new Array(size).fill(0).map((_, idx) => {
      const pattern = Math.pow(2, idx);
      const threshold = step - pattern + 1;
      return threshold < 1 ? 0 : Math.ceil(threshold / pattern) % 2;
    })
  );

export const lightbox = rootUI(store => {
  const [state, dispatch] = store;
  const [step, lightsCount, delay] = state;

  const toMath = () =>
    dispatch({
      type: actions.fable.navigation.NAVIGATE,
      payload: '/math',
    });

  const setSpeed = speed => () =>
    dispatch({
      type: actions.page.lightbox.ANIMATION_DELAY,
      payload: add(speed),
    });

  return (
    <div className="light-layout">
      <div className="lightbox">
        {lightStateCalculator(lightsCount)(step).map((on, idx) => (
          <LightBox on={on} key={`${idx}-${on}`} />
        ))}
      </div>
      <div className="cmd-btns">
        <NavToBtn text="Go To Math" onClick={toMath} />
        <SetSpeedBtn
          text="Faster"
          onClick={setSpeed(-45)}
          disabled={delay <= 10}
        />
        <SetSpeedBtn
          text="Slower"
          onClick={setSpeed(45)}
          disabled={delay >= 120}
        />
      </div>
    </div>
  );
});

export default connect([
  actions.page.lightbox.BOX_INDEX,
  actions.page.lightbox.LIGHTS_COUNT,
  actions.page.lightbox.ANIMATION_DELAY,
])(lightbox);
