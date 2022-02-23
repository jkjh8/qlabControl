<template>
  <q-card class="q-gutter-x-md" style="padding: 0 5% 0 5%" flat>
    <q-card-section>
      <Workspaces />
    </q-card-section>
    <q-card-section>
      <Table />
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'

import Workspaces from '../components/workspaces.vue'
import Table from '../components/table.vue'

export default defineComponent({
  name: 'PageIndex',
  components: { Workspaces, Table },
  setup() {
    const { state, commit } = useStore()
    const id = computed(() => state.workspaces.id)
    const workspace = computed(() => state.workspaces.id)
    const cueList = computed(() => state.cue.selectedCueList)

    onBeforeMount(() => {
      window.API.onResponse((args) => {
        switch (args.section) {
          case 'workspaces':
            commit('workspaces/updateWorkspaces', args.data)
            if (!workspace.value) {
              commit('workspaces/updateId', args.data[0].uniqueID)
              window.API.onRequest({
                command: 'selWorkspace',
                value: args.data[0].uniqueID
              })
            }
            break
          case 'cueLists':
            commit('cue/updateCueLists', args.data)
            if (!cueList.value) {
              commit('cue/updateSelectedCueList', args.data[0].uniqueID)
              commit('cue/updateCues', args.data[0].cues)
            } else {
              args.data.forEach((list) => {
                if (list.uniqueID === cueList.value) {
                  commit('cue/updateCues', list.cues)
                }
              })
            }
            break
          case 'selectedCues':
            if (args.data.length) {
              commit('cue/updateSelectedCue', args.data[0].uniqueID)
            } else {
              commit('cue/updateSelectedCue', '')
            }
            break
          case 'runningCues':
            const ids = args.data.map((e) => e.uniqueID)
            commit('cue/updateRunningCues', ids)
            break
        }
      })
    })

    return {
      id
    }
  }
})
</script>
