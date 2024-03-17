<script lang="ts">
import NormalButton from '@/components/NormalButton.vue';
import NormalInput from '@/components/NormalInput.vue';
import PesosInput from '@/components/PesosInput.vue';
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import IconPersonAvatar from '@/components/icons/IconPersonAvatar.vue';
import { MembershipApi } from '@/services/olimpo-gym.api';
import type { Membresia } from '@/services/olimpo-gym.api.types';
import { membershipStore } from '@/stores/membership';
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';
import type { CurrencyInputOptions } from 'vue-currency-input';
import { toast } from 'vue3-toastify';



export default defineComponent({
  data() {
    return {
      membership: {} as Membresia,
      colors: ['#000000', '#3249C5', '#00B091', '#B340DB', '#BC2A2A', '#CD9C1F', '#F34398'],
      currencyOptions: {
        currency: 'USD',
        autoDecimalDigits: false,
        hideCurrencySymbolOnFocus: false,
        hideGroupingSeparatorOnFocus: false,
        hideNegligibleDecimalDigitsOnFocus: false
      } as CurrencyInputOptions,
      duracionMembresias: [] as string[],
    };
  },
  async mounted() {
    this.membership = {precio: 0, activa: true} as Membresia;
    const durationResp = await MembershipApi.GET().getAllMembershipDurations();
    this.duracionMembresias = durationResp.data;
  },
  methods: {
    back() {
      this.$router.back();
    },
    async insertUser() {
      if (this.membership.precio === 0) {
        toast.error('El precio no puede ser 0');
        return;
      }

      if (this.membership.nombre === '') {
        toast.error('El nombre no puede estar vacio');
        return;
      }

      if (this.membership.plan_duracion === '') {
        toast.error('La duracion no puede estar vacia');
        return;
      }

      let loader = this.$loading.show();
      try {
        await this.membershipsStore.createMembership(this.membership);
        setTimeout(() => {
          toast.success('Membresia creada');
        }, 200);
        this.$router.back();
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
      loader.hide();
    }
  },
  computed: {
    ...mapStores(membershipStore)
  },
  components: { IconArrowLeft, IconPersonAvatar, NormalInput, NormalButton, PesosInput }
})
</script>

<template>
  <div class="flex flex-col items-center w-full h-full">
    <!-- Top bar -->
    <div class="flex h-[60px] min-h-[60px] bg-bg_menu w-full flex-row items-center px-4">
      <IconArrowLeft class="w-6 h-6 text-white cursor-pointer lg:hidden" @click="back"></IconArrowLeft>
      <div class="flex-1 mx-4 text-3xl font-normal text-white">Nueva membresia</div>
      <div class="hidden w-6 h-6 text-right text-white cursor-pointer lg:block" @click="back">X</div>
    </div>

    <!-- Content -->
    <div class="flex flex-col w-full h-full p-3 text-black ">
      <div class="flex flex-col mt-6">
        <p class="mb-3">Nombre</p>
        <NormalInput v-model:value="membership.nombre" class=""></NormalInput>
      </div>
      <div class="flex flex-col mt-6">
        <p class="mb-3">Precio</p>
        <PesosInput v-model="membership.precio" :options="currencyOptions" class=""></PesosInput>
      </div>
      <div class="flex flex-col mt-6">
        <p class="mb-3">Duracion</p>
        <!-- <NormalInput v-model:value="user.LastName" class=""></NormalInput> -->
        <select v-model="membership.plan_duracion" class="w-full h-10 rounded-[5px] outline outline-gray-600 outline-1 border-[3px] border-transparent">
          <option v-for="duracion in duracionMembresias" :value="duracion" :key="duracion">{{ duracion }}</option>
        </select>
      </div>
      <div class="flex flex-col mt-6">
        <p class="mb-3">Descripciòn</p>
        <NormalInput v-model:value="membership.descripcion" class=""></NormalInput>
      </div>
      <div class="flex flex-row justify-end mt-6">
        <NormalButton @click="insertUser" label="Guardar" class="w-[140px]"></NormalButton>
      </div>
    </div>
  </div>
</template>
