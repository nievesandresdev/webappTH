<template>
    <div>
        <label class="mb-1 lato text-sm font-bold leading-[16px] block" >Check-in/Check-out</label>
        <THInputCalendar
            :textLabel="$t('stay.stayLog.checkDate.placeholder')"
            v-model="form.checkDate"
            :show_error_msg="false"
            :minDate="null"
            mandatory
        />
        <button class="block mt-6 hbtn-primary text-center py-2.5 rounded-[10px] text-base font-bold leading-[20px] w-full shadow-guest primary-disabled">
            Crear y acceder a la estancia
        </button>
    </div>
</template>
<script setup>
import { reactive } from 'vue';
import THInputCalendar from '@/components/THInputFieldCalendar.vue'

const form = reactive({
    checkDate:null,
});
</script>