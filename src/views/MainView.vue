<script lang="ts">
import FooterBar from '@/components/FooterBar.vue';
import { defineComponent } from 'vue';



export default defineComponent({
  data() {
    return {

    };
  },
  methods: {
  },
  components: { FooterBar }
})
</script>

<template>
  <div class="flex flex-col w-full h-full lg:flex-row-reverse">
    <RouterView></RouterView>
    <FooterBar></FooterBar>
  </div>
</template>
