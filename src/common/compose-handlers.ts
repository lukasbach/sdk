export const composeHandlers =
  (...handlers: Array<() => void>) =>
  () => {
    handlers.forEach(handler => handler());
  };
