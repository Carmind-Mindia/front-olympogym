<script lang="ts">
import LogoXL from '@/assets/logo/logo-xl.png';
import { defineComponent, shallowRef } from 'vue';
import IconCar from './icons/footer-bar/IconCar.vue';
import IconPerson from './icons/footer-bar/IconPerson.vue';
import IconRoute from './icons/footer-bar/IconRoute.vue';
import IconUsers from './icons/footer-bar/IconUsers.vue';

export default defineComponent({
    emits: ["click"],
    data() {
        return {
          options:[
            {
              label: "Usuarios",
              icon: shallowRef(IconUsers),
              route: "app.home"
            },
            {
              label: "Perfil",
              icon: shallowRef(IconPerson),
              route: "app.profile"
            },
          ],
          selected: 0,
          imageUrl: LogoXL,
        };
    },
    mounted() {
      this.selected = this.options.findIndex((item) => item.route === this.$route.name);
      console.log(this.options);
      
    },
    methods: {
      click(index: number){
        this.selected = index;
        this.$router.push({name: this.options[index].route});
      }
    },
    components: { IconRoute, IconCar, IconPerson }
})
</script>

<template>
  <div class="flex h-[64px] flex-row items-center justify-around w-full text-white bg-bg_menu lg:h-full lg:w-[240px] lg:flex-col lg:justify-normal lg:gap-4">
    <div class="hidden lg:flex">
      <img :src="imageUrl" class="max-w-[240px] max-h-[240px] z-40 select-none" />
    </div>
    <div class="flex flex-col items-center min-w-[60px] cursor-pointer lg:hover:bg-[#424242] lg:w-full lg:p-2 lg:flex-row lg:gap-2" v-for="item,index in options" :key="item.route" @click="click(index)">
      <component :is="item.icon" class="w-[35px] h-[35px]" :is-selected="index === selected"></component>
      <span class="text-xs lg:text-base" :class="{'text-accent' : index === selected}">{{item.label}}</span>
    </div>
  </div>
</template>
