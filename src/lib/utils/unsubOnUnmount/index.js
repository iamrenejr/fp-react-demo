export const EVENT = 'beforeunload';

export const unsubOnUnmount = streams => {
  const listener = () => {
    streams.map(stream$ => stream$.unsubscribe());
    removeEventListener(EVENT, listener);
  };
  addEventListener(EVENT, listener);
};

export default unsubOnUnmount;
