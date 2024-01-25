
<script lang="ts">
import LogoXL from '@/assets/logo/logo-xl.png';
import NormalButton from '@/components/NormalButton.vue';
import NormalInput from '@/components/NormalInput.vue';
import IconEye from '@/components/icons/IconEye.vue';
import IconEyeSlash from '@/components/icons/IconEyeSlash.vue';
import { authStore } from '@/stores/auth';
import { mapStores } from 'pinia';

import { defineComponent } from 'vue';
import { toast } from 'vue3-toastify';

export default defineComponent({
    data() {
        return {
            email: "",
            password: "",
            imageUrl: LogoXL,
            showPass: false,
        };
    },
    methods: {
        async login() {
            let loader = this.$loading.show();
            try {
                await this.authStore.login(this.email, this.password);
                this.$router.push('/app');
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message);
                }
            }
            loader.hide();
        },
        forgotPassword() {
            this.$router.push({ path: '/forgot-password', query: { email: this.email } });
        },
        handleEnter(event: KeyboardEvent) {
            if (event.key === 'Enter') {
                this.login();
            }
        }
    },
    computed: {
        ...mapStores(authStore)
    },
    components: { NormalInput, NormalButton, IconEye, IconEyeSlash }
})

</script>

<template>
    <div class="flex flex-col items-center justify-center h-full">
        <img :src="imageUrl" class="max-w-[250px] max-h-[250px]" />
        <p class="mb-4 text-2xl font-bold">OlimpoGym</p>
        <p class="mb-4 text-lg">Ingresá a tu cuenta</p>
        <div class="max-w-[300px]" @keydown="handleEnter">
            <p class="mb-1">E-mail</p>
            <NormalInput v-model:value="email" class="mb-4"></NormalInput>

            <p class="mb-1">Contraseña</p>
            <NormalInput v-model:value="password" class="mb-4" :hide-value="!showPass">
                <div class="flex flex-col justify-center h-full w-[30px] cursor-pointer select-none"
                    @click="showPass = !showPass">
                    <IconEye v-if="showPass"></IconEye>
                    <IconEyeSlash v-else></IconEyeSlash>
                </div>
            </NormalInput>
            <NormalButton @click="login" label="Iniciar sesión"></NormalButton>
        </div>
        <div class="my-2 text-blue-500 underline cursor-pointer select-none hover:text-blue-700"
            v-touch:tap="forgotPassword">
            Recuperar contraseña
        </div>
    </div>
</template>