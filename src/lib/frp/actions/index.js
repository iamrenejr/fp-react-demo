import { fromJS, Map } from 'immutable';
import { always, compose, map, pipe } from '../../fp/pointfree';
import deriveErrorState from '../../utils/deriveErrorState';

export const PAGE = 'page';
export const FABLE = 'fable';

export const pageActions = {
  math: {
    INPUT_TEXT: '',
    ANSWER: '',
    RESULTS_FLAG: 0,
  },
  lightbox: {
    ANIMATION_DELAY: 100,
    BOX_INDEX: 0,
    LIGHTS_COUNT: 10,
  },
};

export const fableActions = {
  getQuestion: {
    MATH_QUESTION: {
      addend1: 0,
      addend2: 0,
      answer: 0,
    },
  },
  navigation: {
    NAVIGATE: location.href,
  },
};

export const toImmActions = cb =>
  pipe(
    fromJS,
    map((actions, ns1) =>
      pipe(
        map(compose(fromJS, cb(ns1))), //
        list => list.flatten(true)
      )(actions)
    )
  );

export const toImmActionDefaults = toImmActions(
  always((init, type) => ({
    [type]: init,
    [deriveErrorState(type)]: null,
  }))
);

export const toImmActionNames = ns0 =>
  toImmActions(ns1 => (_, type) => ({
    [type]: [ns0, ns1, type],
    [deriveErrorState(type)]: [ns0, ns1, deriveErrorState(type)],
  }));

export const actionDefaults = Map({
  [PAGE]: toImmActionDefaults(pageActions),
  [FABLE]: toImmActionDefaults(fableActions),
});

export const actions = Map({
  [PAGE]: toImmActionNames(PAGE)(pageActions),
  [FABLE]: toImmActionNames(FABLE)(fableActions),
});

export default actions.toJS();
