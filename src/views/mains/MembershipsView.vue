<script lang="ts">
import NormalInput from '@/components/NormalInput.vue';
import PopupConfirm from '@/components/PopupConfirm.vue';
import PopupView from '@/components/PopupView.vue';
import SearchInput from '@/components/SearchInput.vue';
import ToggleButton from '@/components/ToggleButton.vue';
import IconArrowRight from '@/components/icons/IconArrowRightWithBg.vue';
import IconLupa from '@/components/icons/IconLupa.vue';
import IconPersonAvatar from '@/components/icons/IconPersonAvatar.vue';
import IconPlus from '@/components/icons/IconPlus.vue';
import IconTrash from '@/components/icons/IconTrash.vue';
import type { Membresia } from '@/services/olimpo-gym.api.types';
import { membershipStore } from '@/stores/membership';
import AddUser from '@/views/mains/AddUser.vue';
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';


export default defineComponent({
  data() {
    return {
      membreships: [] as Membresia[],
      addMembresiaView: false
    };
  },
  async mounted() {
    this.$router.beforeEach((to, from, next) => {
      if (to.name === 'app.membresias.add' || to.name === 'app.membresias.edit') {
        this.addMembresiaView = true;
      } else {
        this.addMembresiaView = false;
      }
      next();
    });
    if (this.$route.name === 'app.membresias.add' || this.$route.name === 'app.membresias.edit') {
      this.addMembresiaView = true;
    } else {
      this.addMembresiaView = false;
    }
    this.membreships = await this.membershipsStore.getAllMemberships();
  },
  methods: {
    openAddMembresia() {
      this.addMembresiaView = true;
      this.$router.push({ name: 'app.membresias.add' });
      //only change 
    },
    editMembresia(membership: Membresia) {
      this.$router.push({ name: 'app.membresias.edit', params: { id: membership.id } });
    },
    async deleteMembresia(membership: Membresia) {
      const result = await this.$ask('¿Estás seguro?');
      if (result) {
        await this.membershipsStore.deactivateMembership(membership.id);
      }
    }
  },
  computed: {
    ...mapStores(membershipStore)
  },
  components: { IconLupa, IconPlus, ToggleButton, IconPersonAvatar, IconArrowRight, NormalInput, SearchInput, PopupView, AddUser, IconTrash, PopupConfirm }
})
</script>

<template>
  <!-- Popup de agregar usuario -->
  <PopupView :show="addMembresiaView">
    <RouterView />
  </PopupView>


  <!-- Esta vista se intercam,bia con el poup depende de la variable addUserView y el tamaño de la pantalla -->
  <div class="flex-col items-center flex-1 w-full overflow-hidden lg:flex" :class="{ 'hidden': addMembresiaView, 'flex': !addMembresiaView }">
    <!-- Top bar -->
    <div class="flex h-[120px] min-h-[120px] bg-bg_menu w-full flex-col px-4">
      <div class="flex flex-row-reverse w-full my-4">
        <!-- <SearchInput class="w-full h-[45px] max-w-[400px] mr-6" ref="searchInput" placeholder="Buscar"
          v-model:value="searchBarValue" @update:value="search"/> -->
        <IconPlus class="w-[45px] h-[45px] cursor-pointer" @click="openAddMembresia" />
      </div>
      <!-- <div class="flex flex-row w-full gap-2">
        <ToggleButton class="max-h-[30px]" label="Actividad reciente" :isSelect="true" />
        <ToggleButton class="max-h-[30px]" label="Actividad antigua" :isSelect="true" />
      </div> -->
    </div>


    <div class="grid grid-cols-4">
      <!-- Content -->
      <div v-for="(membership, index) in membreships" :key="index"
        class="flex flex-row items-center h-16 p-2 border-b rounded-lg bg-primary">
        <!-- <IconPersonAvatar class="w-[48px] h-[48px]" :color="!!user.AvatarColor ? user.AvatarColor : '#000000' "/> -->
        <div class="flex flex-col items-start flex-1 h-full mx-3">
          <div class="flex flex-row">
            <div class="text-gray-700">{{ membership.nombre }}</div>
          </div>
        </div>
        <IconArrowRight class="w-[32px] h-[32px] cursor-pointer" @click="editMembresia(membership)" />
        <IconTrash class="w-[32px] h-[32px] ml-4 cursor-pointer" @click="deleteMembresia(membership)" />
      </div>
    </div>

    
    <!-- Content -->
    <!-- <div class="flex flex-col w-full h-full gap-2 p-3 overflow-auto text-black">
      <div v-for="(user, index) in usersFiltered" :key="index"
        class="flex flex-row items-center h-16 p-2 border-b rounded-lg bg-primary">
        <IconPersonAvatar class="w-[48px] h-[48px]" :color="!!user.AvatarColor ? user.AvatarColor : '#000000' "/>
        <div class="flex flex-col items-start flex-1 h-full mx-3">
          <div class="flex flex-row">
            <div class="text-gray-700">{{ user.FirstName + " " + user.LastName }}</div>
          </div>
        </div>
        <IconArrowRight class="w-[32px] h-[32px] cursor-pointer" @click="editUser(user)" />
        <IconTrash class="w-[32px] h-[32px] ml-4 cursor-pointer" @click="deleteUser(user)" />
      </div>
    </div> -->
  </div>
</template>
