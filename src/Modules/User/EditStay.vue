<template>
    <SectionBar title="Editar estancia"/>
    <div class="py-6 px-4">

        <!-- form -->
        <div>
            <h3 class="lato text-base font-bold leading-[20px]">Información de la estancia</h3>
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
                <label class="lato text-sm font-bold leading-[16px] mb-1">Medio de la reserva</label>
                <THInputField
                    textLabel="Seleccionar medio de la reserva"
                    :options="options_middle_reservation"
                    v-model="form.middle_reservation"
                    icon_left="/assets/icons/Wa.reserva.svg"
                    mandatory
                />
            </div>
            <!-- room -->
            <div class="mt-4">
                <label class="lato text-sm font-bold leading-[16px] mb-1">Nº habitación</label>
                <THInputText
                    placeholder="Nº habitación"
                    :iconLeft="`/assets/icons/WA.bed.svg`"
                    v-model="form.room"
                />
            </div>
            <!-- submit button -->
            <PrimaryButton 
                classes="block mt-6 h-10 text-center py-3 rounded-[10px] text-sm font-bold leading-[17px] w-full shadow-guest"
                @click="submitForm"
                :disabled="!valid"
            >
                Guardar
            </PrimaryButton> 
            <div class="mt-4 border-b border-[#E9E9E9]"></div>
        </div>

        <div class="mt-4">
            <h1 class="lato text-base font-bold leading-[20px]">Huéspedes</h1>
            <button
                class="w-full h-10 flex justify-center items-center px-4 py-2 gap-2 rounded-[10px] border bg-white border-[#333333] text-[#333333] lato text-sm font-bold hshadow-button mt-4"
            >   
            <img class="w-5 h-5 mr-2" src="/assets/icons/WA.Share.svg" alt="">
                Compartir estancia
            </button>
            <!-- guests list  -->
            <div class="mt-4 rounded-[20px] border border-color-secondary bg-gradient-100 p-4">
                <div>
                    <h5 class="lato text-base font-bold leading-[20px]">Huésped 1</h5>
                </div>
            </div>
        </div>

        <!-- EditStay {{ paramsRouter.stayId }} -->
    </div>
</template>
<script setup>
import { toRefs, ref, reactive, onMounted, computed } from 'vue'
import THInputText from '@/components/THInputText.vue';
import THInputField from '@/components/THInputField.vue';
import THInputCalendar from '@/components/THInputFieldCalendar.vue'
import SectionBar from '@/components/SectionBar.vue';
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
//store
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
import { useStayStore } from '@/stores/modules/stay';
const stayStore = useStayStore();
import { handleToast } from "@/composables/useToast"; 
const { toastSuccess } = handleToast();

const props = defineProps({
    paramsRouter: {
        type: Object,
        default: () => ({})
    }
})
const { paramsRouter } = toRefs(props)

const hotelNameAddress = ref(null)

const form = reactive({
    checkDate: null,
    middle_reservation: '',
    room: '',
    stayId: null
})

onMounted(() => {
    hotelNameAddress.value =  `${hotelStore.hotelData.name} - ${hotelStore.hotelData.address}`
    fillForm()
    console.log('test stayStore.stayData',stayStore.stayData)
})

const fillForm = () =>{
    form.checkDate = {
        start : stayStore.stayData?.check_in,
        end : stayStore.stayData?.check_out
    };

    form.middle_reservation = stayStore.stayData?.middle_reservation;
    form.room = stayStore.stayData?.room;
}

const submitForm = async () => {
    form.stayId = stayStore.stayData.id;
    let response = await stayStore.updateStayAndGuests(form)
    if(response){
        toastSuccess("Cambios guardados");
    }
}

const valid = computed(()=>{
    let checkDateCompare = {start : stayStore.stayData?.check_in,end : stayStore.stayData?.check_out};
    let checkDateReal = {start : form.checkDate?.start,end : form.checkDate?.end};
    //changes
    let validate = JSON.stringify(checkDateCompare) !== JSON.stringify(checkDateReal) ||
    form.room !== stayStore.stayData?.room || form.middle_reservation !== stayStore.stayData?.middle_reservation;
    // console.log('test validate',validate)
    return validate

})

const options_middle_reservation = [
        {value:'Booking',label:'Booking',},
        {value:'Expedia',label:'Expedia',},
        {value:'Hotels.com',label:'Hotels.com',},
        {value:'Página web del hotel',label:'Página web del hotel',}
    ] 
</script>