<template>
    <div
        class="rounded-[10px] w-full border-[2px]" 
        :class="{
            'hborder-alert-negative': isOverLimit,
            'hborder-black-100': isFocused,
            'hborder-gray-400': !isFocused
        }"
    >
        <div class="cursor-pointer srelative flex h-full w-full">
            <textarea
                :id="id" 
                class="auto-height px-1 py-1.5 sp:py-3 sp:px-2 rounded-[10px] flex-grow lato text-[10px] sp:text-sm font-medium leading-[16px] w-full border-0 focus:border-[0px]"
                :class="`
                    ${isOverLimit ? 'placeholder-negative htext-alert-negative':''}
                    ${customClasses}
                `"
                @focus="isFocused = true"
                @blur="isFocused = false"
                :value="modelValue"
                @input="handleInput"
                ref="autoHeightTextarea"
                :placeholder="placeholder"
            ></textarea>
        </div>
    </div>
    <p 
        v-if="showWordLimit" 
        class="lato text-right text-[8px] sp:text-xs font-bold sp:leading-[16px]"
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
        default: ''
    },
});

const autoHeightTextarea = ref(null);
const isFocused = ref(false);

const handleInput = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= props.wordLimit) {
        autoGrow(event); // Solo llama a autoGrow si el texto está dentro del límite
    } else {
        event.target.value = inputValue.substring(0, props.wordLimit); // Trunca el valor a wordLimit
        emit('update:modelValue', event.target.value);
    }
};

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
/* textarea:focus {
    border: none;
} */
.auto-height {
    overflow-y: hidden;
    resize: none; 
}

textarea::placeholder {
    color: #A0A0A0;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px; 
    font-family: Lato;
}

@media (max-width:300px){
    textarea::placeholder {
        font-size: 10px;
    }
}

</style>