<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
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
    },
    mounted() {
        this.mediaQuery.addEventListener('change', this.handleScreenChange);

        // Initial check
        this.isMobile = this.mediaQuery.matches;
    },
    unmounted() {
        this.mediaQuery.removeEventListener('change', this.handleScreenChange);
    },
})
</script>

<template>
    <Transition :name="isMobile ? '' : 'fade'" ref="transitionBlock">
        <div v-if="show" class="lg:fixed top-0 left-0 z-40 w-full h-full flex bg-[#0000005e] items-center justify-center">
            <div class="z-50 w-full h-full bg-white lg:w-fit lg:h-fit">
                <slot></slot>
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