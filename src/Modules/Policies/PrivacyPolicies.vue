<template>
     <div class="min-h-screen max-h-screen overflow-y-auto">
        <HeadWithLang 
            go-back
            @go-back="goBack"
            :text="$t('policies.privacy.title')"
            title-classes="h-[28px] lato text-[20px] font-bold leading-[28px] w-[255px] text-center"
            sticky
            v-show="!emailParam"
        />
        
        <div class="py-6 px-4">
            <!-- point 1 -->
            <!-- title center-->
            <div class="text-center mb-5 md:lg:mb-10"> 
                <h1 class="lato text-[20px] md:lg:text-[40px] md:lg:font-medium font-bold leading-[40px] uppercase">{{$t('policies.privacy.title')}}</h1>
            </div>
            <div>
                <h1 class="lato text-base font-bold leading-[20px]">{{$t('policies.privacy.s1-t1')}}</h1> <br/>
                <p class="lato text-sm font-medium leading-[16px]">
                    {{$t('policies.privacy.s1-p1', {hotel: hotelStore.hotelData?.name, nif: dataLegal?.nif, address: dataLegal?.address})}}
                    <br/> <br/>
                    {{$t('policies.privacy.s1-p2', {email: dataLegal?.email})}} <br/> <br/>
                    <template v-if="false">
                        {{$t('policies.privacy.s1-p3')}} <br/> <br/>
                    </template>
                </p>
            </div>
            <!-- point 2 -->
            <div class="mt-2">
                <h1 class="lato text-base font-bold leading-[20px]">{{$t('policies.privacy.s2-t1')}}</h1> <br/>
                <p class="lato text-sm font-medium leading-[16px]">
                    {{$t('policies.privacy.s2-p1')}}<br/> <br/>
                    <ul class="list-disc pl-4">
                        <li class="lato text-sm font-medium leading-[16px]">{{$t('policies.privacy.s2-p2')}}</li>
                    </ul>
                    <ul class="list-disc pl-8 mt-4">
                        <li class="lato text-sm font-medium leading-[16px]">{{$t('policies.privacy.s2-p3')}} </li>
                        <li class="lato text-sm font-medium leading-[16px] mt-4">{{$t('policies.privacy.s2-p4')}}</li>
                        <li class="lato text-sm font-medium leading-[16px] mt-4">{{$t('policies.privacy.s2-p5')}}</li>
                    </ul>
                    <ul class="list-disc pl-4">
                        <li class="lato text-sm font-medium leading-[16px] mt-4">{{$t('policies.privacy.s2-p6')}} </li>
                        <li class="lato text-sm font-medium leading-[16px] mt-4">{{$t('policies.privacy.s2-p7')}}</li>
                    </ul>
                </p>
            </div>
            <!-- point 3 -->
            <div class="mt-6">
                <h1 class="lato text-base font-bold leading-[20px]">{{$t('policies.privacy.s3-t1')}}</h1> <br/>
                <p class="lato text-sm font-medium leading-[16px]">
                    {{$t('policies.privacy.s3-p1')}}<br/> <br/>
                    <ul class="list-disc pl-4">
                        <li class="lato text-sm font-medium leading-[16px]">{{$t('policies.privacy.s3-p2')}}</li>
                        <li class="lato text-sm font-medium leading-[16px] mt-4">{{$t('policies.privacy.s3-p3')}}</li>
                        <li class="lato text-sm font-medium leading-[16px] mt-4">{{$t('policies.privacy.s3-p4')}}</li>
                        <li class="lato text-sm font-medium leading-[16px] mt-4">{{$t('policies.privacy.s3-p5')}}</li>
                        <li class="lato text-sm font-medium leading-[16px] mt-4">{{$t('policies.privacy.s3-p6')}}</li>
                    </ul>
                </p>
            </div>
            <!-- point 4 -->
            <div class="mt-6">
                <h1 class="lato text-base font-bold leading-[20px]">{{$t('policies.privacy.s4-t1')}}</h1> <br/>
                <p class="lato text-sm font-medium leading-[16px]">
                    {{$t('policies.privacy.s4-p1')}}<br/> <br/>
                    <ul class="list-disc pl-4">
                        <li class="lato text-sm font-medium leading-[16px]">{{$t('policies.privacy.s4-p2')}}</li>
                        <li class="lato text-sm font-medium leading-[16px] mt-4">{{$t('policies.privacy.s4-p3')}}</li>
                        <li class="lato text-sm font-medium leading-[16px] mt-4">{{$t('policies.privacy.s4-p4')}}</li>
                    </ul>
                </p>
            </div>
            <!-- point 5 -->
            <div class="mt-6">
                <h1 class="lato text-base font-bold leading-[20px]">{{$t('policies.privacy.s5-t1')}}</h1> <br/>
                <p class="lato text-sm font-medium leading-[16px]">
                    {{$t('policies.privacy.s5-p1')}}<br/> <br/>
                    {{$t('policies.privacy.s5-p2')}}<br/> <br/>
                    {{$t('policies.privacy.s5-p3', { email: 'info@thehoster.io' })}}<br/> <br/>
                </p>
            </div>
            <!-- point 6 -->
            <div class="mt-4">
                <h1 class="lato text-base font-bold leading-[20px]">{{$t('policies.privacy.s6-t1')}}</h1> <br/>
                <p class="lato text-sm font-medium leading-[16px]">
                    {{$t('policies.privacy.s6-p1')}}<br/> <br/>
                    {{$t('policies.privacy.s6-p2')}}<br/> <br/>
                    {{$t('policies.privacy.s6-p3')}}<br/> <br/>
                    {{$t('policies.privacy.s6-p4')}}<br/> <br/>
                    {{$t('policies.privacy.s6-p5')}}<br/> <br/>
                    {{$t('policies.privacy.s6-p6')}}<br/> <br/>
                    {{$t('policies.privacy.s6-p7')}}<br/> <br/>
                    {{$t('policies.privacy.s6-p8')}}<br/> <br/>
                    {{$t('policies.privacy.s6-p9')}}<br/> <br/>
                </p>
            </div>
            <!-- point 7 -->
            <div class="mt-4">
                <h1 class="lato text-base font-bold leading-[20px]">{{$t('policies.privacy.s7-t1')}}</h1> <br/>
                <p class="lato text-sm font-medium leading-[16px]">
                    {{$t('policies.privacy.s7-p1')}}<br/> <br/>
                </p>
            </div>
            <!-- point 8 -->
            <div class="mt-4">
                <h1 class="lato text-base font-bold leading-[20px]">{{$t('policies.privacy.s8-t1')}}</h1> <br/>
                <p class="lato text-sm font-medium leading-[16px]">
                    {{$t('policies.privacy.s8-p1')}}
                </p>
            </div>
            <div class="mt-6">
                <p class="lato text-sm font-medium leading-[16px]">
                    {{$t('policies.privacy.s8-p2')}}
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import HeadWithLang from '@/layout/Components/HeadWithLang.vue'
import utils from '@/utils/utils.js';
import { navigateTo } from '@/utils/navigation'
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const router = useRouter();
const route = useRoute();
const emailParam = ref(route.query.email)
const { locale } = useI18n()

if (route.query.lang) {
  locale.value = route.query.lang
}
//store
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()
import { useHistoryStore } from '@/stores/modules/history';
const historyStore = useHistoryStore()
import { useAuthStore } from '@/stores/modules/auth'
const authStore = useAuthStore()

const dataLegal = ref({});
onMounted(async () => {
    dataLegal.value = await hotelStore.$getDataLegal();  
    // console.log('test dataLegal',dataLegal.value)
})
// returnTo
async function goBack(){
    let fromAnyPlace = Boolean(utils.getUrlParam('returnTo'))
    //si existe esta query retonarmos a la vista exclusiva guardada
    if(fromAnyPlace){
        historyStore.$goExclusiveRoute(router);
        return;
    }
    //de lo contrario seguimos el flujo
    if(authStore.sessionActive){
        //si existe session usa el historial
        historyStore.$goBack(router);
    }else{
        if(localStorage.getItem('subdomain')){
            navigateTo('Home',{},{ acform : 'complete', g : localStorage.getItem('guestId') })
        }else{
            router.push({ name: 'ChainLanding', query:{acform:'complete', g : localStorage.getItem('guestId')}});
        }
    }
    
}
</script>