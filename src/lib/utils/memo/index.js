import memo from 'memoizee';

export { default } from 'memoizee';

export const memop = f =>
  memo(f, {
    normalizer: args => JSON.stringify(args[0]),
  });
