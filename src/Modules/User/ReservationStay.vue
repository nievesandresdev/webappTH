<template>
    <!-- head -->
    <div class="sticky top-0 left-0 bg-head w-full py-6 px-4">
        <HeadInChain 
            :text="$t('stay.reservation.title')" 
            go-back
            @go-back="goProfilePage"
        />
    </div>
    <!-- body -->
    <div class="py-6 px-4">
        
        <!-- estos mensajes se muestran si el hotel es tipo chain -->
        <h1 v-if="typeChainHotel" class="lato text-lg font-bold leading-[20px]">{{$t('stay.reservation.title-page')}}</h1>
        <h4 v-if="typeChainHotel && !loading" class="lato text-base font-bold leading-[20px] mt-4">{{hotels.length ?? 0}} {{$t('auth.hotel-list.amount-text')}}</h4>
        <!-- Skeleton -->
        <div v-if="typeChainHotel && loading" class="animate-pulse mt-4">
            <div class="h-5 bg-gray-300 rounded w-32"></div>
        </div>
        
        <!-- fin mensajes -->

        <div :class="typeChainHotel ? 'mt-4' : ''">
            <!-- <div class="mb-6" v-for="hotel in hotels" >
                <CardHotel :data="hotel" :modal="typeChainHotel" @modalOpen="modalInfoReservation(hotel)" :more-info="typeChainIndependent" :loading="loading"/>
            </div> -->
            <!-- Skeleton mientras carga -->
            <template v-if="loading">
                <div class="mb-6" v-for="i in 2" :key="i">
                <CardHotelSkeleton />
                </div>
            </template>

            <!-- Contenido real -->
            <template v-else>
                <div class="mb-6" v-for="hotel in hotels" :key="hotel.id">
                <CardHotel 
                    :data="hotel" 
                    :modal="typeChainHotel" 
                    @modalOpen="modalInfoReservation(hotel)" 
                    :more-info="typeChainIndependent"
                    :loading="false"
                />
                </div>
            </template>
            <div class="flex flex-col justify-center" v-if="typeChainIndependent">
                <button
                    class="w-full lato flex justify-center items-center h-10 px-4 py-2 gap-2 rounded-[10px] border border-white bg-[#333333] text-white text-sm font-bold hshadow-button"
                    @click="openModalConfirmReservation(hotels[0]?.website_google)"
                    :style="{backgroundColor: chainStore.$bgColor0 ? chainStore.$bgColor0 : '#333333'}"
                >
                    <img src="/assets/icons/WA.Redirect.svg" class="w-6 h-6" alt="Icon Button" />
                    {{ $t('profile.next-reserve.reserve-button') }}
                </button>
            </div>
        </div>
       
    </div>
 
    <!-- modal sheet bottom info hotel -->
    <GeneralBottomSheet 
        @update:isOpen="closeModal" 
        :isOpen="openModal" 
        showButton 
        :button-text="$t('stay.reservation.button-reservation')" 
        @handleClick="openModalConfirmReservation" 
        showIconButton 
        iconButton="/assets/icons/WA.Redirect.svg"
        customChain
    >
        <div class="">
            <h2 class="lato text-lg font-bold leading-[28px]">{{modalInfo.name}}</h2>
            <div v-if="modalInfo.category" class="flex items-center gap-1 mt-3">
                <img class="w-4 h-4" src="/assets/icons/WA.STAR.BLACK.svg" alt="">
                <p  class="lato text-sm font-bold leading-[16px]">
                    {{modalInfo.category}}
                    <template v-if="Number(modalInfo.category) > 1">
                        {{$t('auth.hotel-list.stars-text')}}
                    </template>
                    <template v-else>
                        {{$t('auth.hotel-list.star-text')}}
                    </template>
                </p>
            </div>
            <div v-if="modalInfo.address" class="flex items-center gap-1 mt-2">
                <img class="w-4 h-4" src="/assets/icons/WA.map.svg" alt="">
                <p  class="lato text-sm font-bold leading-[16px]">{{modalInfo.address}}</p>
            </div>
            <div class="flex items
            -center gap-1 mt-2">
                <img class="w-4 h-4" src="/assets/icons/WA.pointer.svg" alt="">
                <p class="lato text-sm font-bold leading-[16px]">{{modalInfo.zone}}</p>
            </div>
            <!-- v-if phone  -->
            <div v-if="modalInfo.phone" class="flex items-center gap-1 mt-2">
                <img class="w-4 h-4" src="/assets/icons/WA.llamar.svg" alt="">
                <p  class="lato text-sm font-bold leading-[16px]">{{modalInfo.phone}}</p>
            </div>
            <!-- v-if email -->
            <div v-if="modalInfo.email" class="flex items-center gap-1 mt-2">
                <img class="w-4 h-4" src="/assets/icons/WA.mail.svg" alt="">
                <p  class="lato text-sm font-bold leading-[16px]">{{modalInfo.email}}</p>
            </div>
        </div>
    </GeneralBottomSheet>
    <!-- fin modal info hotel -->

    <!-- modal confirmar reservacion -->
    <ModalNative
        :width="'327px'"
        :top="'30%'"
        :custom-classes="'p-6 shadow-lg'"
        :position="'fixed'"
        >
        <template #default>
            <div class="flex flex-col gap-6">
                <span class="lato text-lg font-bold">{{ $t('profile.next-reserve.continue-title') }}</span>
                <p class="lato text-sm font-medium">{{ $t('profile.next-reserve.continue-message') }}</p>
                <div class="flex flex-col gap-4">
                    <button @click="goWebHotel" class="lato text-sm font-bold text-white bg-[#333333] rounded-[10px] py-2">{{ $t('profile.next-reserve.continue-yes') }}</button>
                    <div class="flex justify-center items-center font-bold text-[#333333] cursor-pointer" @click="closeModalConfirmReservation">
                        <span class="lato text-sm underline">
                            {{ $t('profile.next-reserve.continue-cancel') }}
                        </span>
                    </div>
                </div>
            </div>
        </template>
    </ModalNative>
    <!-- fin modal confirmar reservacion -->

