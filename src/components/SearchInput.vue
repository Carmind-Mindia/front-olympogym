<script lang="ts">
import { defineComponent } from 'vue';
import IconLupa from './icons/IconLupa.vue';

export default defineComponent({
    props: {
        value: {
            type: String,
            required: true,
        },
        haveError: {
            type: Boolean,
            default: false,
        },
        focusOnMount: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: "",
        },
    },
    emits: ['update:value', 'blur', 'focus'],
    data() {
        return {
            innerHTMLInput: undefined as HTMLInputElement | undefined,
            input_container: undefined as HTMLDivElement | undefined,
        };
    },
    methods: {
        updateValue(event: Event) {
            this.$emit('update:value', (event.target as HTMLInputElement).value);
        },
        blur() {
            this.$emit('blur');
            this.input_container?.classList.remove("!border-black","!outline-white");
        },
        focus() {
            this.$emit('focus');
            this.input_container?.classList.add("!border-black", "!outline-white");
        },
    },
    mounted() {
        this.innerHTMLInput = this.$refs.inner_input as HTMLInputElement;
        this.input_container = this.$refs.input_container as HTMLDivElement;
        if (this.focusOnMount) {
            this.innerHTMLInput?.focus();
        }
    },
    components: { IconLupa }
})
</script>

<template>
    <div class="flex flex-row  w-full h-10 p-1 rounded-[16px] bg-white outline-transparent outline outline-1 border-2 border-transparent" ref="input_container" :class="{'outline-red-600 outline-2' : haveError}">
        <input ref="inner_input" :value="value" class="w-full outline-none" @blur="blur" @focus="focus" @input="updateValue" :placeholder="placeholder">
        <IconLupa class="w-[30px] h-[30px] ml-2" :lupa-color="'black'" :bg-color="'#999999'"/>
    </div>
</template>

<style lang="scss" scoped>

</style>