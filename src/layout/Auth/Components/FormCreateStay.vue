<template>
    <div>
        <label class="mb-1 lato text-sm font-bold leading-[16px] block">Check-in/Check-out</label>
        <THInputCalendar
            :textLabel="$t('stay.create.check-date.placeholder')"
            v-model="form.checkDate"
            :show_error_msg="false"
            :minDate="null"
            mandatory
        />
        <PrimaryButton 
            classes="block mt-6 text-center py-2.5 rounded-[10px] text-base font-bold leading-[20px] w-full shadow-guest"
            :disabled="!form.checkDate || loading"
            @click="submit"
        >
        {{ $t('stay.create.continue-button') }}
        </PrimaryButton> 
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import THInputCalendar from '@/components/THInputFieldCalendar.vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
//stores
import { useStayStore } from '@/stores/modules/stay'
const stayStore = useStayStore();
import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();
import { useAuthStore } from '@/stores/modules/auth';
const authStore = useAuthStore();
//router
// import { navigateTo } from '@/utils/navigation'

const loading = ref(false)

const form = reactive({
    numberGuests:'1',
    checkDate:null,
    listGuest:[],
    language: 'es',
    guestId: null,
});

const submit = async () => {
    loading.value = true;
    let guest = guestStore.getLocalGuest();
    form.guestId = guest?.id;
    form.language = localStorage.getItem('locale') ?? 'es';
    await stayStore.deleteLocalStayData();
    await stayStore.createAndInviteGuest(form);
    // let stay = await stayStore.createAndInviteGuest(form);
    // if(stay){
    //     navigateTo('Home')
    // }

    // processingForm.value = false
    // emit('closeModal');
    await authStore.$redirectAfterLogin();
    loading.value = false;
}
</script>