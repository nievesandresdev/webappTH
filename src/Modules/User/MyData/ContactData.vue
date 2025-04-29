<template>
    <PageTransitionGlobal module="mydata">
        <div class="px-4 pt-4 flex flex-col gap-4 min-h-[68.6vh]">

            <!-- email -->
            <div>
                <label class="block mb-1 sp:mb-2 lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px]">
                    {{$t('checkin.form.input-7-label')}}*
                </label>
                <THInputText
                    iconLeft="/assets/icons/WA.mail.svg"
                    :placeholder="$t('auth.log-or-register.input')"
                    :type="'email'"
                    v-model="form.email"
                    @handleError="emailError = $event"
                    :textError="$t('auth.log-or-register.text-error')"
                />
            </div>
            <!-- phone -->
            <div>
                <label class="block mb-1 sp:mb-2 lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px]">
                    {{$t('checkin.form.input-6-label')}}
                </label>
                <BaseInputPhone 
                    v-model="form.phone" 
                    @handleError="phoneError = $event"
                /> 
            </div>
        </div>
    </PageTransitionGlobal>
    <SubmitButton
        :isFormValid="isFormValid"
        @handleSubmit="handleSubmit"
        :sending="sending"
    />
</template>
<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import THInputText from '@/components/THInputText.vue';
import BaseInputPhone from '@/components/Forms/BaseInputPhone.vue';
import SubmitButton from './Components/SubmitButton.vue';
import { $normalizeInput } from '@/utils/utils';
// Stores
import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();
import { handleToast } from '@/composables/useToast';
const { toastSuccess } = handleToast();
//
import PageTransitionGlobal from "@/components/PageTransitionGlobal.vue";
import { SECTIONS } from "@/constants/sections.js";
import { useLoadingSections } from "@/composables/useLoadingSections";
const { startLoading, stopLoading, loading } = useLoadingSections();
//
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const form = reactive({
    id: guestStore.guestData.id,
    email: '',
    phone: '',
    updateFields: ['email', 'phone'],
}); 

const originalData = ref(guestStore.guestData)
const sending = ref(false);
const emailError = ref(false);
const phoneError = ref(false);

startLoading(SECTIONS.MYDATA.GLOBAL);
onMounted(async () => {
    const data = await guestStore.findById(guestStore.guestData.id)
    guestStore.$updateLocalGuestData(data);
    initForm(data);
    stopLoading(SECTIONS.MYDATA.GLOBAL);
});

const handleSubmit = async () => {
    
    if (isFormValid.value) {
        sending.value = true;
        const response = await guestStore.$updateDataGuest(form);
        if (response.ok) {
            toastSuccess(t('messageRequest.dataSave'), 'bottom-toast-over-64');
            let res = guestStore.$updateLocalGuestData(response.data);
            originalData.value = res;
            initForm(response.data);
        } else {
            console.error('Error al guardar los datos');
        }
        sending.value = false;
    }
};

const initForm = (data) => {
    
    form.id = data.id;
    form.email = data.email;
    form.phone = data.phone;
};

const isFormValid = computed(() => {
    
    const isChanged =
        $normalizeInput(form.email) !== $normalizeInput(originalData.value.email) ||
        $normalizeInput(form.phone) !== $normalizeInput(originalData.value.phone);
    return (
        isChanged && Boolean(form.email?.trim()) && !emailError.value && !phoneError.value
    );
});

</script>
