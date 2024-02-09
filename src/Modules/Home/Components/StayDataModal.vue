<template>
    <Modal 
            :openModal="openInviteModal" 
            :customBackdrop="'h-screen relative'"
            :customClasess="'w-full md:w-[600px] fixed bottom-0 rounded-b-[0] md:rounded-b-[0.85rem] md:inset-0 md:m-0 md:mx-auto md:my-4'"
        >
        <div class="relative text-center p-4 text-lg font-medium border-b leading-110">
            <img 
                class="w-5 h-5 absolute left-4 top-4 cursor-pointer" 
                src="/assets/icons/1.TH.CLOSE.svg" alt=""
                @click="closeModal"
            >
            {{ $t('stay.dataModal.title') }}
        </div>

        <div class="body-xs mt-4 px-4 overflow-y-auto md:max-h-[540px]">
            <div class="">
                <label class="text-sm mb-2 font-medium block leading-110">
                    {{ $utils.capitalize($t('stay.dataModal.checkDate.label')) }}
                </label>
                <THInputCalendar
                    :textLabel="$t('stay.dataModal.checkDate.placeholder')"
                    v-model="form.checkDate"
                    :error="errorsKey.includes('checkDate')"
                    :show_error_msg="false"
                    :minDate="null"
                    mandatory
                />
            </div>
            <div class="mt-4">
                <label class="text-sm mb-2 font-medium block leading-110">
                    {{ $utils.capitalize($t('stay.dataModal.room.label')) }}
                </label>
                <THInputText
                    :placeholder="$t('stay.dataModal.room.placeholder')"
                    :type="'text'"
                    v-model="form.room"
                />
            </div>
            <div class="mt-4">
                <label class="text-sm mb-2 font-medium block leading-110">
                    {{ $t('stay.dataModal.howPeople') }}
                </label>
                <THInputField
                    :textLabel="$t('stay.dataModal.howPeople')"
                    :options="options_n_guests"
                    v-model="form.numberGuests"
                    :top_dropdown="'top-0'"
                    :extra_dropdown="'dropdown-clasess'"
                    :error="invalidNguest"
                    mandatory
                />
                <p 
                    v-if="invalidNguest" 
                    class="mt-2 text-sm font-medium htext-alert-negative leading-110"
                >
                    {{ $t('stay.dataModal.howPeopleError') }}
                </p>
            </div>
            <div class="mt-6">
                <h4 class="text-base font-medium leading-110">
                    {{ $t('stay.dataModal.guestsTitle') }}
                </h4>
            </div>
            <div class="mt-4" v-for="(guest, index) in form.listGuest" :key="guest?.id">
                <label class="text-sm mb-2 font-medium leading-110 flex w-full items-center">
                    {{ $t('stay.dataModal.guestLabel') }} {{ index+1 }}
                    <img 
                        class="w-5 h-5 ml-auto" 
                        src="/assets/icons/1.TH.DELETE.svg" 
                        v-if="guest?.id !== guestStore.guestData?.id"
                        @click="deleteGuest(guest?.id)"
                    />
                </label>
                <div>
                    <THInputText
                        iconLeft="/assets/icons/1.TH.USER.svg"
                        :placeholder="$t('stay.dataModal.placehoderNull')"
                        :type="'text'"
                        v-model="form.listGuest[index].name"
                        :showTextError="false"
                        :customClasses="{
                            'hborder-alert-negative placeholder-negative':!form.listGuest[index].name?.trim(),
                            'hborder-black-100':form.listGuest[index].name
                        }"
                    />
                </div>
                <div class="mt-2 relative">
                    <button 
                        class="absolute top-1.5 right-2 z-50 border border-black rounded-full shadow-md pl-1 pr-1.5 w-7 h-7"
                        :class="{
                            'bg-white':form.listGuest[index].email,
                            'hbg-gray-100 opacity-50':!form.listGuest[index].email || emailError
                        }"
                        :disabled="!form.listGuest[index].email || emailError"
                        @click="sendInvitation(index)"
                    >
                        <img class="w-full h-full" src="/assets/icons/2.TH.Sendicon.svg">
                    </button>
                    <THInputText
                        iconLeft="/assets/icons/1.TH.EMAIL.svg"
                        :iconRight="true"
                        :placeholder="$t('stay.dataModal.placehoderNull')"
                        :type="'email'"
                        v-model="form.listGuest[index].email"
                        @handleError="emailError = $event"
                        :showTextError="false"
                        :customClasses="{
                            'hborder-alert-negative placeholder-negative':!form.listGuest[index].email.trim(),
                            'hborder-black-100':form.listGuest[index].email
                        }"
                    />
                </div>
                <div class="mt-2">
                    <THInputSelectPhone
                        :textLabel="$t('stay.dataModal.phone.prefix')"
                        :placeholder_input="$t('stay.dataModal.phone.number')"
                        iconLeft="/assets/icons/1.TH.TELEFONO.svg"
                        iconRight="/assets/icons/1.TH.I.DROPDOWN.svg"
                        v-model="form.listGuest[index].phone"
                        @handlePhoneError="phoneError = $event"
                    />
                </div>
            </div>
        </div>

        
        <div class="flex items-center justify-between p-4 border-t mt-4">
            <div 
                class="text-xs font-medium leading-[90%]"
                :class="{'opacity-40':!hasChanges && !changeNumberG}"
                :disabled="!hasChanges && !changeNumberG"
                @click="loadDataModal" 
                style="text-decoration: underline;"
            >
                {{ $t('stay.dataModal.cancelButton') }}
            </div>
            <button 
                class="hbtn-cta py-3 px-4 text-sm leading-110"
                :class="{'cta-disabled':!valid}"
                :disabled="!valid"
                @click="submitForm" 
            >
                {{ $t('stay.dataModal.saveButton') }}
            </button>
        </div>
    </Modal>

    <NotSavedModal ref="notSavedModal" @saveChanges="submitForm" @exit="closeNosaved"/>
