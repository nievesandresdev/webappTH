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
        <div class="mt-4">
            <router-link 
                class="block border border-white rounded-[10px] shadow-guest hbg-black-100 w-full py-3"
                :to="{ name:'CompleteCheckin', params:{ id: data.id }}"
            >
                <p class="text-center lato text-sm font-bold leading-[16px] text-white">{{ $t('checkin.gocheckinButton') }}</p>
            </router-link>
        </div>
    </div>
</template>
<script setup>

defineProps({
    data:{
        type:Object,
        default:null
    }
})
</script>