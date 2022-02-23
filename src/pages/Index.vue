<template>
  <q-card class="q-gutter-x-md" style="padding: 0 5% 0 5%" flat>
    <q-card-section>
      <Workspaces />
    </q-card-section>
    {{ id }}
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

    onBeforeMount(() => {
      window.API.onResponse((args) => {
        console.log(args)
        switch (args.section) {
          case 'workspaces':
            commit('workspaces/updateWorkspaces', args.data)
            break
          case 'cueLists':
            console.log('updatecue')
            commit('cue/updateCueLists', args.data)
            break
          case 'selectedCues':
            if (args.data.length) {
              commit('cue/updateSelectedCue', args.data[0].uniqueID)
            } else {
              commit('cue/updateSelectedCue', '')
            }

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
