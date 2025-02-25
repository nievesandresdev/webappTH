<template>
    <!-- name -->
    <div v-if="settings?.first_step?.name?.visible">
        <THInputText
            :textLabel="`${$t('profile.page_personal_info.form.name.label')}${isMandatory('name')}`"
            iconLeft="/assets/icons/WA.user.svg"
            v-model="form.name"
            :showTextError="false"
        />
    </div>
    <!-- lastname -->
    <div class="mt-2" v-if="settings?.first_step?.lastname?.visible">
        <THInputText
            :textLabel="`${$t('checkin.form.input-2-label')}${isMandatory('lastname')}`"
            iconLeft="/assets/icons/WA.user.svg"
            v-model="form.lastname"
            :showTextError="false"
        />
    </div>
    <!-- secondlastname -->
    <div class="mt-2" v-if="settings?.first_step?.secondLastname?.visible">
        <THInputText
            :textLabel="`${$t('checkin.form.input-3-label')}${isMandatory('secondLastname')}`"
            iconLeft="/assets/icons/WA.user.svg"
            v-model="form.secondLastname"
            :error="secondLastnameError"
            :showTextError="false"
        />
        <p
            v-if="secondLastnameError"
            class="lato text-xs font-bold leading-[12px] sp:leading-[16px] htext-alert-negative"
        >{{$t('checkin.form.input-3-alert')}}</p>
    </div>
    <!-- birthdate -->
    <div class="mt-2" v-if="settings?.first_step?.birthdate?.visible">
        <label class="block mb-1 sp:mb-2 lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px]">
            {{$t('checkin.form.input-4-label')}}{{ isMandatory('birthdate') }}
        </label>
        <THInputCalendar
            :textLabel="$t('checkin.form.input-4-plchdr')"
            v-model="form.birthdate"
            :show_error_msg="false"
            :minDate="null"
            :is_range="false"
            :mandatory="settings?.first_step?.birthdate?.mandatory"
        />
    </div>
    <!-- gender -->
    <div class="mt-2" v-if="settings?.first_step?.gender?.visible">
        <label class="block mb-1 sp:mb-2 lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px]">
            {{$t('checkin.form.input-5-label')}}{{ isMandatory('gender') }}
        </label>
        <THInputField
            icon_left="/assets/icons/WA.sexo.svg"
            :textLabel="$t('checkin.form.input-5-plchdr')"
            :options="options_gender"
            v-model="form.gender"
            :top_dropdown="'top-0'"
            :extra_dropdown="'dropdown-clasess'"
            mandatory
        />
    </div>
    <!-- phone -->
    <div class="mt-2" v-if="settings?.first_step?.phone?.visible">
        <label class="block mb-1 sp:mb-2 lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px]">
            {{$t('checkin.form.input-6-label')}}{{ isMandatory('phone') }}
        </label>
        <BaseInputPhone 
            v-model="form.phone" 
            @handleError="phoneError = $event"
        /> 
    </div>
    <!-- email -->
    <div class="mt-2" v-if="settings?.first_step?.email?.visible">
        <label class="block mb-1 sp:mb-2 lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px]">
            {{$t('checkin.form.input-7-label')}}{{ isMandatory('email') }}
        </label>
        <THInputText
            iconLeft="/assets/icons/WA.mail.svg"
            :placeholder="$t('auth.log-or-register.input')"
            :type="'email'"
            v-model="form.email"
            @handleError="emailError = $event"
            @blur="inputActive = false"
            @keyupInput="inputActive = true"
            :textError="$t('auth.log-or-register.text-error')"
        />
    </div>
    <!-- responsibleAdult -->
    <div class="mt-2" v-if="settings?.first_step?.responsibleAdult?.visible">
        <THInputText
            :textLabel="`${$t('checkin.form.input-8-label')}${isMandatory('responsibleAdult')}`"
            :placeholder="$t('checkin.form.input-8-plchdr')"
            iconLeft="/assets/icons/WA.user.svg"
            v-model="form.responsibleAdult"
            :showTextError="false"
        />
    </div>
    <!-- kinshipRelationship -->
    <div class="mt-2" v-if="settings?.first_step?.kinshipRelationship?.visible">
        <label class="block mb-1 sp:mb-2 lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px]">
            {{$t('checkin.form.input-9-label')}}{{ isMandatory('kinshipRelationship') }}
        </label>
        <THInputField
            icon_left="/assets/icons/WA.parentesco.svg"
            :textLabel="$t('checkin.form.input-9-plchdr')"
            :options="options_kinshipRelationship"
            v-model="form.kinshipRelationship"
            :top_dropdown="'top-0'"
            :extra_dropdown="'dropdown-clasess'"
            mandatory
        />
    </div>
</template>
<script setup>
import { inject, ref } from 'vue'
import THInputText from '@/components/THInputText.vue';
import THInputCalendar from '@/components/THInputFieldCalendar.vue'
import THInputField from '@/components/THInputField.vue';
import BaseInputPhone from '@/components/Forms/BaseInputPhone.vue';

const emailError = inject('emailError');
const phoneError = inject('phoneError');
const secondLastnameError = inject('secondLastnameError');

const form = inject('form');
const settings = inject('settings');

const options_gender = [
    {value:'Hombre',label:'Hombre'},
    {value:'Mujer',label:'Mujer'},
    {value:'Otro',label:'Otro'},
] 

const options_kinshipRelationship = [
    {value:'Madre/Padre',label:'Madre/Padre'},
    {value:'Tío/Tía',label:'Tío/Tía'},
    {value:'Abuelo/Abuela',label:'Abuelo/Abuela'},
    {value:'Tutor legal',label:'Tutor legal'},
] 

function isMandatory(key){
    return settings.value.first_step[key].mandatory ? '*' : '';
}


</script>