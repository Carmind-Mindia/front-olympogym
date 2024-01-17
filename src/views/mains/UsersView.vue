<script lang="ts">
import type { User } from '@/services/user-hub.api.types';
import { authStore } from '@/stores/auth';
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';



export default defineComponent({
  data() {
    return {
      users: [] as User[],
    };
  },
  async mounted() {
    this.users = await this.authStore.getAllUsers();
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
    <div class="w-full text-black">
      <div v-for="(user, index) in users" :key="index" class="flex justify-between p-2 border-b border-gray-200">
        <div class="text-gray-700">{{ user.FirstName }}</div>
        <div class="text-gray-700">{{ user.LastName }}</div>
      </div>
    </div>
  </div>
</template>
