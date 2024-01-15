<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        isSelected: {
            type: Boolean,
            default: false
        },
    },
})
</script>


<template>
    <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M1.05756 19.0764C1.05756 17.6234 2.25044 16.3759 4.14255 15.443C5.99113 14.5315 8.21868 14.0764 9.66333 14.0764C11.108 14.0764 13.3355 14.5315 15.1841 15.443C17.0762 16.3759 18.2691 17.6234 18.2691 19.0764V24.2687H9.66333H1.05756V19.0764Z"
            class="stroke-white" :class="{'!stroke-accent' : isSelected}" stroke-width="1.53846" />
        <path
            d="M14.1827 6.09559C14.1827 8.59149 12.1594 10.6148 9.66346 10.6148C7.16756 10.6148 5.14423 8.59149 5.14423 6.09559C5.14423 3.59969 7.16756 1.57636 9.66346 1.57636C12.1594 1.57636 14.1827 3.59969 14.1827 6.09559Z"
            class="stroke-white" :class="{'!stroke-accent' : isSelected}" stroke-width="1.53846" />
    </svg>
</template>