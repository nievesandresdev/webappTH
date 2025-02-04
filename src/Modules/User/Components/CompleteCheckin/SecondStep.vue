<template>
    <!-- nationality -->
    <div v-if="settings?.second_step?.nationality?.visible">
        <label class="block mb-2 lato text-sm font-bold leading-[16px]">Nacionalidad{{ isMandatory('nationality') }}</label>
        <SearchCountryDropdown v-model="form.nationality"/>
    </div>
    <!-- docType -->
    <div class="mt-2" v-if="settings?.second_step?.docType?.visible">
        <label class="block mb-2 lato text-sm font-bold leading-[16px]">Tipo de documento{{ isMandatory('docType') }}</label>
        <THInputField
            icon_left="/assets/icons/WA.Passport.svg"
            :textLabel="'Selecciona una opcion'"
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
        >Por favor, completa el campo “Segundo apellido”</p>
    </div>
    <!-- docSupportNumber -->
    <div class="mt-2" v-if="settings?.second_step?.docSupportNumber?.visible">
        <THInputText
            :textLabel="`Número de soporte del documento${isMandatory('docSupportNumber')}`"
            placeholder="Sólo para NIE o DNI español"
            iconLeft="/assets/icons/WA.Passport.svg"
            v-model="form.docSupportNumber"
            :isError="docSupportNumberError"
            :showTextError="false"
        />
        <p
            v-if="docSupportNumberError"
            class="lato text-xs font-bold leading-[16px] htext-alert-negative"
        >La cantidad de caracteres ingresada no es válida</p>
    </div>
    <!-- docNumber -->
    <div class="mt-2" v-if="settings?.second_step?.docNumber?.visible">
        <THInputText
            :textLabel="`Número de documento${isMandatory('docNumber')}`"
            placeholder="Escribe el número del documento seleccionado"
            iconLeft="/assets/icons/WA.Passport.svg"
            v-model="form.docNumber"
            :isError="docNumberError"
            :showTextError="false"
        />
        <p
            v-if="docNumberError"
            class="lato text-xs font-bold leading-[16px] htext-alert-negative"
        >La cantidad de caracteres ingresada no es válida</p>
    </div>
    <!-- addressResidence -->
    <div class="mt-2" v-if="settings?.second_step?.countryResidence?.visible">
        <label class="block mb-2 lato text-sm font-bold leading-[16px]">País de residencia{{ isMandatory('countryResidence') }}</label>
        <SearchCountryDropdown v-model="form.countryResidence"/>
    </div>
    <!-- postalCode -->
    <div class="mt-2" v-if="settings?.second_step?.postalCode?.visible">
        <label class="block mb-2 lato text-sm font-bold leading-[16px]">Código postal{{ isMandatory('postalCode') }}</label>
        <CodeMunicipalityInput v-model="form.postalCode"/>
    </div>
    <!-- municipality -->
    <div class="mt-2" v-if="settings?.second_step?.municipality?.visible">
        <label class="block mb-2 lato text-sm font-bold leading-[16px]">Municipio{{ isMandatory('municipality') }}</label>
        <CodeMunicipalityInput v-model="form.municipality"/>
    </div>
    <!-- addressResidence -->
    <div class="mt-2" v-if="settings?.second_step?.addressResidence?.visible">
        <label class="block mb-2 lato text-sm font-bold leading-[16px]">Domicilio de residencia{{ isMandatory('addressResidence') }}</label>
        <CodeMunicipalityInput v-model="form.addressResidence"/>
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