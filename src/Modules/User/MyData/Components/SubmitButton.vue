<template>
    <div class="p-4 hbg-gray-100 sticky bottom-0 left-0 z-[60]" :class="{'shadow-guest': scrollPosition > 0}">
        <PrimaryButton
            @click="handleSubmit"
            :disabled="!isFormValid || sending"
            class="w-full lato py-3 rounded-[10px] text-sm font-bold leading-[16px] hshadow-button h-10"
        >
            {{ $t('profile.page_personal_info.btn_save') }}
        </PrimaryButton>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount,watch } from 'vue';
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';

const props = defineProps({
    isFormValid: {
        type: Boolean,
        required: true,
    },
    sending: {
        type: Boolean,
        required: true,
    },
});

onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
});

const emit = defineEmits(['handleSubmit']);

const scrollPosition = ref(0);

const handleSubmit = () => {
    emit('handleSubmit');
};

function onScroll() {
  // Lectura cross-browser de la posición de scroll vertical
  scrollPosition.value =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;
}



</script>

