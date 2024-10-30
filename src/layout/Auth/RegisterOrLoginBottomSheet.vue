<template>
    <BottomSheet :open-bottom-sheet="open">
        <img 
            v-if="route.name !== 'Home'"
            class="absolute top-[-89px] w-full h-[189px] z-[-1]" src="/assets/icons/EllipseCHAINHOME.svg"
        >
        <div class="px-4 pt-4">
            <WelcomeMsg v-if="!showEnterPassword"/>
            <!-- {{ $utils.capitalize($t('guest.guestLog.title')) }} -->
            <div :class="{'mt-[96px]':!showEnterPassword}">
                <HeadInChain 
                    :text="showEnterPassword ? 'Inicia sesión':'Inicia sesión o regístrate'"
                    title-classes="h-[31px] lato text-[20px] font-bold leading-[30px] w-[243px] text-center"
                    :go-back="showEnterPassword"
                    @go-back="showEnterPassword = false"
                />
                <div class="mt-4">
                    <RegisterOrLogin 
                        @enterPasswordToLogin="showEnterPassword = true"
                        v-if="!showEnterPassword"
                    />
                    <PasswordToLogin v-else/>
                </div>
            </div>
        </div>
    </BottomSheet>
</template>
<script setup>
import { ref, reactive, provide, toRefs } from 'vue'
import BottomSheet from '@/components/Modal/BottomSheet.vue'
import HeadInChain from '@/Modules/Chain/Components/HeadInChain.vue';
import WelcomeMsg from '@/Modules/Chain/Components/WelcomeMsg.vue';
import RegisterOrLogin from './Components/RegisterOrLogin.vue';
import PasswordToLogin from './Components/PasswordToLogin.vue';

import { useRoute } from 'vue-router';
const route = useRoute();

const props = defineProps({
    open:{
        type: Boolean,
        default: false
    }
})

const { open } = toRefs(props)

const showEnterPassword = ref(false)

const form = reactive({
    id:'',
    email:'',
    type: null,
    password: null
})

provide('form',form)
</script>