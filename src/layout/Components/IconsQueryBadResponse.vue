<template>
    <h2 class="lato text-[20px] font-bold leading-[28px]">{{ $t(titleResponse, { guestName: guestStore.guestData?.name }) }}</h2>
    <p class="lato text-base font-bold leading-[20px] mt-4"> 
        {{ $t(descriptionResponse) }}
    </p>
    <PrimaryButton 
        @click="queryStore.$setIsOpenPopUp(false)"
        classes="block mt-6 text-center py-3 rounded-[10px] lato text-sm font-bold leading-[16px] w-full shadow-guest"
    >
        Entendido
    </PrimaryButton> 
</template>
<script setup>
import { computed } from 'vue';
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
import { useQueryStore } from '@/stores/modules/query';
const queryStore = useQueryStore();
import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();

const titleResponse = computed(() => {
    if(queryStore.currentQuery?.qualification == 'GOOD' || queryStore.currentQuery?.qualification == 'VERY_GOOD'){
        return 'query.popup.thanksResponse'
    }
    return 'query.popup.sorryResponse';
})

const descriptionResponse = computed(() => {
    if(queryStore.currentQuery?.qualification == 'GOOD' || queryStore.currentQuery?.qualification == 'VERY_GOOD'){
        return 'query.popup.sorryDescription';
    }
    return 'query.popup.sorryDescription';
})

</script>