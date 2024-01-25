<script lang="ts">
import NormalButton from '@/components/NormalButton.vue';
import NormalInput from '@/components/NormalInput.vue';
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import IconPersonAvatar from '@/components/icons/IconPersonAvatar.vue';
import type { User } from '@/services/user-hub.api.types';
import { authStore } from '@/stores/auth';
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';
import { toast } from 'vue3-toastify';



export default defineComponent({
  data() {
    return {
      user: {} as User,
      colors: ['#000000', '#3249C5', '#00B091', '#B340DB', '#BC2A2A', '#CD9C1F', '#F34398']
    };
  },
  mounted() {
    this.user.AvatarColor = this.colors[0];
  },
  methods: {
    back() {
      this.$router.back();
    },
    selectColor(color: string) {
      this.user.AvatarColor = color;
    },
    async insertUser() {
      let loader = this.$loading.show();
      try {
        await this.authStore.createUser(this.user);
        this.$router.push('/app');
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
      loader.hide();
    }
  },
  computed: {
    ...mapStores(authStore)
  },
  components: { IconArrowLeft, IconPersonAvatar, NormalInput, NormalButton }
})
</script>

<template>
  <div class="flex flex-col items-center w-full h-full">
    <!-- Top bar -->
    <div class="flex h-[60px] min-h-[60px] bg-bg_menu w-full flex-row items-center px-4">
      <IconArrowLeft class="w-6 h-6 text-white cursor-pointer lg:hidden" @click="back"></IconArrowLeft>
      <div class="flex-1 mx-4 text-3xl font-normal text-white">Nuevo usuario</div>
      <div class="hidden w-6 h-6 text-right text-white cursor-pointer lg:block" @click="back">X</div>
    </div>

    <!-- Content -->
    <div class="flex flex-col w-full h-full p-3 text-black ">
      <div class="flex flex-row">
        <IconPersonAvatar class="w-14 h-14" :color="user.AvatarColor"></IconPersonAvatar>
        <div class="flex flex-col justify-between py-1 ml-4">
          Avatar
          <div class="flex flex-row gap-3">
            <div class="w-5 h-5 cursor-pointer" v-for="(item, index) in colors"
              :class="{ 'border-2 border-black': user.AvatarColor === item }" :key="index"
              :style="'background-color: ' + item" @click="selectColor(item)"></div>
          </div>
        </div>
      </div>
      <div class="flex flex-col mt-6">
        <p class="mb-3">DNI</p>
        <NormalInput v-model:value="user.DocumentNumber" class=""></NormalInput>
      </div>
      <div class="flex flex-col mt-6">
        <p class="mb-3">Nombre</p>
        <NormalInput v-model:value="user.FirstName" class=""></NormalInput>
      </div>
      <div class="flex flex-col mt-6">
        <p class="mb-3">Apellido</p>
        <NormalInput v-model:value="user.LastName" class=""></NormalInput>
      </div>
      <div class="flex flex-col mt-6">
        <p class="mb-3">Número de celular</p>
        <NormalInput v-model:value="user.Phone" class=""></NormalInput>
      </div>
      <div class="flex flex-row justify-end mt-6">
        <NormalButton @click="insertUser" label="Guardar" class="w-[140px]"></NormalButton>
      </div>
    </div>
  </div>
</template>
