<template>
    <!-- head -->
    <div class="sticky top-0 left-0 bg-head w-full py-6 px-4">
        <HeadInChain 
            :text="$t('stay.reservation.title')" 
            go-back
            @go-back="goStayList"
        />
    </div>

    <!-- body -->
    <div class="py-6 px-4">
        <h1 class="lato text-lg font-bold leading-[20px]">{{$t('stay.reservation.title-page')}}</h1>
        <h4 class="lato text-base font-bold leading-[20px] mt-4">{{hotels.length ?? 0}} {{$t('auth.hotel-list.amount-text')}}</h4>
        <div class="mt-4">
            <div class="mb-6" v-for="hotel in hotels" >
                <CardHotel :data="hotel" modal @modalOpen="modalInfoReservation(hotel)"/>
            </div>
        </div>
    </div>
 
    <GeneralBottomSheet 
        @update:isOpen="closeModal" 
        :isOpen="openModal" 
        showButton 
        :button-text="$t('stay.reservation.button-reservation')" 
        @handleClick="openModalConfirmReservation" 
        showIconButton 
        iconButton="/assets/icons/WA.Redirect.svg"
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

    <ModalNative
        :width="'327px'"
        :top="'30%'"
        :custom-classes="'p-6 shadow-lg'"
        :position="'fixed'"
        >
        <template #default>
            <div class="flex flex-col gap-6">
                <span class="lato text-lg font-bold">¿Quieres continuar?</span>
                <p class="lato text-sm font-medium">Vas a ser redirigido a la página web del hotel para continuar tu proceso de reserva.</p>
                <div class="flex flex-col gap-4">
                    <button @click="goWebHotel" class="lato text-sm font-bold text-white bg-[#333333] rounded-[10px] py-2">Sí, continuar</button>
                    <div class="flex justify-center items-center font-bold text-[#333333] cursor-pointer" @click="closeModalConfirmReservation">
                        <span class="lato text-sm underline">
                            Cancelar
                        </span>
                    </div>
                </div>
            </div>
        </template>
    </ModalNative>

</template>
<script setup>
import { onMounted, ref,provide } from 'vue';
import { getUrlParam } from '@/utils/utils.js'
import HeadInChain from '@/Modules/Chain/Components/HeadInChain.vue'
import CardHotel from '@/Modules/Chain/Components/CardHotel.vue'
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

const modalInfo = ref({})
const openModal = ref(false)

const openModalConfirmReservation = () => {
    modalNativeIsOpen.value = true
}

const closeModalConfirmReservation = () => {
    modalNativeIsOpen.value = false
}


const modalNativeIsOpen = ref(false);
provide('modalNativeIsOpen', modalNativeIsOpen);



const hotels = ref([])
onMounted(async() => {
    hotels.value = await chainStore.$getHotelsList({type : 'reservation'})  
})

async function goStayList(){
    console.log('test hotel', hotelStore.hotelData?.subdomain)
    /* router.push({ name:'MyStays', params:{ hotelSlug : hotelStore.hotelData?.subdomain}}) */
}

const modalInfoReservation = (hotel) => {
    console.log('hotel', hotel)
    modalInfo.value = hotel
    openModal.value = true
}

const closeModal = () => {
    openModal.value = false
}

const goWebHotel = () => {
    window.open(modalInfo.value.website_google, '_blank');
    closeModalConfirmReservation()
}

</script>
<style scoped> 
.bg-head{
    background: linear-gradient(105deg, #F3F3F3 0%, #FAFAFA 100%);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
}

</style>