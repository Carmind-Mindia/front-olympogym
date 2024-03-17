<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  emits: ['click'],
  methods: {
    click() {
      this.$emit('click');
    },
    handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Enter' || event.key === ' ') {
        this.$emit('click');
      }
    },
  },
})
</script>

<template>
  <div class="w-full flex flex-col bg-bar text-white justify-center items-center h-[45px] rounded-md cursor-pointer focus" tabindex="0" 
    v-touch:tap="click" role="button" @keydown="handleKeyDown">
    {{ label }}
  </div>
</template>
