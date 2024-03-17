<script lang="ts">
import { defineComponent } from 'vue';
import { useCurrencyInput, type CurrencyInputOptions } from 'vue-currency-input';

export default defineComponent({
    props: {
        modelValue: {
            type: Number,
            required: true,
        },
        options: {
            type: Object as () => CurrencyInputOptions,
            default: () => ({}),
        },
        hideValue: {
            type: Boolean,
            default: false,
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
    emits: ['update:modelValue', 'blur', 'focus', 'change'],
    data() {
        return {
            input_container: undefined as HTMLDivElement | undefined,
        };
    },
    methods: {
        blur() {
            this.$emit('blur');
            this.input_container?.classList.remove('focus-visible');
        },
        focus() {
            this.$emit('focus');
            setTimeout(() => {
                this.input_container?.classList.add('focus-visible');
            }, 20);
        },
    },
    mounted() {
        this.input_container = this.$refs.input_container as HTMLDivElement;
    },
    setup(props) {
        const { inputRef } = useCurrencyInput(props.options)

        if (props.focusOnMount) {
            inputRef.value?.focus();
        }

        return { inputRef }
    }
})
</script>

<template>
    <div class="flex flex-col w-full">
        <div class="flex flex-row p-1 h-10 w-full rounded-[5px] outline outline-gray-600
                 outline-1 border-[3px] border-transparent" ref="input_container" :class="{'outline-red-600 outline-2' : haveError}">
            <input ref="inputRef" :type="hideValue ? 'password' : 'text'" class="w-full" @blur="blur" @focus="focus" :placeholder="placeholder">
            <slot>
            </slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.focus-visible {

    outline: none;

    border: double 3px transparent;
    background-image: linear-gradient(white, white),
        linear-gradient(to bottom, #989c11, #c4ca0d);
    background-origin: border-box;
    background-clip: padding-box, border-box;
}

input {
    &:focus-visible {
        outline: none;
    }
}
</style>