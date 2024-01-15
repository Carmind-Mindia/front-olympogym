<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        isSelected: {
            type: Boolean,
            default: false
        },
    },
})
</script>

<template>
  <svg width="800px" height="800px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg" class="stroke-white fill-none" :class="{'!stroke-accent' : isSelected}">
    <path stroke-width="1.5px"
      d="M9.11,5.08c0,2.39-3.81,6-3.81,6s-3.82-3.58-3.82-6A3.7,3.7,0,0,1,5.3,1.5,3.7,3.7,0,0,1,9.11,5.08Z" />
    <circle class="fill-white stroke-none" :class="{'!fill-accent' : isSelected}" cx="5.3" cy="5.32" r="0.95" />
    <path stroke-width="1.5px"
      d="M4.34,13h4.3A2.39,2.39,0,0,1,11,15.34h0a2.39,2.39,0,0,1-2.38,2.39H3.86a2.39,2.39,0,0,0-2.38,2.38h0A2.39,2.39,0,0,0,3.86,22.5H17.7" />
    <line stroke-width="1.5px" x1="16.75" y1="9.14" x2="16.75" y2="20.59" />
    <polygon stroke-width="1.5px" points="16.75 14.86 21.52 14.86 20.57 12.96 21.52 11.04 16.75 11.04 16.75 14.86" />
  </svg>
</template>