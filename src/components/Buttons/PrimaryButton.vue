<template>
    
    <button 
        :class="[
            classes, classButton, conditionClases,
            {'border':true},
            {'flex items-center gap-2 justify-center': nameIconLeft},
            {'opacity-50':isDisabled}
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
        <slot></slot>
        <Spinner 
            v-if="isLoading"
            :color="chainStore.$colorContrast0"
            classContainer="w-6 h-6 inline my-[-2px] ml-1"
        />
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
