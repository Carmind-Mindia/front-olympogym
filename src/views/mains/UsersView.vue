<script lang="ts">
import NormalInput from '@/components/NormalInput.vue';
import PopupView from '@/components/PopupView.vue';
import SearchInput from '@/components/SearchInput.vue';
import ToggleButton from '@/components/ToggleButton.vue';
import IconArrowRight from '@/components/icons/IconArrowRightWithBg.vue';
import IconLupa from '@/components/icons/IconLupa.vue';
import IconPersonAvatar from '@/components/icons/IconPersonAvatar.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import type { User } from '@/services/user-hub.api.types';
import { authStore } from '@/stores/auth';
import AddUser from '@/views/mains/AddUser.vue';
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';



export default defineComponent({
  data() {
    return {
      users: [] as User[],
      usersFiltered: [] as User[],
      searchBarValue: '',
      addUserView: false
    };
  },
  async mounted() {
    this.$router.beforeEach((to, from, next) => {
      if (to.name === 'app.users.add') {
        this.addUserView = true;
      } else {
        this.addUserView = false;
      }
      next();
    });
    if (this.$route.name === 'app.users.add') {
      this.addUserView = true;
    } else {
      this.addUserView = false;
    }
    this.users = await this.authStore.getAllUsers();
    this.usersFiltered = this.users;
  },
  methods: {
    async logout() {
      await this.authStore.logout();
      this.$router.push('/');
    },
    openAddUser() {
      this.addUserView = true;
      this.$router.push({ name: 'app.users.add' });
      //only change 
    },
    search() {
      this.usersFiltered = this.users.filter((user) => {
        return user.FirstName.toLowerCase().includes(this.searchBarValue.toLowerCase()) ||
          user.LastName.toLowerCase().includes(this.searchBarValue.toLowerCase());
      });
    }
  },
  computed: {
    ...mapStores(authStore)
  },
  components: { IconLupa, IconPlus, ToggleButton, IconPersonAvatar, IconArrowRight, NormalInput, SearchInput, PopupView, AddUser }
})
</script>

<template>
  <!-- Popup de agregar usuario -->
  <PopupView :show="addUserView">
    <RouterView />
  </PopupView>

  <!-- Esta vista se intercam,bia con el poup depende de la variable addUserView y el tamaño de la pantalla -->
  <div class="flex-col items-center w-full h-full lg:flex" :class="{ 'hidden': addUserView, 'flex': !addUserView }">
    <!-- Top bar -->
    <div class="flex h-[120px] min-h-[120px] bg-bg_menu w-full flex-col px-4">
      <div class="flex flex-row justify-between w-full my-4">
        <SearchInput class="w-full h-[45px] max-w-[400px] mr-6" ref="searchInput" placeholder="Buscar"
          v-model:value="searchBarValue" @update:value="search"/>
        <IconPlus class="w-[45px] h-[45px] cursor-pointer" @click="openAddUser" />
      </div>
      <div class="flex flex-row w-full gap-2">
        <ToggleButton class="max-h-[30px]" label="Actividad reciente" :isSelect="true" />
        <ToggleButton class="max-h-[30px]" label="Actividad antigua" :isSelect="true" />
      </div>
    </div>


    <!-- Content -->
    <div class="flex flex-col w-full h-full gap-2 p-3 text-black">
      <div v-for="(user, index) in usersFiltered" :key="index"
        class="flex flex-row items-center h-16 p-2 border-b rounded-lg bg-primary">
        <IconPersonAvatar class="w-[48px] h-[48px]" :color="!!user.AvatarColor ? user.AvatarColor : '#000000' "/>
        <div class="flex flex-col items-start flex-1 h-full mx-3">
          <div class="flex flex-row">
            <div class="text-gray-700">{{ user.FirstName + " " + user.LastName }}</div>
          </div>
        </div>
        <IconArrowRight class="w-[32px] h-[32px]" />
      </div>
    </div>
  </div>
</template>
