<template>
  <q-page class="flex flex-center">
    <q-btn @click="send">Send</q-btn>
    <q-btn @click="send1">Send1</q-btn>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageIndex',
  setup() {
    function send() {
      window.API.onRequest({ command: 'send', value: '/go' })
    }
    function send1() {
      window.API.onRequest({ command: 'send', value: '/cue/1/go' })
    }
    return {
      send,
      send1
    }
  }
})
</script>
