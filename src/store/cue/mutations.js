export function updateCues(state, payload) {
  console.log(payload)
  const cueNames = payload.map((e) => {
    return { name: e.listName, cue: e.number }
  })
  console.log(cueNames)
  window.API.onRequest({ command: 'cueNames', value: cueNames })
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
