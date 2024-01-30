<template>
    <Modal 
            :openModal="openInviteModal" 
            @closeModal="openInviteModal = false"
            :customBackdrop="'min-h-full relative'"
            :customClasess="'w-full absolute bottom-0.5 rounded-b-[0]'"
        >
        <div class="relative text-center p-4 text-lg font-medium border-b leading-110">
            <img 
                class="w-5 h-5 absolute left-4 top-4 cursor-pointer" 
                src="/assets/icons/1.TH.CLOSE.svg" alt=""
                @click="openInviteModal = false"
            >
            Estancia
        </div>

        <div class="body-xs mt-4 px-4 overflow-y-auto">
            <div class="">
                <label class="text-sm mb-2 font-medium block leading-110">
                    {{ $utils.capitalize($t('stay.stayLog.checkDate.label')) }}
                </label>
                <THInputCalendar
                    :textLabel="$t('stay.stayLog.checkDate.placeholder')"
                    v-model="form.checkDate"
                    :error="errorsKey.includes('checkDate')"
                    :show_error_msg="false"
                    :minDate="null"
                    mandatory
                />
            </div>
            <div class="mt-4">
                <label class="text-sm mb-2 font-medium block leading-110">
                    Habitación
                </label>
                <THInputText
                    :placeholder="'Nº habitación'"
                    :type="'text'"
                    v-model="form.room"
                />
            </div>
            <div class="mt-4">
                <label class="text-sm mb-2 font-medium block leading-110">
                    Nº huéspedes que se alojarán
                </label>
                <THInputField
                    :textLabel="'Nº huéspedes'"
                    :options="options_n_guests"
                    v-model="form.numberGuests"
                    :top_dropdown="'top-0'"
                    :extra_dropdown="'dropdown-clasess'"
                    mandatory
                />
            </div>
            <div class="mt-6">
                <h4 class="text-base font-medium leading-110">
                    {{ $t('home.guestTitle')}} 
                </h4>
            </div>
            <div class="mt-4" v-for="(guest, index) in form.listGuest" :key="guest?.id">
                <label class="text-sm mb-2 font-medium leading-110 flex w-full items-center">
                    Huésped {{ index+1 }}
                    <img 
                        class="w-5 h-5 ml-auto" 
                        src="/assets/icons/1.TH.DELETE.svg" 
                        v-if="guest?.id !== guestStore.guestData?.id"
                    />
                </label>
                <div>
                    <THInputText
                        iconLeft="/assets/icons/1.TH.USER.svg"
                        placeholder="El campo debe estar relleno"
                        :type="'text'"
                        v-model="form.listGuest[index].name"
                        :showTextError="false"
                        :customClasses="{
                            'hborder-alert-negative placeholder-negative':!form.listGuest[index].name.trim()
                        }"
                    />
                </div>
                <div class="mt-2">
                    <THInputText
                        iconLeft="/assets/icons/1.TH.EMAIL.svg"
                        :iconRight="'/assets/icons/2.TH.SendiconCIRCLE.jpg'"
                        placeholder="El campo debe estar relleno"
                        :type="'email'"
                        v-model="form.listGuest[index].email"
                        @handleError="emailError = $event"
                        @pressIconRight="sendInvitation('1')"
                        :showTextError="false"
                        :customClasses="{
                            'hborder-alert-negative placeholder-negative':!form.listGuest[index].email.trim()
                        }"
                    />
                </div>
                <div class="mt-2">
                    <THInputSelectPhone
                        textLabel="+ Prefijo"
                        placeholder_input="Teléfono del huésped"
                        iconLeft="/assets/icons/1.TH.TELEFONO.svg"
                        iconRight="/assets/icons/1.TH.I.dropdown.svg"
                        v-model="form.listGuest[index].phone"
                        @handlePhoneError="phoneError = $event"
                    />
                </div>
            </div>
        </div>

        
        <div class="text-right p-4 border-t mt-4">
            <button 
                class="hbtn-cta py-3 px-4 text-sm leading-110"
                :class="{'cta-disabled':!valid}"
                :disabled="!valid"
                @click="submitForm" 
            >
            Guardar
            </button>
        </div>
    </Modal>
