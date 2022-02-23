<template>
  <div>
    <q-table
      :rows="cues"
      :columns="[
        { name: 'number', align: 'center', label: 'Number', field: 'number' },
        { name: 'name', align: 'center', label: 'Name', field: 'listName' },
        { name: 'type', align: 'center', label: 'Type', field: 'type' },
        { name: 'actions', align: 'center', label: 'Actions' }
      ]"
    >
      <template #body="props">
        <q-tr
          :props="props"
          :class="props.row.uniqueID === selected ? 'bg-yellow-3' : 'bg-white'"
          @click="clickRow(props.row)"
        >
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
                @click.prevent.stop="playDir(props.row.uniqueID)"
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

    function clickRow(row) {
      console.log('click', row)
      commit('cue/updateSelectedCue', row.uniqueID)
      window.API.onRequest({ command: 'selectCue', value: row.uniqueID })
    }

    function playDir(id) {
      window.API.onRequest({ command: 'playDirect', value: id })
    }

    return {
      cues,
      clickRow,
      selected,
      playDir
    }
  }
}
</script>
