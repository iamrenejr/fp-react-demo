import memo from 'memoizee';

export const toErrorState = memo(type => `${type}_ERROR`);

export default toErrorState;
