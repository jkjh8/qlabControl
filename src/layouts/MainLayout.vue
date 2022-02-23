<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-10" style="padding: 0 5%">
      <q-toolbar class="q-my-md">
        <q-toolbar-title>
          <div class="q-gutter-x-sm items-center">
            <q-img style="width: 28px" class="q-ml-md" src="qcontrolLogo.png" />
            <span class="text-h5" style="font-family: 다음체"
              >QLAB CONTROL</span
            >
          </div>
        </q-toolbar-title>
        <div class="q-gutter-x-md row no-wrap items-start">
          <q-input
            v-model="port"
            filled
            dense
            type="number"
            label="Server Port"
            :disable="status"
          ></q-input>
          <q-btn
            v-model="status"
            style="width: 5rem; height: 2.4rem"
            :color="status ? 'green-10' : 'red-10'"
            @click="connect"
          >
            <div style="font-size: 0.6rem">
              {{ status ? 'Disconnect' : 'Connect' }}
            </div>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-white text-grey-10">
      <q-separator />
      <PlayControl />
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import PlayControl from '../components/control.vue'

export default defineComponent({
  name: 'MainLayout',
  components: { PlayControl },
  setup() {
    const { state, commit } = useStore()
    const port = computed({
      get() {
        return state.server.port
      },
      set(v) {
        return commit('server/updatePort', v)
      }
    })
    const status = computed({
      get() {
        return state.server.status
      },
      set(v) {
        return commit('server/updateServerStatus', v)
      }
    })

    function connect() {
      if (!status.value) {
        window.API.onRequest({ command: 'openServer', port: port.value })
      } else {
        window.API.onRequest({ command: 'closeServer' })
      }
    }
    return {
      port,
      status,
      connect
    }
  }
})
</script>
