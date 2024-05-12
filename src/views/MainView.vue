<script lang="ts">
import FooterBar from '@/components/FooterBar.vue';
import { defineComponent } from 'vue';



export default defineComponent({
    data() {
        return {

        };
    },
    beforeCreate() {
        //if is only on /app
        if (this.$route.path === '/app')
            this.$router.push({ name: 'app.users' });
    },
    components: { FooterBar }
})
</script>

<template>
    <div class="flex flex-col w-full h-dvh lg:flex-row-reverse">
        <RouterView></RouterView>
        <FooterBar></FooterBar>
    </div>
</template>
