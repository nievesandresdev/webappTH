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
    </div>
</template>
<script setup>
import { ref, onMounted, computed, reactive, watch } from 'vue';
import SearchCountryDropdown from '@/components/Forms/SearchCountryDropdown.vue';
import CodeMunicipalityInput from '@/components/Forms/CodeMunicipalityInput.vue';
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
import { useMyDataStore } from '@/stores/modules/user/myData';
const myDataStore = useMyDataStore();
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

const selectedCountryCode = ref('ES');

startLoading(SECTIONS.MYDATA.GLOBAL);
onMounted(async () => {
    myDataStore.$resetForm();
    const data = await guestStore.findById(guestStore.guestData.id)
    guestStore.$updateLocalGuestData(data);
    initForm(data);
    myDataStore.$setOriginalData(data);
    myDataStore.$setForm(form);
    stopLoading(SECTIONS.MYDATA.GLOBAL);
});

const initForm = (data) => {
    
    form.id = data.id;
    form.countryResidence = data.country_address;
    form.postalCode = data.postal_code;
    form.municipality = data.municipality;
    form.addressResidence = data.address;
    // console.log('test form',form)
};

const isFormValid = computed(() => {
    let originalData = myDataStore.originalData;
    if(!originalData)return false;
    const isChanged =
        $normalizeInput(form.countryResidence) !== $normalizeInput(originalData.country_address) ||
        $normalizeInput(form.postalCode) !== $normalizeInput(originalData.postal_code) ||
        $normalizeInput(form.municipality) !== $normalizeInput(originalData.municipality) ||
        $normalizeInput(form.addressResidence) !== $normalizeInput(originalData.address);
        
        myDataStore.$setForm(form);
    return (
        isChanged
    );
});

watch(isFormValid, (newValue) => {
    myDataStore.$setIsFormValid(newValue);
});
</script>
