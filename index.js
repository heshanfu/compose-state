const composeStateFactory = stateIndex => (...updaters) =>
  updaters.reduceRight(
    (accumulator, current) => (...args) => {
      const accumulatedState = accumulator(...args);
      const currentState =
        current instanceof Function
          ? current(
              ...args.slice(0, stateIndex),
              { ...args[stateIndex], ...accumulatedState },
              ...args.slice(stateIndex + 1),
            )
          : current;

      return currentState || accumulatedState
        ? { ...accumulatedState, ...currentState }
        : null;
    },
    () => null,
  );

const composeState = composeStateFactory(0);
const composeDerivedStateFromProps = composeStateFactory(1);

export { composeState, composeDerivedStateFromProps, composeState as default };
