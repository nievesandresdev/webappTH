<template>
    <BottomSheet :open-bottom-sheet="open && !$utils.isMockup()">
        <img 
            v-if="route.name !== 'Home'"
            class="absolute top-[-89px] w-full h-[189px] z-[-1]" src="/assets/icons/EllipseCHAINHOME.svg"
        >
        <div class="px-4 pt-6">
            <div :class="{'mt-2':route.name == 'Home'}">
                <HeadInChain 
                    text="Cambiar contraseña"
                    title-classes="h-[31px] lato text-[20px] font-bold leading-[30px] w-[243px] text-center"
                />
                <div class="mt-10">
                    <div class="">
                        <THInputText
                            type="password"
                            :iconLeft="`/assets/icons/WA.lock.svg`"
                            placeholder="Introduce tu nueva contraseña"
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
                                Cambiar contraseña
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BottomSheet>
</template>
<script setup>
import { ref, reactive, provide, toRefs } from 'vue'
import BottomSheet from '@/components/Modal/BottomSheet.vue'
import THInputText from '@/components/THInputText.vue';
import HeadInChain from '@/Modules/Chain/Components/HeadInChain.vue';


import { useRoute } from 'vue-router';
const route = useRoute();

const props = defineProps({
    open:{
        type: Boolean,
        default: false
    }
})

const { open } = toRefs(props)

const isError = ref(false)

const form = reactive({
    id:'',
    email:'',
    type: null,
    password: null
})


</script>