<template>
    <Modal 
            :openModal="true" 
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
                    v-model="form.numberguests"
                    :top_dropdown="'top-0'"
                    :extra_dropdown="'dropdown-clasess'"
                />
            </div>
            <div class="mt-6">
                <h4 class="text-base font-medium leading-110">
                    {{ $t('home.guestTitle')}} 
                </h4>
            </div>
            <div class="mt-4">
                <label class="text-sm mb-2 font-medium leading-110 flex w-full items-center">
                    Huésped 1
                    <img class="w-5 h-5 ml-auto" src="/assets/icons/1.TH.DELETE.svg" />
                </label>
                <div>
                    <THInputText
                        iconLeft="/assets/icons/1.TH.USER.svg"
                        placeholder="..."
                        :type="'text'"
                        v-model="form.room"
                    />
                </div>
                <div class="mt-2">
                    <THInputText
                        iconLeft="/assets/icons/1.TH.EMAIL.svg"
                        iconRight="/assets/icons/2.TH.SendiconCIRCLE.svg"
                        placeholder="..."
                        :type="'email'"
                        v-model="form.invitedEmail"
                        @pressIconRight="sendInvitation('1')"
                    />
                </div>
                <div class="mt-2">
                    <THInputSelectPhone
                        textLabel="+ Prefijo"
                        placeholder_input="Teléfono del huésped"
                        iconLeft="/assets/icons/1.TH.TELEFONO.svg"
                        iconRight="/assets/icons/1.TH.I.dropdown.svg"
                        v-model="form.phone"
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
    import { ref, reactive, computed } from 'vue'
    import { useToast } from "vue-toastification";
    import { useI18n } from 'vue-i18n';
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
    const errorsKey = ref([]);

    const open = () =>{
        openInviteModal.value = true;
    }
    const form = reactive({
        checkDate:null,
        room:null,
        numberguests:null,
        phone:null,
        invitedEmail: null,
        currentStay: null,
        currentGuest: null,
    });


    const submitForm = async () =>{
        console.log('submitForm',stayStore.stayData)
        form.currentStay = stayStore.stayData.id;
        form.currentGuest = guestStore.guestData.id;
        // let response = await stayStore.existingStayThenMatchAndInvite(form)
        // openInviteModal.value = false
        // setTimeout(() => {
        //     toast(t('home.inviteModal.textToast'), {
        //         toastClassName: "warning-toast",
        //         bodyClassName: "warning-toast-body",
        //         position: "top-right",
        //         icon: false,
        //         closeButton: false,  
        //         hideProgressBar: true,
        //     });
        // }, 2000);
    }

    const sendInvitation = (index) =>{
        console.log('sendInvitation',index)
    }

    //COMPUTED
    const valid = computed(() => {
        return !emailError.value && form.invitedEmail
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
    max-height: calc(78.3vh - 16px);
}
</style>