<template>
    <MyStayHeader/>
    
    <div class="py-6 px-4">

        <!-- form -->
        <div v-if="!firstLoading">
            <h3 class="lato text-base font-bold leading-[20px]">{{ $t('stay.edit.information-stay') }}</h3>
            <!-- hotel name -->
            <div class="mt-4">
                <label class="lato text-sm font-bold leading-[16px] mb-1">Hotel</label>
                <THInputText
                    :iconLeft="`/assets/icons/WA.MENU.DISABLED.ALOJAMIENTO.svg`"
                    v-model="hotelNameAddress"
                    :disabled="true"
                />
            </div>
            <!-- check date -->
            <div class="mt-4">
                <label class="lato text-sm font-bold leading-[16px] mb-1">Check-in/Check-out</label>
                <THInputCalendar
                    :textLabel="$t('stay.stayLog.checkDate.placeholder')"
                    v-model="form.checkDate"
                    :show_error_msg="false"
                    :minDate="null"
                    mandatory
                />
            </div>
            <!-- middle of reserve  -->
            <div class="mt-4">
                <label class="lato text-sm font-bold leading-[16px] mb-1">{{ $t('stay.edit.input.medio-reserva.label') }}</label>
                <THInputField
                    :textLabel="$t('stay.edit.input.medio-reserva.placeholder')"
                    :options="options_middle_reservation"
                    v-model="form.middle_reservation"
                    icon_left="/assets/icons/Wa.reserva.svg"
                    mandatory
                />
            </div>
            <!-- room -->
            <div class="mt-4">
                <label class="lato text-sm font-bold leading-[16px] mb-1">{{ $t('stay.edit.input.medio-reserva.n-room') }}</label>
                <THInputText
                    :placeholder="$t('stay.edit.input.medio-reserva.n-room')"
                    :iconLeft="`/assets/icons/WA.bed.svg`"
                    v-model="form.room"
                />
            </div>
            <!-- submit button -->
            <PrimaryButton 
                classes="block mt-6 h-10 text-center py-3 rounded-[10px] text-sm font-bold leading-[17px] w-full shadow-guest"
                @click="submitForm"
                :isLoading="loading"
                :disabled="!valid"
            >
                {{ loading ? $t('auth.saving-changes') :$t('stay.edit.saveBtn') }}
            </PrimaryButton> 
            <div class="mt-4 border-b border-[#E9E9E9]"></div>
        </div>
        <div v-else class="flex justify-center">
            <Spinner width="40px" height="40px"/>
        </div>
    </div>
</template>
<script setup>
import { toRefs, ref, reactive, onMounted, computed, provide } from 'vue'

import MyStayHeader from './Components/MyStay/MyStayHeader.vue'
import THInputText from '@/components/THInputText.vue';
import THInputField from '@/components/THInputField.vue';
import THInputCalendar from '@/components/THInputFieldCalendar.vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
import Spinner from '@/components/Spinner.vue';
import WATag from '@/components/WATag.vue';
//store
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
import { useStayStore } from '@/stores/modules/stay';
const stayStore = useStayStore();
import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();
import { handleToast } from "@/composables/useToast"; 
const { toastSuccess } = handleToast();

  import { useShare } from "@/composables/useShare";
  const { shareContent } = useShare();

  import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const props = defineProps({
    paramsRouter: {
        type: Object,
        default: () => ({})
    }
})
const { paramsRouter } = toRefs(props)

const hotelNameAddress = ref(null)
const currentStay = ref(null);
const shareUrl = ref(null);
const firstLoading = ref(true);
const loading = ref(false);

const form = reactive({
    checkDate: null,
    middle_reservation: '',
    room: '',
    stayId: null
})

onMounted(async() => {
    currentStay.value = await stayStore.findById(paramsRouter.value.stayId)
    fillForm(currentStay.value)
    shareUrl.value = await hotelStore.$buildUrlWebApp(hotelStore.hotelData?.subdomain,null,`e=${stayStore.stayData?.id}&guestPerStay=true`);
    hotelNameAddress.value =  `${hotelStore.hotelDataStorage?.name} - ${hotelStore.hotelDataStorage?.zone}`
    firstLoading.value = false;
})


const fillForm = (stay) =>{
    form.checkDate = {
        start : stay?.check_in,
        end : stay?.check_out
    };

    form.middle_reservation = stay?.middle_reservation;
    form.room = stay?.room;
}


const submitForm = async () => {
    loading.value = true;
    currentStay.value = null;
    form.stayId = paramsRouter.value.stayId;
    // console.log('test stayId',paramsRouter.value.stayId)
    currentStay.value = await stayStore.updateStayAndGuests(form)
    fillForm(currentStay.value)
    // console.log('test currentStay.value',currentStay.value)
    if(currentStay.value){
        toastSuccess(t('messageRequest.changeSave'));
    }
    loading.value = false;
}

const valid = computed(()=>{
    let checkDateCompare = {start : currentStay.value?.check_in,end : currentStay.value?.check_out};
    let checkDateReal = {start : form.checkDate?.start,end : form.checkDate?.end};
    //changes
    let validate = JSON.stringify(checkDateCompare) !== JSON.stringify(checkDateReal) ||
    form.room !== currentStay.value?.room || form.middle_reservation !== currentStay.value?.middle_reservation;
    // console.log('test validate',validate)
    return validate

})

const options_middle_reservation = [
    {value:'Booking',label:'Booking',},
    {value:'Expedia',label:'Expedia',},
    {value:'Hotels.com',label:'Hotels.com',},
    {value: t('stay.edit.pageWebHotel'), label: t('stay.edit.pageWebHotel') ,}
] 
</script>