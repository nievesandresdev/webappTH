<template>
    <Modal 
            :openModal="openInviteModal" 
            @closeModal="openInviteModal = false"
            :customBackdrop="'min-h-full relative'"
            :customClasess="'w-full absolute bottom-0.5 rounded-b-[0]'"
        >
        <p class="relative text-center p-4 text-lg font-medium border-b leading-110">
            <img 
                class="w-5 h-5 absolute left-4 top-4 cursor-pointer" 
                src="/assets/icons/1.TH.CLOSE.svg" alt=""
                @click="openInviteModal = false"
            >
            {{$utils.capitalize($t('home.inviteModal.title'))}}
        </p>

        <div class="mt-4 px-4">
            <div class="flex justify-between items-center">
                <label class="text-base font-medium mb-4 leading-110">{{$t('home.inviteModal.inputLabel')}}</label>
                <label class="text-base font-semibold mb-4 leading-110">
                    {{ stayStore?.stayData?.uniqueAccessesCount }} / 
                    {{ stayStore?.stayData?.number_guests ?? stayStore?.stayData?.uniqueAccessesCount }}
                </label>
            </div>
            <THInputText
                :placeholder="$t('home.inviteModal.inputPlaceholder')"
                :type="'email'"
                v-model="form.invitedEmail"
                @handleError="emailError = $event"
                :customClasses="{
                    'hborder-gray-400':!form.invitedEmail
                }"
                :textError="$t('guest.guestLog.email.error')"
            />
        </div>
        <div class="mt-4 text-right p-4 border-t">
            <button 
                class="hbtn-cta py-3 px-4 text-sm leading-110"
                :class="{'cta-disabled':!valid}"
                :disabled="!valid"
                @click="submitForm" 
            >
                {{$t('home.inviteModal.button')}}
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
    import { useStayStore } from '@/stores/modules/stay'
    import { useGuestStore } from '@/stores/modules/guest';

    const toast = useToast();
    const { t } = useI18n();

    const stayStore = useStayStore();

    const guestStore = useGuestStore();
    const openInviteModal = ref(false)
    const emailError = ref(false);

    const open = () =>{
        openInviteModal.value = true;
    }
    const form = reactive({
        invitedEmail: null,
        currentStay: null,
        currentGuest: null,
    });


    const submitForm = async () =>{
        form.currentStay = stayStore.stayData.id;
        form.currentGuest = guestStore.guestData.id;
        let response = await stayStore.existingStayThenMatchAndInvite(form)
        openInviteModal.value = false
        form.invitedEmail = null;
        setTimeout(() => {
            toast(t('home.inviteModal.textToast'), {
                toastClassName: "warning-toast",
                bodyClassName: "warning-toast-body",
                position: "top-right",
                icon: false,
                closeButton: false,  
                hideProgressBar: true,
            });
        }, 2000);
    }

    //COMPUTED
    const valid = computed(() => {
        return !emailError.value && form.invitedEmail
    })


    defineExpose({
        open
    });
    
</script>