</template>
<script setup>
import { onMounted, ref,provide, computed } from 'vue';
import { getUrlParam } from '@/utils/utils.js'
import HeadInChain from '@/Modules/Chain/Components/HeadInChain.vue'
import CardHotel from '@/Modules/Chain/Components/CardHotel.vue'
import CardHotelSkeleton from '@/Modules/Chain/Components/CardHotelSkeleton.vue';
import GeneralBottomSheet from '@/components/Modal/GeneralBottomSheet.vue';
import ModalNative from '@/components/ModalNative.vue'
//store
import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();

import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
//router
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(true)

const modalInfo = ref({})
const openModal = ref(false)

const typeChainIndependent = computed(() => {
    return chainStore.chainData?.type === 'INDEPENDENT'
})

const typeChainHotel = computed(() => {
    return chainStore.chainData?.type === 'CHAIN'
})

const openModalConfirmReservation = (website = false) => {
    modalNativeIsOpen.value = true
    if(typeChainIndependent.value){
        modalInfo.value.website_google = website
    }
}

const closeModalConfirmReservation = () => {
    modalNativeIsOpen.value = false
}


const modalNativeIsOpen = ref(false);
provide('modalNativeIsOpen', modalNativeIsOpen);



const hotels = ref([])
onMounted(async() => {
    hotels.value = await chainStore.$getHotelsList({type : 'reservation'})  
    loading.value = false
})

async function goProfilePage(){
    router.push({ name: 'Profile' });
}

const modalInfoReservation = (hotel) => {
    modalInfo.value = hotel
    openModal.value = true
}

const closeModal = () => {
    openModal.value = false
}

const goWebHotel = () => {
    let url = modalInfo.value.website_google;

    // Verificar si la URL tiene un esquema válido
    if (!/^https?:\/\//i.test(url)) {
        url = `https://${url}`;
    }

    window.open(url, '_blank');
    closeModalConfirmReservation();
};




</script>
<style scoped> 
.bg-head{
    background: linear-gradient(105deg, #F3F3F3 0%, #FAFAFA 100%);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
}

</style>