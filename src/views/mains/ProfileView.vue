<script lang="ts">
import { authStore } from '@/stores/auth';
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';



export default defineComponent({
  data() {
    return {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
      options: {}
    };
  },
  methods: {
    async logout() {
      await this.authStore.logout();
      this.$router.push('/');
    }
  },
  computed: {
    ...mapStores(authStore)
  }
})
</script>

<template>
  <div class="flex flex-col items-center w-full h-full my-3">
    <div class="p-3 text-white bg-red-600 rounded cursor-pointer hover:bg-red-400" @click="logout">Logout</div>
  </div>
</template>
