<script lang="ts">
import { defineComponent, shallowRef } from 'vue';
import IconCar from './icons/footer-bar/IconCar.vue';
import IconPerson from './icons/footer-bar/IconPerson.vue';
import IconRoute from './icons/footer-bar/IconRoute.vue';

export default defineComponent({
    emits: ["click"],
    data() {
        return {
          options:[
            //Vehiculos
            {
              label: "Vehiculos",
              icon: shallowRef(IconCar),
              route: "app.home"
            },
            //Rutas
            {
              label: "Rutas",
              icon: shallowRef(IconRoute),
              route: "app.gps"
            },
            {
              label: "Perfil",
              icon: shallowRef(IconPerson),
              route: "app.profile"
            },
          ],
          selected: 0,
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
  <div class="flex h-[64px] flex-row items-center justify-around w-full text-white bg-bg_menu">
    <div class="flex flex-col items-center min-w-[60px] cursor-pointer" v-for="item,index in options" :key="item.route" @click="click(index)">
      <component :is="item.icon" class="w-[35px] h-[35px]" :is-selected="index === selected"></component>
      <span class="text-xs" :class="{'text-accent' : index === selected}">{{item.label}}</span>
    </div>
  </div>
</template>
