<template>
  <q-page class="flex flex-center q-gutter-x-md">
    <Workspaces />
    {{ id }}
    <div>
      <q-btn @click="go">GO</q-btn>
      <q-btn @click="stop">Stop</q-btn>
      <q-btn @click="pause">Pause</q-btn>
      <q-btn @click="resume">Resume</q-btn>
      <q-btn @click="cue1">CUE1/GO</q-btn>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'

import Workspaces from '../components/workspaces.vue'

export default defineComponent({
  name: 'PageIndex',
  components: { Workspaces },
  setup() {
    const { state, commit } = useStore()
    const workspaces = computed(() => state.workspaces.workspaces)
    const id = computed(() => state.workspaces.id)

    function go() {
      window.API.onRequest({ command: 'send', value: '/go' })
    }
    function stop() {
      window.API.onRequest({ command: 'send', value: '/stop' })
    }
    function pause() {
      window.API.onRequest({ command: 'send', value: '/pause' })
    }
    function resume() {
      window.API.onRequest({ command: 'connect', value: '/connect' })
    }
    function cue1() {
      window.API.onRequest({ command: 'workspaces', value: '/cue/1/start' })
    }

    onBeforeMount(() => {
      window.API.onResponse((args) => {
        console.log(args)
        switch (args.section) {
          case 'workspaces':
            commit('workspaces/updateWorkspaces', args.data)
            break
        }
      })
    })

    return {
      workspaces,
      id,
      go,
      stop,
      pause,
      cue1,
      resume
    }
  }
})
</script>
