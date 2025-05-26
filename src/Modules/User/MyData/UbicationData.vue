<template>
    <div>
        <PageTransitionGlobal module="mydata">
            <div class="px-4 pt-4 flex flex-col gap-4 min-h-[68.6vh]">
                <!-- addressResidence -->
                <div>
                    <label class="block mb-2 lato text-sm font-bold leading-[16px]">
                    {{$t('checkin.form.input-14-label')}}
                    </label>
                    <SearchCountryDropdown 
                        v-model="form.countryResidence"
                        :placeholder="$t('checkin.form.input-14-plchdr')"
                        @selectedCountryCode="selectedCountryCode = $event"
                    />
                </div>
                <!-- postalCode -->
                <div>
                    <label class="block mb-2 lato text-sm font-bold leading-[16px]">
                        {{$t('checkin.form.input-15-label')}}
                    </label>
                    <CodeMunicipalityInput 
                        v-model="form.postalCode"
                        :selectedCountry="selectedCountryCode"
                        :placeholder="$t('checkin.form.input-15-plchdr')"
                        typeResults="locality,postcode"
                        :countryName="form.countryResidence"
                    />
                </div>
                <!-- municipality -->
                <div>
                    <label class="block mb-2 lato text-sm font-bold leading-[16px]">
                        {{$t('checkin.form.input-16-label')}}
                    </label>
                    <CodeMunicipalityInput
                        v-model="form.municipality"
                        :placeholder="$t('checkin.form.input-16-plchdr')"
                        :selectedCountry="selectedCountryCode"
                        :countryName="form.countryResidence"
                    />
                </div>
                <!-- addressResidence -->
                <div>
                    <label class="block mb-2 lato text-sm font-bold leading-[16px]">
                        {{$t('checkin.form.input-17-label')}}
                    </label>
                    <CodeMunicipalityInput 
                        v-model="form.addressResidence"
                        :placeholder="$t('checkin.form.input-17-plchdr')"
                        :selectedCountry="selectedCountryCode"
                        :countryName="form.countryResidence"
                        typeResults="address,place,locality"
                        formatResult="address"
                    />
                </div>
            </div>
        </PageTransitionGlobal>
        <SubmitButton
            :isFormValid="isFormValid"
            @handleSubmit="handleSubmit"
            :sending="sending"
        />
    </div>
</template>
<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import SearchCountryDropdown from '@/components/Forms/SearchCountryDropdown.vue';
import CodeMunicipalityInput from '@/components/Forms/CodeMunicipalityInput.vue';
import SubmitButton from './Components/SubmitButton.vue';
import { $normalizeInput } from '@/utils/utils';
//
import PageTransitionGlobal from "@/components/PageTransitionGlobal.vue";
import { SECTIONS } from "@/constants/sections.js";
import { useLoadingSections } from "@/composables/useLoadingSections";
const { startLoading, stopLoading, loading } = useLoadingSections();

// Stores
import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();
import { handleToast } from '@/composables/useToast';
const { toastSuccess } = handleToast();
//
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const form = reactive({
    id: guestStore.guestData.id,
    countryResidence: '',
    postalCode: '',
    municipality: '',
    addressResidence: '',
    updateFields: ['countryResidence', 'postalCode', 'municipality', 'addressResidence'],
}); 

const originalData = ref(guestStore.guestData)
const selectedCountryCode = ref('ES');
const sending = ref(false);

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
    form.countryResidence = data.country_address;
    form.postalCode = data.postal_code;
    form.municipality = data.municipality;
    form.addressResidence = data.address;
    console.log('test form',form)
};

const isFormValid = computed(() => {
    
    const isChanged =
        $normalizeInput(form.countryResidence) !== $normalizeInput(originalData.value.country_address) ||
        $normalizeInput(form.postalCode) !== $normalizeInput(originalData.value.postal_code) ||
        $normalizeInput(form.municipality) !== $normalizeInput(originalData.value.municipality) ||
        $normalizeInput(form.addressResidence) !== $normalizeInput(originalData.value.address);
        
    return (
        isChanged
    );
});

</script>
