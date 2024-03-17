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
      addMembresiaView: false
    };
  },
  async mounted() {
    this.$router.beforeEach((to, from, next) => {
      this.addMembresiaView = to.name === 'app.membresias.add';
      next();
    });
    this.addMembresiaView = this.$route.name === 'app.membresias.add';
  },
  methods: {
    openAddMembresia() {
      this.addMembresiaView = true;
      // this.$router.push({ name: 'app.membresias.add' });
      //only change 
    },
    async deleteMembresia(membership: Membresia) {
      const result = await this.$ask('¿Estás seguro?');
      if (result) {
        await this.membershipsStore.deactivateMembership(membership._id);
      }
    },
    filterCurrency(value: number) {
      // patternn $ 1,000.00
      return value.toLocaleString('es-MX', {
        style: 'currency',
        currency: 'MXN'
      });
    }
  },
  computed: {
    ...mapStores(membershipStore)
  },
  watch: {
    addMembresiaView(val) {
      if (val) {
        this.$router.push({ name: 'app.membresias.add' });
      } else {
        this.$router.push({ name: 'app.membresias' });
      }
    }
  },
  components: { IconLupa, IconPlus, ToggleButton, IconPersonAvatar, IconArrowRight, NormalInput, SearchInput, PopupView, AddUser, IconTrash, PopupConfirm }
})
</script>

<template>
  <!-- Popup de agregar usuario -->
  <PopupView v-model:show="addMembresiaView">
    <RouterView />
  </PopupView>


  <!-- Esta vista se intercam,bia con el poup depende de la variable addUserView y el tamaño de la pantalla -->
  <div class="flex-col items-center flex-1 w-full overflow-hidden lg:flex"
    :class="{ 'hidden': addMembresiaView, 'flex': !addMembresiaView }">
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


    <div class="grid grid-cols-4 gap-2 p-2">
      <!-- Content -->
      <div v-for="(membership, index) in membershipsStore.memberships" :key="index"
        class="flex flex-col items-center p-2 border-b gap-2 rounded-lg w-[200px] bg-primary text-sm">
        <div class="w-full text-lg">
          {{ membership.nombre }}
        </div>
        <div class="w-full">
          {{ membership.descripcion }}
        </div>
        <!-- divider -->
        <div class="w-full h-[1px] bg-[#00000055]"></div>
        <div class="w-full">
          Duracion: {{ membership.plan_duracion }}
        </div>
        <div class="w-full">
          Precio: {{ filterCurrency(membership.precio) }}
        </div>
        <div class="flex flex-row justify-end flex-1 w-full h-full mx-3">
          <IconTrash class="w-[25px] h-[25px] ml-4 cursor-pointer" @click="deleteMembresia(membership)" />
        </div>
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
