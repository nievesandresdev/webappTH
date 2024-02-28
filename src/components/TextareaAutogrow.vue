<template>
    <div
        class="rounded-[6px] w-full" 
        :class="{
            'hborder-alert-negative': isOverLimit,
            'hborder-black-100': modelValue,
            'hborder-gray-400': !modelValue
        }"
    >
        <div class="cursor-pointer relative flex h-full w-full">
            <textarea
                :id="id" 
                class="auto-height p-3 rounded-[6px] flex-grow text-sm w-full border-0 font-medium"
                :class="`
                    ${isOverLimit ? 'placeholder-negative htext-alert-negative':''}
                    ${customClasses}
                `"
                :value="modelValue"
                @input="autoGrow"
                ref="autoHeightTextarea"
                :placeholder="placeholder"
            ></textarea>
        </div>
    </div>
    <p 
        v-if="showWordLimit" 
        class="text-right text-xs htext-gray-500 mt-2"
        :class="{'htext-alert-negative': isOverLimit}"
    >{{ wordCount }}/{{ wordLimit }}</p>
</template>

<script setup>
import { ref, watch, nextTick, computed } from 'vue';

const emit = defineEmits(['update:modelValue','overLimit'])

const props = defineProps({
    modelValue: {
        type: String,
        default: null,
    },
    id: {
        type: String,
        default: 'auto-height',
    },
    wordLimit: {
        type: Number,
        default: 2000,
    },
    showWordLimit: {
        type: Boolean,
        default: false,
    },
    placeholder: {
        type: String,
        default: 'Debes añadir un texto'
    },
    customClasses: {
        type: String,
        default: 'Debes añadir un texto'
    },
});

const autoHeightTextarea = ref(null);

const autoGrow = (event) => {
    event.target.style.height = '36px'; 
    event.target.style.height = `${event.target.scrollHeight}px`;
    emit('update:modelValue', event.target.value);
};

const wordCount = computed(() => props.modelValue?.length ?? 0 );
const isOverLimit = computed(() => wordCount.value > props.wordLimit);

watch(() => props.modelValue, async () => {
    await nextTick();
    if (autoHeightTextarea.value) {
        const textarea = autoHeightTextarea.value;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }
    emit('overLimit', isOverLimit.value);
});

</script>

<style scoped>
textarea:focus {
    border: none;
}
.auto-height {
    overflow-y: hidden;
    resize: none; 
}

textarea::placeholder {
    color: #A0A0A0;
    font-size: 14px;
    font-weight: 400;
    line-height: 150%; 
}
</style>