</template>
<script setup>
    import { ref, reactive, computed, onMounted } from 'vue'
    import { useToast } from "vue-toastification";
    import { useI18n } from 'vue-i18n';
    import Moment from 'moment'
    import NotSavedModal from '@/components/NotSavedModal.vue'
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
    const notSavedModal = ref(null);

    const open = async () =>{
        loadDataModal()
        openInviteModal.value = true;
    }
    const form = reactive({
        checkDate:null,
        room:null,
        numberGuests:null,
        stayId: null,
        listGuest:[],
        deleteList:[]
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

    const submitForm = async () => {
        if(invalidNguest.value){
            form.numberGuests = stayStore.stayData?.number_guests;
        }
        form.stayId = stayStore.stayData.id;
        console.log('submitForm',form)
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

    const sendInvitation = async (index) => {
        let params = {
            guestEmail : form.listGuest[index].email,
            stayId: stayStore.stayData?.id,
            guestId: form.listGuest[index].id
        }
        let response = await guestStore.sendMailTo(params);
        if(response){
            toast('Invitación enviada', {
                toastClassName: "warning-toast",
                bodyClassName: "warning-toast-body",
                position: "top-right",
                icon: false,
                closeButton: false,  
                hideProgressBar: true,
            });
        }
    }

    const closeModal = () => {
        // console.log('closeModal',hasChanges.value)
        if(hasChanges.value && changeNumberG.value || hasChanges.value){
            notSavedModal.value.open();
        }else{
            form.checkDate = null;
            openInviteModal.value = false;
        }
    }
    const closeNosaved = () => {
        form.checkDate = null;
        openInviteModal.value = false
    }

    const deleteGuest = async (guestId) => {
        form.deleteList.push(guestId)
        form.listGuest = form.listGuest.filter(item => item.id !== guestId);
        console.log('form.deleteList',form.deleteList)
        console.log('form.listGuest',form.listGuest)
        // let deleteG = await stayStore.deleteGuestOfStay(stayStore.stayData?.id,guestId)
        // loadDataModal();
        // if(deleteG){
        //     toast('Cambios guardados', {
        //         toastClassName: "warning-toast",
        //         bodyClassName: "warning-toast-body",
        //         position: "top-right",
        //         icon: false,
        //         closeButton: false,  
        //         hideProgressBar: true,
        //     });
        // }
    }

    //COMPUTED
    const valid = computed(() => {
        let stringForm = JSON.stringify(form.listGuest);
        let stringCompare = JSON.stringify(compareGuest.value);
        //
        //revisa si numero de huespedes es menor a los huespdes actuales
        if(invalidNguest.value) return false;
        //
        //revisar si no hay ningun nombre o email vacio
        if(stringForm.includes('"email":""')) return false;
        if(stringForm.includes('"name":""')) return false;
        //
        //revisar que no halla error en ningun input
        let errors = emailError.value || phoneError.value
        //
        //
        return (hasChanges.value || changeNumberG.value) && !errors
    })

    const hasChanges = computed(() => {
        //validar si hay cambios respecto a los datos obtenidos
        let stringForm = JSON.stringify(form.listGuest);
        let stringCompare = JSON.stringify(compareGuest.value);
        let changeGuests = stringForm !== stringCompare;
        let dateCompare = {start : stayStore.stayData?.check_in,end : stayStore.stayData?.check_out};
        let checkDate = {start : form.checkDate?.start,end : form.checkDate?.end};
        let changeInDate = JSON.stringify(checkDate) !== JSON.stringify(dateCompare);
        let changeRoom = form.room && form.room?.trim() !== stayStore.stayData?.room;
        
        return (changeGuests || changeInDate || changeRoom)
    })

    const changeNumberG = computed(() => {
        return form.numberGuests?.trim() !== stayStore.stayData?.number_guests;
    })

    const invalidNguest = computed(() => {
        return form.listGuest?.length > 0 && Number(form.numberGuests) < form.listGuest?.length
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
@media (max-width:767px){
    .body-xs{
        max-height: 66vh;
    }
}

</style>