<template>
  <q-card>
    <q-card-section>
      <q-select
        v-model="selected"
        :options="workspaces"
        option-value="uniqueID"
        option-label="displayName"
        emit-value
        map-options
        @update:model-value="updateId"
      ></q-select>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const { state, commit } = useStore()
    const workspaces = computed(() => state.workspaces.workspaces)
    const selected = ref(null)

    function updateId() {
      commit('workspaces/updateId', selected.value)
    }

    return {
      workspaces,
      selected,
      updateId
    }
  }
}
</script>
