<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            default: '¿Estás seguro?',
        },
        yesText: {
            type: String,
            default: 'Si',
        },
        noText: {
            type: String,
            default: 'No',
        },
        yesCallback: {
            type: Function,
            default: () => {},
        },
        noCallback: {
            type: Function,
            default: () => {},
        },
    },
    emits: ['yes', 'no'],
    data() {
        return {
            mediaQuery: window.matchMedia('(max-width: 1024px)'),
            isMobile: false,
        };
    },
    methods: {
        handleScreenChange(event: MediaQueryListEvent) {
            this.isMobile = event.matches;
        },
        clickYes() {
            this.$emit('yes');
            this.yesCallback();
        },
        clickNo() {
            this.$emit('no');
            this.noCallback();
        },
    },
})
</script>

<template>
    <Transition name="fade" ref="transitionBlock">
        <div v-if="show" class="absolute top-0 z-40 w-full h-full flex bg-[#0000005e] items-center justify-center">
            <div class="z-50 bg-white rounded-lg w-fit h-fit">
                <div class="flex flex-col p-1 max-w-[200px]">
                    <div class="mb-4 text-center">
                        {{ text }}
                    </div>
                    <div class="flex flex-row justify-between w-full">
                        <div class="w-[60px] mr-6 flex flex-col bg-red-700 text-white justify-center items-center h-[30px] rounded-md cursor-pointer"
                            @click="clickNo">
                            {{ noText }}
                        </div>
                        <div class="w-[60px] flex flex-col bg-bar text-white justify-center items-center h-[30px] rounded-md cursor-pointer"
                            @click="clickYes">
                            {{ yesText }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>