</template>
<script setup>
    import { ref, reactive, computed, onMounted } from 'vue'
    import { useToast } from "vue-toastification";
    import { useI18n } from 'vue-i18n';
    import Moment from 'moment'
    import Modal from '@/components/Modal.vue'
    import THInputText from '@/components/THInputText.vue';
    import THInputField from '@/components/THInputField.vue';
    import THInputCalendar from '@/components/THInputFieldCalendar.vue'
    import THInputSelectPhone from '@/components/THInputSelectPhone.vue';
    import { useStayStore } from '@/stores/modules/stay'
    import { useGuestStore } from '@/stores/modules/guest';

    const toast = useToast();
    const { t } = useI18n();

    const stayStore = useStayStore();
    const guestStore = useGuestStore();
    const openInviteModal = ref(false)
    const emailError = ref(false);
    const phoneError = ref(false);
    const errorsKey = ref([]);
    const compareGuest = ref([]);

    const open = async () =>{
        loadDataModal()
        openInviteModal.value = true;
    }
    const form = reactive({
        checkDate:null,
        room:null,
        numberGuests:null,
        stayId: null,
        listGuest:[]
    });

    const loadDataModal = async () =>{
        let response = await stayStore.getGuestsAndSortByCurrentguestId(stayStore.stayData?.id,guestStore.guestData?.id)
        form.listGuest = response
        compareGuest.value = JSON.parse(JSON.stringify(response));
        form.checkDate = {
            start : stayStore.stayData?.check_in,
            end : stayStore.stayData?.check_out
        };
        form.room = stayStore.stayData?.room
        form.numberGuests = stayStore.stayData?.number_guests
    }

    const submitForm = async () =>{
        form.stayId = stayStore.stayData.id;
        let response = await stayStore.updateStayAndGuests(form)
        loadDataModal();
        if(response){
            toast('Cambios guardados', {
                toastClassName: "warning-toast",
                bodyClassName: "warning-toast-body",
                position: "top-right",
                icon: false,
                closeButton: false,  
                hideProgressBar: true,
            });
        }
    }

    const sendInvitation = (index) =>{
        console.log('sendInvitation',index)
    }

    //COMPUTED
    const valid = computed(() => {
        let stringForm = JSON.stringify(form.listGuest);
        let stringCompare = JSON.stringify(compareGuest.value);
        //
        //revisar si no hay ningun nombre o email vacio
        if(stringForm.includes('"email":""')) return false;
        if(stringForm.includes('"name":""')) return false;
        //
        //revisar que no halla error en ningun input
        let errors = emailError.value || phoneError.value
        //
        //validar si hay cambios respecto a los datos obtenidos
        let changeGuests = stringForm !== stringCompare;
        let dateCompare = {start : stayStore.stayData?.check_in,end : stayStore.stayData?.check_out};
        let checkDate = {start : form.checkDate?.start,end : form.checkDate?.end};
        let changeInDate = JSON.stringify(checkDate) !== JSON.stringify(dateCompare);
        let changeRoom = form.room && form.room?.trim() !== stayStore.stayData?.room;
        let changeNumberG = form.numberGuests?.trim() !== stayStore.stayData?.number_guests;
        //
        //
        return (changeGuests || changeInDate || changeNumberG || changeRoom) && !errors
    })


    defineExpose({
        open
    });
    
    //static
    const options_n_guests = [
        {value:'1',label:'1',},
        {value:'2',label:'2',},
        {value:'3',label:'3',},
        {value:'4',label:'4',},
        {value:'5',label:'5',},
        {value:'6',label:'6',},
        {value:'7',label:'7',},
        {value:'8',label:'8',},
        {value:'9',label:'9',},
        {value:'10',label:'10',},
    ] 
</script>
<style scoped>
.body-xs{
    max-height: calc(78.3vh - 32px);
}
</style>