<template>
    <div :class="[classContainer]">
        <button 
            :class="[classes, classButton, conditionClases,{'flex items-center gap-2 justify-center': nameIconLeft}]"
            :disabled="isDisabled"
            :style="{color:textColorButton, backgroundColor:bgButton}"
            @click="handleClick"
        >
            <IconCustomColor 
                width="20"
                height="20"
                v-if="nameIconLeft"
                :name="nameIconLeft" 
                :color="chainStore.customizationData?.colors[0].contrast_color" 
                only-change-background 
            />
            <slot></slot>
        </button>
    </div>
</template>

<script setup>
import { computed, toRefs } from 'vue'
import { defineProps, defineEmits } from 'vue'
//
import IconCustomColor from '..//IconCustomColor.vue';
//
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
    nameIconLeft: {
        type: String,
        default: null
    },
});

const emit = defineEmits(['click']);

const { disabled } = toRefs(props);

const classButton = computed(() => {
    return disabled.value ? 'primary-disabled' : '';
});

const bgButton = computed(() => {
    return disabled.value ? '' : chainStore.customizationData?.colors[0].cod_hex;
});

const textColorButton = computed(() => {
    let textButton = disabled.value ? '' : chainStore.customizationData?.colors[0].contrast_color;
    return textButton;
});

const isDisabled = computed(() => disabled.value);

const handleClick = () => {
    if (!isDisabled.value) {
        emit('click');
    }
};
</script>
