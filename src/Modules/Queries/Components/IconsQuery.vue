<template>
    <div class="hshadow rounded-[6px] p-4">
        <h1 class="text-base font-medium leading-[150%]">¿Qué tal Alejandro?</h1>
        <p class="mt-4 text-sm font-medium">
            ¿Cómo calificarías tu nivel de satisfacción con tu estancia hasta ahora?
        </p>
        <div class="mt-4">
            <FormSurveyContentTabEmojis />
        </div>
        <div class="mt-4" v-if="form.type">
            <p class="text-sm">
                Nos alegra mucho saber que estás disfrutando tu estancia. Agradecemos sinceramente tu feedback y esperamos seguir cumpliendo tus expectativas.
            </p>
        </div>
        <div class="mt-4">
            <TextareaAutogrow 
                :id="'textarea1'"
                v-model="textarea" 
                :wordLimit="300"
                placeholder="Nos encantaría saber los detalles, nos importa tu experiencia."
                showWordLimit
                customClasses="min-h-[120px]"
            />
        </div>
        <div class="text-right mt-6">
            <!-- :disabled="!form.type" -->
            <button 
                class="hbtn-cta py-3 px-4 text-sm"
                :class="{'cta-disabled' : !form.type}"
                @click="submit"
            >
                Enviar
            </button>
        </div>
    </div>
</template>
<script setup>
import { reactive, provide } from 'vue';
import FormSurveyContentTabEmojis from '@/Modules/Home/Components/FormSurveyContentTabEmojis'
import TextareaAutogrow from '@/components/TextareaAutogrow.vue'

const form = reactive({
    type:null
})
provide('form',form)

function submit() {
    console.log('form',form)
}
</script>