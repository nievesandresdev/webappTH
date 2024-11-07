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
                v-if="guestsList.length < 10"
                class="w-full h-10 flex justify-center items-center px-4 py-2 gap-2 rounded-[10px] border bg-white border-[#333333] text-[#333333] lato text-sm font-bold hshadow-button mt-4"
                @click="isModalOpen = true"
            >   
            <img class="w-5 h-5 mr-2" src="/assets/icons/WA.Share.svg" alt="">
                Compartir estancia
            </button>
            <!-- guests list  -->
            <div 
                class="mt-4 rounded-[20px] border border-color-secondary bg-gradient-100 p-4"
                v-for="item in Number(stayStore.stayData.number_guests)" :key="item"
            >
                <div>
                    <!-- title card -->
                    <div class="flex items-center">
                        <h5 class="lato text-base font-bold leading-[20px] mr-auto">Huésped {{ item }}</h5>
                        <WATag v-if="item == 1" title="check-in" />
                        <img 
                            v-if="item > 1 && guestsList[item-1]"
                            @click="openGuestModal(guestsList[item-1], item-1)"
                            class="w-5 h-5 ml-2" 
                            src="/assets/icons/WA.kebab.svg"
                        >
                    </div>
                    <template v-if="guestsList[item-1]">
                        <div  class="mt-4">
                            <div class="flex items-center gap-1">
                                <img class="w-4 h-4" src="/assets/icons/WA.user.svg" alt="">
                                <p class="lato text-sm font-bold">{{guestsList[item-1].name}}</p>
                            </div>
                            <div class="flex items-center gap-1 mt-2">
                                <img class="w-4 h-4" src="/assets/icons/WA.mail.svg" alt="">
                                <p class="lato text-sm font-bold">{{guestsList[item-1].email}}</p>
                            </div>
                        </div>
                        <PrimaryButton 
                            v-if="item > 1"
                            classes="block mt-6 h-10 text-center py-3 rounded-[10px] text-sm font-bold leading-[16px] w-full shadow-guest"
                        >
                            Completar check in
                        </PrimaryButton> 
                    </template>
                    <div class="flex items-center mt-3" v-else>
                        <img class="w-4 h-4 mr-2" src="/assets/icons/WA.Clock.svg" alt="">
                        <p class="lato text-sm font-bold">Esperando acceso del huésped</p>
                    </div>
                </div>
            </div>
        </div>

        <ShareStayModal />

    </div>
    <GuestModal @ShareModalOpen="isModalOpen= true" @reloadGuestsList="reloadGuestsList"/>
</template>
<script setup>
import { toRefs, ref, reactive, onMounted, computed, provide } from 'vue'
import ShareStayModal from './Components/ShareStayModal.vue'
import GuestModal from './Components/GuestModal.vue'
import THInputText from '@/components/THInputText.vue';
import THInputField from '@/components/THInputField.vue';
import THInputCalendar from '@/components/THInputFieldCalendar.vue'
import SectionBar from '@/components/SectionBar.vue';
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
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

const props = defineProps({
    paramsRouter: {
        type: Object,
        default: () => ({})
    }
})
const { paramsRouter } = toRefs(props)

const hotelNameAddress = ref(null)
const guestsList = ref([])
const isModalOpen = ref(false);
const guestSelected = ref(null);
const guestIndexSelected = ref(null);
const isGuestModalOpen = ref(false);

const form = reactive({
    checkDate: null,
    middle_reservation: '',
    room: '',
    stayId: null
})

onMounted(async() => {
    hotelNameAddress.value =  `${hotelStore.hotelData.name} - ${hotelStore.hotelData.address}`
    fillForm()
    await reloadGuestsList()
})

provide('isModalOpen',isModalOpen)
provide('isGuestModalOpen',isGuestModalOpen)
provide('guestSelected',guestSelected)
provide('guestIndexSelected',guestIndexSelected)

const fillForm = () =>{
    form.checkDate = {
        start : stayStore.stayData?.check_in,
        end : stayStore.stayData?.check_out
    };

    form.middle_reservation = stayStore.stayData?.middle_reservation;
    form.room = stayStore.stayData?.room;
}

const reloadGuestsList = async () =>{
    guestsList.value = await stayStore.getGuestsAndSortByCurrentguestId(paramsRouter.value.stayId,guestStore.guestData?.id)
    console.log('test guestsList',guestsList.value)
}



const openGuestModal = (guest, index)=>{
    isGuestModalOpen.value = true
    guestIndexSelected.value = index
    guestSelected.value = guest
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