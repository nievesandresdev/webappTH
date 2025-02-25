<template>
    <!-- nationality -->
    <div v-if="settings?.second_step?.nationality?.visible">
        <label class="block mb-2 lato text-sm font-bold leading-[16px]">
            {{$t('checkin.form.input-10-label')}}{{ isMandatory('nationality') }}
        </label>
        <SearchCountryDropdown 
            v-model="form.nationality"
            :placeholder="$t('checkin.form.input-10-plchdr')"
        />
    </div>
    <!-- docType -->
    <div class="mt-2" v-if="settings?.second_step?.docType?.visible">
        <label class="block mb-2 lato text-sm font-bold leading-[16px]">
            {{$t('checkin.form.input-11-label')}}{{ isMandatory('docType') }}
        </label>
        <THInputField
            icon_left="/assets/icons/WA.Passport.svg"
            :textLabel="$t('checkin.form.input-11-plchdr')"
            :options="docType_options"
            v-model="form.docType"
            :top_dropdown="'top-0'"
            :extra_dropdown="'dropdown-clasess'"
            :error="secondLastnameError"
            mandatory
        />
        <p
            v-if="secondLastnameError"
            class="lato text-xs font-bold leading-[16px] htext-alert-negative"
        >{{$t('checkin.form.input-11-error')}}</p>
    </div>
    <!-- docSupportNumber -->
    <div class="mt-2" v-if="settings?.second_step?.docSupportNumber?.visible">
        <THInputText
            :customClasses="{'uppercase':form.docSupportNumber}"
            :textLabel="`${$t('checkin.form.input-12-label')}${isMandatory('docSupportNumber')}`"
            :placeholder="$t('checkin.form.input-12-plchdr')"
            iconLeft="/assets/icons/WA.Passport.svg"
            v-model="form.docSupportNumber"
            :isError="docSupportNumberError"
            :showTextError="false"
        />
        <p
            v-if="docSupportNumberError"
            class="lato text-xs font-bold leading-[16px] htext-alert-negative"
        >{{$t('checkin.form.input-12-error')}}</p>
    </div>
    <!-- docNumber -->
    <div class="mt-2" v-if="settings?.second_step?.docNumber?.visible">
        <!-- {{ String(docNumberError) }} -->
        <THInputText
            :textLabel="`${$t('checkin.form.input-13-label')}${isMandatory('docNumber')}`"
            :placeholder="$t('checkin.form.input-13-plchdr')"
            :customClasses="{'uppercase':form.docNumber}"
            iconLeft="/assets/icons/WA.Passport.svg"
            v-model="form.docNumber"
            :isError="docNumberError"
            :showTextError="false"
        />
        <p
            v-if="docNumberError"
            class="lato text-xs font-bold leading-[16px] htext-alert-negative"
        >{{$t('checkin.form.input-12-error')}}</p>
    </div>
    <!-- addressResidence -->
    <div class="mt-2" v-if="settings?.second_step?.countryResidence?.visible">
        <label class="block mb-2 lato text-sm font-bold leading-[16px]">
           {{$t('checkin.form.input-14-label')}}{{ isMandatory('countryResidence') }}
        </label>
        <SearchCountryDropdown 
            v-model="form.countryResidence"
            :placeholder="$t('checkin.form.input-14-plchdr')"
            @selectedCountryCode="selectedCountryCode = $event"
        />
    </div>
    <!-- postalCode -->
    <div class="mt-2" v-if="settings?.second_step?.postalCode?.visible">
        <label class="block mb-2 lato text-sm font-bold leading-[16px]">
            {{$t('checkin.form.input-15-label')}}{{ isMandatory('postalCode') }}
        </label>
        <CodeMunicipalityInput 
            v-model="form.postalCode"
            :selectedCountry="selectedCountryCode"
            :placeholder="$t('checkin.form.input-15-plchdr')"
            typeResults="locality,postcode"
        />
    </div>
    <!-- municipality -->
    <div class="mt-2" v-if="settings?.second_step?.municipality?.visible">
        <label class="block mb-2 lato text-sm font-bold leading-[16px]">
            {{$t('checkin.form.input-16-label')}}{{ isMandatory('municipality') }}
        </label>
        <CodeMunicipalityInput
            v-model="form.municipality"
            :placeholder="$t('checkin.form.input-16-plchdr')"
            :selectedCountry="selectedCountryCode"
        />
    </div>
    <!-- addressResidence -->
    <div class="mt-2" v-if="settings?.second_step?.addressResidence?.visible">
        <label class="block mb-2 lato text-sm font-bold leading-[16px]">
            {{$t('checkin.form.input-17-label')}}{{ isMandatory('addressResidence') }}
        </label>
        <CodeMunicipalityInput 
            v-model="form.addressResidence"
            :placeholder="$t('checkin.form.input-17-plchdr')"
            :selectedCountry="selectedCountryCode"
            typeResults="address,place,locality"
            formatResult="address"
        />
    </div>
    
</template>
<script setup>
import { inject } from 'vue'
import SearchCountryDropdown from '@/components/Forms/SearchCountryDropdown.vue';
import THInputField from '@/components/THInputField.vue';
import THInputText from '@/components/THInputText.vue';
import CodeMunicipalityInput from '@/components/Forms/CodeMunicipalityInput.vue';

const form = inject('form');
const settings = inject('settings');
const secondLastnameError = inject('secondLastnameError');
const docNumberError = inject('docNumberError');
const docSupportNumberError = inject('docSupportNumberError');


const docType_options = [
    {value:'Pasaporte',label:'Pasaporte'},
    {value:'DNI español',label:'DNI español'},
    {value:'NIE',label:'NIE'},
] 

function isMandatory(key){
    return settings.value.second_step[key].mandatory ? '*' : '';
}
</script>