<template>
    
    <button 
        :class="[
            classes, classButton, conditionClases,
            {'border':true},
            {'gap-2': nameIconLeft || isLoading},
            {'opacity-50':isDisabled},
            'flex items-center justify-center'
        ]"
        :disabled="isDisabled"
        :style="{
            color:chainStore.$colorContrast0, 
            backgroundColor: chainStore.$bgColor0,
            borderColor: chainStore.$colorContrast0
        }"
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
        <Spinner 
            v-if="isLoading"
            :color="chainStore.$colorContrast0"
            classContainer="w-6 h-6 inline my-[-2px]"
        />
        <slot></slot>
    </button>
    
</template>

<script setup>
import { computed, toRefs } from 'vue'
import { defineProps, defineEmits } from 'vue'
//
import IconCustomColor from '..//IconCustomColor.vue';
import Spinner from '../Spinner.vue';
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
    isLoading: {
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


const isDisabled = computed(() => disabled.value);

const handleClick = () => {
    if (!isDisabled.value) {
        emit('click');
    }
};
</script>
