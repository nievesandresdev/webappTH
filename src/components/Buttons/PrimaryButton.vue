<template>
    <div :class="classContainer">
        <button 
            :class="[classes, bgButton, conditionClases]"
            :disabled="isDisabled"
            @click="handleClick"
        >
            <slot></slot>
        </button>
    </div>
</template>

<script setup>
import { computed, toRefs } from 'vue'
import { defineProps, defineEmits } from 'vue'
import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();

const props = defineProps({
    classContainer: {
        type: String,
        default: ''
    },
    classes: {
        type: String,
        default: ''
    },
    conditionClases: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    },
});

const emit = defineEmits(['click']);

const { disabled } = toRefs(props);

const bgButton = computed(() => {
    let classbgButton;
    let primaryClasses = `bg-[${chainStore.customizationData?.colors[0].cod_hex}] text-[${chainStore.customizationData?.colors[0].contrast_color}]`;
    classbgButton = disabled.value ? 'primary-disabled' : primaryClasses;
    return classbgButton;
});

const isDisabled = computed(() => disabled.value);

const handleClick = () => {
    if (!isDisabled.value) {
        emit('click');
    }
};
</script>
