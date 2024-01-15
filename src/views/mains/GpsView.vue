<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      center: { lat: -48.404479, lng: -69.651008 },
      zoom: 6,
      options: {
        mapId: 'aa99da66fc3150b',
        // minZoom: 5
      }
    }
  },
  methods: {},
  components: {}
})
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <GMapMap class="w-full h-full" :center="center" :zoom="zoom" :options="options" map-type-id="terrain"> </GMapMap>
  </div>
</template>
