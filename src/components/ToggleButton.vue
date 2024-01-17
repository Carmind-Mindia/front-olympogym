<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    isSelect: {
      type: Boolean,
      default: false,
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
  <div class="w-fit flex py-4 px-2 flex-col bg-[#D9D9D95E] text-white justify-center items-center h-full rounded-xl cursor-pointer" v-touch:tap="click">
    {{ label }}
  </div>
</template>
