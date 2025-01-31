<template>
    <div class="rounded-[20px] bg-gradient-100 border border-color-secondary p-4">
        <div class="flex items-center">
            <img class="w-4 h-4 mr-1" src="/assets/icons/WA.user.svg" alt="">
            <p class="lato text-sm font-semibold leading-[16px]">{{data.name}}</p>
            <div class="ml-auto">
                <img class="w-5 h-5 ml-4" src="/assets/icons/WA.kebab.svg" alt="">
            </div>
        </div>
        <div class="flex items-center mt-2">
            <img class="w-4 h-4 mr-1" src="/assets/icons/WA.mail.svg" alt="">
            <p class="lato text-sm font-medium leading-[16px]">{{data.email}}</p>
        </div>
        <router-link 
            class="block mt-4"
            :to="{ name:'CompleteCheckin', params:{ id: data.id }}"
        >
            <PrimaryButton classes="block w-full rounded-[10px] shadow-guest-2 py-3 lato text-sm font-bold leading-[16px]">
                {{$t('checkin.gocheckinButton')}}
            </PrimaryButton> 
        </router-link>
    </div>
</template>
<script setup>
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
defineProps({
    data:{
        type:Object,
        default:null
    }
})
</script>