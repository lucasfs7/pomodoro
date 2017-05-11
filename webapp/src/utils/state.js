export const mergeState = (newState) => (oldState) => ({
  ...oldState,
  ...newState
})
