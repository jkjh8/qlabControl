<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-10">
      <q-toolbar class="q-my-md">
        <q-toolbar-title>
          <div class="q-gutter-x-sm items-center">
            <q-img style="width: 28px" class="q-ml-md" src="qcontrolLogo.png" />
            <span class="text-h5" style="font-family: 다음체"
              >QLAB CONTROL</span
            >
          </div>
        </q-toolbar-title>
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
import { defineComponent } from 'vue'
import PlayControl from '../components/control.vue'

export default defineComponent({
  name: 'MainLayout',
  components: { PlayControl },
  setup() {
    return {}
  }
})
</script>
