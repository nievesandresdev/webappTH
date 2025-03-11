import { defineStore } from 'pinia'
import { ref } from 'vue'
import { i18n } from '@/i18n'

import {
    getAllSettingsApi,
    sendPassportImageApi
} from '@/api/services/stay.services';

export const useCheckinStore = defineStore('checkin', () => {
    
    // STATE
    async function $getAllSettings () {
        const response = await getAllSettingsApi()
        const { ok, data } = response
        if (ok) {
            return data
        }
        return [];     
    }

    async function $sendPassportImage (file) {

        const formData = new FormData();
        // Nombre del campo, p. ej. "passportImage"
        formData.append('passportImage', file, file.name);

        const response = await sendPassportImageApi(formData)
        // console.log('test response',response)
        const { ok, data } = response
        if (ok) {
            return data
        }
        return [];     
    }

    async function $fillOutForm (data) {

        let form = {
            id:null,//id del huesped actual
            name:'',
            lastname:'',
            secondLastname:'',
            birthdate:null,
            gender:'',
            phone:'',
            email:'',
            checkinEmail:'filled@email.com',
            responsibleAdult:'',
            kinshipRelationship:'',
            //
            nationality:'',
            docType:'',
            docSupportNumber:'',
            docNumber:'',
            countryResidence:'',
            postalCode:'',
            municipality:'',
            addressResidence:'',
            //
            comment:'',
            stayId: localStorage.getItem('stayId')
        }
        
        const savedForm = localStorage.getItem('formDataCheckin')
        if (savedForm) {
            Object.assign(form, JSON.parse(savedForm))
        }
        
        form.name = data.FirstName ?? form.name;
        form.lastname =  data.lastname ?? form.lastname;
        form.secondLastname = data.secondLastname ?? form.secondLastname;
        form.birthdate = data.DateOfBirth ?? form.birthdate;
        form.gender = data.Sex_translated ?? form.gender;
        // form.phone = data.phone ?? form.phone;
        form.nationality = data.nationality ?? form.nationality;
        form.docType = data.DocumentType_translated ?? form.docType;
        form.docSupportNumber = data.docSupportNumber ?? form.docSupportNumber;
        form.docNumber = data.docNumber ?? form.docNumber;
        form.autoFill = true;
        console.log('test form 2',form)
        localStorage.setItem('formDataCheckin', JSON.stringify(form))
        
        return form;
    }

    //
    return {
        $getAllSettings,
        $sendPassportImage,
        $fillOutForm
    }

})