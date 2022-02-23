<template>
  <div class="q-ma-md q-gutter-x-md row justify-center">
    <q-btn icon="svguse:icons.svg#rewind" flat round size="lg">
      <q-tooltip>Rewind</q-tooltip>
    </q-btn>
    <q-btn
      icon="svguse:icons.svg#play-circle"
      color="green-10"
      flat
      round
      size="lg"
      @click="play"
    >
      <q-tooltip>Play</q-tooltip>
    </q-btn>
    <q-btn icon="svguse:icons.svg#pause" color="yellow-8" flat round size="lg">
      <q-tooltip>Pause</q-tooltip>
    </q-btn>
    <q-btn
      icon="svguse:icons.svg#stop-circle"
      color="red-10"
      flat
      round
      size="lg"
      @click="stop"
    >
      <q-tooltip>Stop</q-tooltip>
    </q-btn>
    <q-btn icon="svguse:icons.svg#fast-forward" flat round size="lg">
      <q-tooltip>Fast Forward</q-tooltip>
    </q-btn>
  </div>
</template>

<script>
export default {
  setup() {
    function play() {
      window.API.onRequest({ command: 'command', value: 'go' })
    }
    function stop() {
      window.API.onRequest({ command: 'command', value: 'stop' })
    }

    return {
      play,
      stop
    }
  }
}
</script>
