export function getCueNames(state) {
  return state.cues.map((e) => e.listName)
}
