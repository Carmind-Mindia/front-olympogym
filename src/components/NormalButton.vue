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
  },
})
</script>

<template>
  <div class="w-full flex flex-col bg-bar text-white justify-center items-center h-[45px] rounded-md cursor-pointer" v-touch:tap="click">
    {{ label }}
  </div>
</template>
