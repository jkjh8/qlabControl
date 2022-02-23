<template>
  <div>
    <q-table
      :rows="cues"
      :columns="[
        { name: 'status', align: 'center', label: 'Playing' },
        { name: 'number', align: 'center', label: 'Cue', field: 'number' },
        { name: 'name', align: 'center', label: 'Name', field: 'listName' },
        { name: 'type', align: 'center', label: 'Type', field: 'type' },
        { name: 'actions', align: 'center', label: 'Actions' }
      ]"
      hide-bottom
      :pagination="{ rowsPerPage: 0 }"
    >
      <template #body="props">
        <q-tr
          :props="props"
          :class="props.row.uniqueID === selected ? 'bg-yellow-3' : 'bg-white'"
          @click="clickRow(props.row)"
        >
          <q-td key="status" :props="props">
            <div>
              <q-spinner-audio
                v-if="runningCues.includes(props.row.uniqueID)"
                color="primary"
                size="2em"
              />
            </div>
          </q-td>
          <q-td key="number" :props="props">
            <div>{{ props.row.number }}</div>
          </q-td>
          <q-td key="name" :props="props">
            <div>{{ props.row.listName }}</div>
          </q-td>
          <q-td key="type" :props="props">
            <div>{{ props.row.type }}</div>
          </q-td>
          <q-td key="actions" :props="props">
            <div>
              <q-btn
                icon="svguse:icons.svg#play-circle"
                flat
                round
                color="green-10"
                @click.prevent.stop="playDir(props.row.number)"
              />
              <q-btn
                icon="svguse:icons.svg#stop-circle"
                flat
                round
                color="red-10"
                @click.prevent.stop="stop(props.row.number)"
              />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const { state, commit } = useStore()
    const cues = computed(() => state.cue.cues)
    const selected = computed(() => state.cue.selectedCue)
    const runningCues = computed(() => state.cue.runningCues)

    function clickRow(row) {
      console.log('click', row)
      commit('cue/updateSelectedCue', row.uniqueID)
      window.API.onRequest({ command: 'selectCue', value: row.uniqueID })
    }

    function playDir(id) {
      window.API.onRequest({ command: 'cue', value: `${id}/start` })
    }

    function stop(id) {
      window.API.onRequest({ command: 'cue', value: `${id}/stop` })
    }

    return {
      cues,
      clickRow,
      selected,
      playDir,
      runningCues,
      stop
    }
  }
}
</script>
