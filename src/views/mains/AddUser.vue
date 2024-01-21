<script lang="ts">
import type { User } from '@/services/user-hub.api.types';
import { authStore } from '@/stores/auth';
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';



export default defineComponent({
    data() {
        return {
            user: {} as User,
            searchBarValue: ''
        };
    },
    async mounted() {
    },
    methods: {
        back() {
          this.$router.back();
        },
    },
    computed: {
        ...mapStores(authStore)
    },
    components: {  }
})
</script>

<template>
  <div class="flex flex-col items-center w-full h-full">
    <!-- Top bar -->
    <div class="flex h-[120px] min-h-[120px] bg-bg_menu w-full flex-col px-4">
      <div class="flex flex-row justify-between w-full my-4 cursor-pointer" @click="back">
        gdfg
      </div>
      <div class="flex flex-row w-full gap-2">
        hjdfg
      </div>
    </div>

    <!-- Content -->
    <div class="flex flex-col w-full h-full p-3 text-black ">
    </div>
  </div>
</template>
