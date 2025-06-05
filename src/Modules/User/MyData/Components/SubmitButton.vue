<template>
    <div class="p-4 hbg-gray-100 fixed bottom-0 left-0 z-[1060] w-full" :class="{'shadow-guest': scrollPosition > 0}">
        <PrimaryButton
            @click="myDataStore.$handleSubmit"
            :disabled="!myDataStore.isFormValid || myDataStore.sending"
            class="w-full lato py-3 rounded-[10px] text-sm font-bold leading-[16px] hshadow-button h-10"
        >
            {{ $t('profile.page_personal_info.btn_save') }}
        </PrimaryButton>
    </div>
    <div class="w-full h-[72px]"></div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount,watch } from 'vue';
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
import { useMyDataStore } from '@/stores/modules/user/myData';
const myDataStore = useMyDataStore();

onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
});


const scrollPosition = ref(0);

function onScroll() {
  // Lectura cross-browser de la posición de scroll vertical
  scrollPosition.value =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;
}



</script>

