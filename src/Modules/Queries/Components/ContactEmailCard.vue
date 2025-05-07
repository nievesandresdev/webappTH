<template>
    <div>
        <div class="flex items-center mb-2 gap-1">
            <IconCustomColor
                name="arrow-back"
                color="#777777"
            />
            <span class="lato text-[10px] sp:text-sm leading-[12px] sp:leading-[16px] text-[#777777]">{{ $t('query.form.sent-text') }} </span>
            <span class="lato text-[10px] sp:text-sm leading-[12px] sp:leading-[16px] text-[#777777]">
                {{ formatTimestampDate(data?.created_at, 'dd/MM/yyyy - HH:mm')+'hs' }}
            </span>
        </div>
        <div class="rounded-[20px] p-4 bg-gradient-h">
            <div class="flex items-center gap-1">
                <img class="w-6 h-6" src="/assets/icons/WA.mail.svg" alt="Email icon">
                <h2 class="lato text-sm font-medium leading-[16px]">Has enviado un mensaje al alojamiento</h2>
            </div>
            <p class="lato text-sm leading-[16px] mt-3">
                {{ data.message }}
            </p>
        </div>
    </div>
</template>
<script setup>  
import { formatTimestampDate } from '@/utils/dateHelpers';
import IconCustomColor from '@/components/IconCustomColor.vue';

const props = defineProps({
    data: {
        type: Object,   
        required: true
    }
});
</script>

