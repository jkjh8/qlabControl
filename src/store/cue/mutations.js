export function updateCues(state, payload) {
  state.cues = payload
}

export function updateCueLists(state, payload) {
  state.cueLists = payload
}
export function updateSelectedCueList(state, payload) {
  state.selectedCueList = payload
}
export function updateSelectedCue(state, payload) {
  state.selectedCue = payload
}
export function updateRunningCues(state, payload) {
  state.runningCues = payload
}
