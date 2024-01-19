<script lang="ts">
import IconArrowRight from '@/components/icons/IconArrowRight.vue';
import IconLupa from '@/components/icons/IconLupa.vue';
import IconPersonAvatar from '@/components/icons/IconPersonAvatar.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import NormalInput from '@/components/NormalInput.vue';
import SearchInput from '@/components/SearchInput.vue';
import ToggleButton from '@/components/ToggleButton.vue';
import type { User } from '@/services/user-hub.api.types';
import { authStore } from '@/stores/auth';
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';



export default defineComponent({
    data() {
        return {
            users: [] as User[],
            searchBarValue: ''
        };
    },
    async mounted() {
        this.users = await this.authStore.getAllUsers();
    },
    methods: {
        async logout() {
          await this.authStore.logout();
          this.$router.push('/');
        },
        // lupaClick() {
        //   (this.$refs.searchInput as any).$el.classList.toggle('hidden');
        //   (this.$refs.iconLupa as any).$el.classList.toggle('hidden');
        // },
    },
    computed: {
        ...mapStores(authStore)
    },
    components: { IconLupa, IconPlus, ToggleButton, IconPersonAvatar, IconArrowRight, NormalInput, SearchInput }
})
</script>

<template>
  <div class="flex flex-col items-center w-full h-full">
    <!-- Top bar -->
    <div class="flex h-[120px] min-h-[120px] bg-bg_menu w-full flex-col px-4">
      <div class="flex flex-row justify-between w-full my-4">
        <!-- <IconLupa class="w-[45px] h-[45px] cursor-pointer lg:hidden" ref="iconLupa" @click="lupaClick"/> -->
        <SearchInput class="w-full h-[45px] max-w-[400px] mr-6" ref="searchInput" placeholder="Buscar" :value="searchBarValue"/>
        <IconPlus class="w-[45px] h-[45px] cursor-pointer" />
      </div>
      <div class="flex flex-row w-full gap-2">
        <ToggleButton class="max-h-[30px]" label="Actividad reciente" :isSelect="true" />
        <ToggleButton class="max-h-[30px]" label="Actividad antigua" :isSelect="true" />
      </div>
    </div>

    <!-- Content -->
    <div class="flex flex-col w-full h-full p-3 text-black ">
      <div v-for="(user, index) in users" :key="index" class="flex flex-row items-center h-16 p-2 border-b rounded-lg bg-primary">.
        <IconPersonAvatar class="w-[48px] h-[48px]" />
        <div class="flex flex-col items-start flex-1 h-full mx-3">
          <div class="flex flex-row">
            <div class="text-gray-700">{{ user.FirstName }}</div>
            <div class="text-gray-700">{{ user.LastName }}</div>
          </div>
        </div>
        <IconArrowRight class="w-[32px] h-[32px]" />
      </div>
    </div>
  </div>
</template>
