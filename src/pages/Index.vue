<template>
  <q-page class="flex flex-center">
    <q-btn @click="send">Send</q-btn>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageIndex',
  setup() {
    function send() {
      window.API.onRequest({ command: 'send' })
    }
    return {
      send
    }
  }
})
</script>
