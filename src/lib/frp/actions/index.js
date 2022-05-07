export const actionDefaults = {
  INPUT_TEXT: '',
  ANSWER: '',
  BOX_INDEX: 0,
};

export const actions = Object.keys(actionDefaults).reduce(
  (a, i) => ({ ...a, [i]: i }),
  {}
);

export default actions;
