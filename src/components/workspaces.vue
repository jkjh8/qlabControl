<template>
  <div class="q-gutter-y-md">
    <q-select
      v-model="selectedWorkspace"
      :options="workspaces"
      option-value="uniqueID"
      option-label="displayName"
      emit-value
      map-options
      label="Select Workspace"
      filled
      dense
      @update:model-value="updateId"
    >
      <template #after>
        <q-btn
          icon="svguse:icons.svg#refresh"
          color="green-10"
          flat
          round
          @click="reloadWorkspace"
        ></q-btn>
      </template>
    </q-select>
    <q-select
      v-model="selectedCueList"
      :options="cueLists"
      option-value="uniqueID"
      option-label="name"
      emit-value
      map-options
      label="Select Cue List"
      filled
      dense
      @update:model-value="updateCues"
    >
      <template #after>
        <q-btn
          icon="svguse:icons.svg#refresh"
          color="green-10"
          flat
          round
          @click="reloadCueLists"
        ></q-btn>
      </template>
    </q-select>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'

export default {
  setup() {
    const { state, commit } = useStore()
    const $q = useQuasar()
    const workspaces = computed(() => state.workspaces.workspaces)
    const cueLists = computed(() => state.cue.cueLists)
    const selectedWorkspace = computed({
      get() {
        return state.workspaces.id
      },
      set(v) {
        return commit('workspaces/updateId', v)
      }
    })
    const selectedCueList = computed({
      get() {
        return state.cue.selectedCueList
      },
      set(v) {
        window.API.onRequest({ command: 'selected' })
        return commit('cue/updateSelectedCueList', v)
      }
    })

    function updateId() {
      // commit('workspaces/updateId', selectedWorkspace.value)
      window.API.onRequest({
        command: 'selWorkspace',
        value: selectedWorkspace.value
      })
      commit('cue/updateSelectedCueList', null)
      commit('cue/updateCues', [])
    }

    function reloadWorkspace() {
      window.API.onRequest({ command: 'workspaces' })
    }

    function reloadCueLists() {
      if (selectedWorkspace.value) {
        window.API.onRequest({
          command: 'cueLists',
          value: selectedWorkspace.value
        })
      } else {
        $q.notify({
          message: 'Workspace not selected',
          caption: 'Please select a workspace!',
          position: 'top',
          color: 'negative',
          textColor: 'white'
        })
      }
    }

    function updateCues() {
      cueLists.value.forEach((list) => {
        if (list.uniqueID === selectedCueList.value) {
          commit('cue/updateCues', list.cues)
        }
      })
    }

    onMounted(() => {
      window.API.onRequest({ command: 'start' })
    })

    return {
      workspaces,
      cueLists,
      selectedWorkspace,
      selectedCueList,
      updateId,
      reloadWorkspace,
      updateCues,
      reloadCueLists
    }
  }
}
</script>
