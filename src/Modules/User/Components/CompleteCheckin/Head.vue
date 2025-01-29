<template>
    <div class="px-4 pt-5">
        <div class="flex items-center">
            <img class="w-6 h-6 mr-4" src="/assets/icons/WA.chevron.svg" alt="">
            <img class="w-10 h-10 mr-2" src="/assets/icons/iconFormFirstStep.svg" alt="">
            <div class="py-1">
                <h2 class="roboto text-[10px] font-bold leading-[7px] text-[#777]">
                    Check-in {{ currentStep }}/{{ numberStepsEnabled }}
                </h2>
                <h1 class="mt-1 lato text-base font-medium leading-[20px]">Datos personales</h1>
            </div>
        </div>
        <div class="mt-3 h-[4px] rounded-full bg-[#C9C9C9]">
            <div class="rounded-full h-full w-[33%] bg-[#333]"></div>
        </div>
    </div>
</template>
<script setup>
import { inject } from 'vue'

const numberStepsEnabled = inject('numberStepsEnabled');
const currentStep = inject('currentStep');
</script>