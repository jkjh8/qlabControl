/*
export function someMutation (state) {
}
*/
export function updateName(state, payload) {
  state.name = payload
}

export function updateId(state, payload) {
  state.id = payload
}

export function updateWorkspaces(state, payload) {
  state.workspaces = payload
}
