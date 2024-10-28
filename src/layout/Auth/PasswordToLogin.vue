<template>
    <div class="px-4">
        <THInputText
            type="password"
            :iconLeft="`/assets/icons/WA.lock.svg`"
            placeholder="Introduce una contraseña"
            v-model="form.password"
            text-error="La contraseña introducida es incorrecta"
            :is-error="isError"
            @keyupInput="isError = false"
        />
        <div class="mt-4">
            <button 
                class="hbtn-primary text-center py-2.5 rounded-[10px] text-base font-bold leading-[20px] w-full shadow-guest"
                :class="{'primary-disabled':!form.password}"
                :disabled="!form.password"
                @click="submit"
            >
                Continuar
            </button>
            <button class="mt-4 lato text-sm font-bold leading-[16px] underline">
                ¿Has olvidado tu contraseña?
            </button>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref, inject } from 'vue'
import THInputText from '@/components/THInputText.vue';
//stores
import { useAuthStore } from '@/stores/modules/auth'
const authStore = useAuthStore()

const isError = ref(false)
const form = inject('form')

async function submit(){
    let response = await authStore.$sendPasswordAndLogin(form);
    if(!response){
        isError.value = true;
    }else{
        form.password = '';
    }
}
</script>