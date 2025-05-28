import { defineStore } from 'pinia'
import { ref, reactive } from 'vue';
import { formatAnyDate } from '@/utils/dateHelpers';
import { useGuestStore } from '@/stores/modules/guest';
import { handleToast } from '@/composables/useToast';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

export const useMyDataStore = defineStore('myData', () => {
    const { t } = useI18n();
    const guestStore = useGuestStore();
    const { toastSuccess } = handleToast();
    const route = useRoute();
    // STATE
    const isFormValid = ref(false);
    const sending = ref(false);
    const form = ref({});
    const selectedFile = ref(null);
    const originalData = ref(null);
    // ACTIONS
    async function $handleSubmit () {
        if(route.name === 'PersonalInfo') {
            $sendInformationForm();
        } else if(route.name === 'UbicationData') {
            $sendUbicationForm();
        } else if(route.name === 'ContactData') {
            $sendContactForm();
        }

    }

    async function $setIsFormValid (value) {
        isFormValid.value = value;
    }

    async function $setSending (value) {
        sending.value = value;
    }

    async function $setForm (value) {
        form.value = value;
    }

    async function $setSelectedFile (value) {
        selectedFile.value = value;
    }

    async function $setOriginalData (value) {
        originalData.value = value;
    }

    async function $resetForm () {
        form.value = {};
    }
    //
    //
    //
    async function $sendInformationForm () {    
        if (isFormValid.value) {
            $setSending(true)
            const formData = new FormData();
            formData.append('id', form.value.id);
            formData.append('name', form.value.name);
            formData.append('lastname', form.value.lastname);
            formData.append('secondLastname', form.value.secondLastname);
            formData.append('birthdate', form.value.birthdate ? formatAnyDate(form.value.birthdate,'dd/MM/yyyy') : null);
            formData.append('nationality', form.value.nationality);
            formData.append('docType', form.value.docType);
            formData.append('docSupportNumber', form.value.docSupportNumber);
            formData.append('docNumber', form.value.docNumber);
            formData.append('gender', form.value.gender);
            formData.append('updateFields', form.value.updateFields);
            

            if (selectedFile.value) {
                formData.append('avatar', selectedFile.value);
            }
            
            const response = await guestStore.$updateDataGuest(formData);
            if (response.ok) {
                toastSuccess(t('messageRequest.dataSave'), 'bottom-toast-over-64');
                let res = guestStore.$updateLocalGuestData(response.data);
                $setOriginalData(res);
                if (selectedFile.value) {
                    form.value.avatar = response.data.avatar;
                }
                // initForm(response.data);
            } else {
                console.error('Error al guardar los datos');
            }
            $setSending(false)
        }
    }

    async function $sendUbicationForm () {
        if (isFormValid.value) {
            $setSending(true)
            const response = await guestStore.$updateDataGuest(form.value);
            if (response.ok) {
                toastSuccess(t('messageRequest.dataSave'), 'bottom-toast-over-64');
                let res = guestStore.$updateLocalGuestData(response.data);
                $setOriginalData(res);
                // initForm(response.data);
            } else {
                console.error('Error al guardar los datos');
            }
            $setSending(false)
        }
    };
 
    async function $sendContactForm () {
        if (isFormValid.value) {
            $setSending(true)
            const response = await guestStore.$updateDataGuest(form.value);
            if (response.ok) {
                toastSuccess(t('messageRequest.dataSave'), 'bottom-toast-over-64');
                let res = guestStore.$updateLocalGuestData(response.data);
                $setOriginalData(res);
                // initForm(response.data);
            } else {
                console.error('Error al guardar los datos');
            }
            $setSending(false)
        }
    }
    //
    return {
        $resetForm,
        $handleSubmit,
        $setIsFormValid,
        $setSending,
        $setForm,
        $setSelectedFile,
        $setOriginalData,
        $sendUbicationForm,
        $sendInformationForm,
        $sendContactForm,
        // STATE
        isFormValid,
        sending,
        form,
        selectedFile,
        originalData,
    }

})