<template>
    espere un momento....
</template>
<script setup>
import { onMounted, ref } from 'vue';
//
import { useAuthStore } from '@/stores/modules/auth';
const authStore = useAuthStore()
import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();

const props = defineProps({
    paramsRouter: {
        type: Object,
        default: () => ({})
    }
})

const params = ref(props.paramsRouter);

onMounted(() => {
    const guestData = guestStore.guestData;
    if(Number(params.value.id) == Number(guestData?.id)){
        authStore.$logout();
    }
})
</script>