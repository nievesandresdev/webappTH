<template>
    <div class="hshadow rounded-[6px] p-4">
        <h1 class="text-base font-medium leading-[150%]">Hola Alejandro,</h1>
        <p class="mt-4 text-sm font-medium">
            ¿Hay algo que podamos hacer para tu llegada al hotel?
        </p>
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
            <button 
                class="hbtn-cta py-3 px-4 text-sm"
                :class="{'cta-disabled' : !textarea}"
                :disabled="!textarea"
            >
                Enviar
            </button>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import TextareaAutogrow from '@/components/TextareaAutogrow.vue'
const textarea = ref(null);
</script>