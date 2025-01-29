<template>
    <!-- nationality -->
    <div>
        <label class="block mb-2 lato text-sm font-bold leading-[16px]">Nacionalidad</label>
        <SearchCountryDropdown v-model="form.nationality"/>
    </div>
    <!-- docType -->
    <div class="mt-2">
        <label class="block mb-2 lato text-sm font-bold leading-[16px]">Tipo de documento*</label>
        <THInputField
            icon_left="/assets/icons/WA.sexo.svg"
            :textLabel="'Selecciona una opcion'"
            :options="options_gender"
            v-model="form.gender"
            :top_dropdown="'top-0'"
            :extra_dropdown="'dropdown-clasess'"
            mandatory
        />
    </div>
    <!-- docSupportNumber -->
    <div class="mt-2">
        <THInputText
            :textLabel="`Número de soporte del documento**`"
            iconLeft="/assets/icons/WA.user.svg"
            v-model="form.name"
            :showTextError="false"
        />
    </div>
    <!-- docNumber -->
    <div class="mt-2">
        <THInputText
            :textLabel="`Número de documento*`"
            iconLeft="/assets/icons/WA.user.svg"
            v-model="form.name"
            :showTextError="false"
        />
    </div>
    <!-- addressResidence -->
    <div class="mt-2">
        <label class="block mb-2 lato text-sm font-bold leading-[16px]">País de residencia*</label>
        <SearchCountryDropdown v-model="form.nationality"/>
    </div>
    <!-- postalCodeMunicipality -->
    <div class="mt-2">
        <label class="block mb-2 lato text-sm font-bold leading-[16px]">Código postal y Municipio*</label>
        <CodeMunicipalityInput v-model="form.test"/>
    </div>
    <!-- postalCodeMunicipality -->
    <div class="mt-2">
        <label class="block mb-2 lato text-sm font-bold leading-[16px]">Domicilio de residencia*</label>
        <CodeMunicipalityInput v-model="form.name"/>
    </div>
    
</template>
<script setup>
import { inject } from 'vue'
import SearchCountryDropdown from '@/components/Forms/SearchCountryDropdown.vue';
import THInputField from '@/components/THInputField.vue';
import THInputText from '@/components/THInputText.vue';
import CodeMunicipalityInput from '@/components/Forms/CodeMunicipalityInput.vue';

const form = inject('form');

const options_gender = [
    {value:'Hombre',label:'Hombre'},
    {value:'Mujer',label:'Mujer'},
    {value:'Otro',label:'Otro'},
] 
</script>