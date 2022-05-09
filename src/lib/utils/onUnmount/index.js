export const onUnmount = cleaner => {
  const listener = () => {
    cleaner();
    removeEventListener('beforeunload', listener);
  };
  addEventListener('beforeunload', listener);
};

export default onUnmount;
