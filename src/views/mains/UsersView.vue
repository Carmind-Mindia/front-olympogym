<script lang="ts">
import IconLupa from '@/components/icons/IconLupa.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import ToggleButton from '@/components/ToggleButton.vue';
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
    },
    components: { IconLupa, IconPlus, ToggleButton }
})
</script>

<template>
  <div class="flex flex-col items-center w-full h-full">
    <div class="flex h-[120px] bg-bg_menu w-full flex-col px-4">
      <div class="flex flex-row justify-between w-full my-4">
        <IconLupa class="w-[45px] h-[45px] cursor-pointer" />
        <IconPlus class="w-[45px] h-[45px] cursor-pointer" />
      </div>
      <div class="flex flex-row w-full gap-2">
        <ToggleButton class="h-[30px]" label="Actividad reciente" :isSelect="true" />
        <ToggleButton class="h-[30px]" label="Actividad antigua" :isSelect="true" />
      </div>
    </div>
    <div class="w-full text-black">
      <div v-for="(user, index) in users" :key="index" class="flex justify-between p-2 border-b border-gray-200">
        <div class="text-gray-700">{{ user.FirstName }}</div>
        <div class="text-gray-700">{{ user.LastName }}</div>
      </div>
    </div>
  </div>
</template>
