<template>
    <div class="rounded-[20px] bg-gradient-100 border border-color-secondary p-4">
        <div class="flex items-center">
            <img class="w-4 h-4 mr-1" src="/assets/icons/WA.user.svg" alt="">
            <p class="lato text-sm font-semibold leading-[16px] break-text pr-4">{{data.name}}</p>
            <div class="ml-auto flex-shrink-0">
                <KebabMenu>
                    <template #trigger>
                        <img class="w-5 h-5" src="/assets/icons/WA.kebab.svg" alt="">
                    </template>
                    <template #content>
                        <KebabOption borderb @click="$openShareMenu()">
                            <img class="w-4 h-4 mr-2" src="/assets/icons/WA.Share.svg" alt="">
                            <span class="lato text-sm font-bold leading-[16px]">{{$t('checkin.card-guest.resend-staylink')}}</span>
                        </KebabOption>
                        <KebabOption 
                            v-if="data.id !== guestStore.guestData?.id && !data.complete_checkin_data" 
                            @click="$openShareMenu('inviteToCheckin',{guestId:data.id})"
                            borderb
                        >
                            <img class="w-4 h-4 mr-2" src="/assets/icons/WA.checkin.user.svg" alt="">
                            <span class="lato text-sm font-bold leading-[16px]">{{$t('checkin.card-guest.invite-to-completecheckin')}}</span>
                        </KebabOption>
                        <KebabOption v-if="data.complete_checkin_data" borderb @click="confirmDeleteCheckin(data.id)">
                            <img class="w-4 h-4 mr-2" src="/assets/icons/WA.delete.svg" alt="">
                            <span class="lato text-sm font-bold leading-[16px]">{{$t('checkin.card-guest.delete-checkin')}}</span>
                        </KebabOption>
                        <KebabOption v-if="data.id !== guestStore.guestData?.id" @click="confirmDeleteGuest(data.id)">
                            <img class="w-4 h-4 mr-2" src="/assets/icons/WA.delete.svg" alt="">
                            <span class="lato text-sm font-bold leading-[16px]">{{$t('checkin.card-guest.delete-guest')}}</span>
                        </KebabOption>
                    </template>
                </KebabMenu>
            </div>
        </div>
        <div class="flex items-center mt-2">
            <img class="w-4 h-4 mr-1" src="/assets/icons/WA.mail.svg" alt="">
            <p class="lato text-sm font-medium leading-[16px] break-text">{{data.email}}</p>
        </div>
        <template v-if="data.complete_checkin_data">
            <div class="rounded-full px-2 hbg-green-600 inline-flex items-center h-[20px] mt-4">
                <img class="w-4 h-4 mr-1" src="/assets/icons/WA.circle-check.white.svg" alt="">
                <span class="text-white roboto text-xs font-bold uppercase">check-in</span>
            </div>
        </template>
        <template v-else>
            <template v-if="$currentPeriod() == 'pre-stay' && hotelStore.hotelData?.show_checkin_stay">
                <router-link 
                    class="block mt-4"
                    :to="{ name:'CompleteCheckin', params:{ id: data.id }}"
                >
                    <PrimaryButton classes="block w-full rounded-[10px] shadow-guest-2 py-3 lato text-sm font-bold leading-[16px]">
                        {{$t('checkin.gocheckinButton')}}
                    </PrimaryButton> 
                </router-link>
            </template>
        </template>
    </div>

    <!-- Eliminar huesped -->
    <ModalNative width="327px" @closeModal="closeModalDeleteGuest" :openProp="modalNativeIsOpen">
        <div class="p-6">
            <h2 class="lato text-lg font-bold leading-[20px]">{{$t('checkin.delete-guest.title')}}</h2>
            <p class="mt-6 lato text-sm font-medium leading-[16px]">
                {{$t('checkin.delete-guest.info')}}
            </p>
            <div class="mt-6">
                <PrimaryButton 
                    classes="shadow-guest-2 py-3 w-full h-10 border rounded-[10px] text-center lato text-sm font-bold leading-[16px]"
                    @click="deleteGuestOfStay"
                >
                    {{$t('checkin.delete-guest.confirm')}}
                </PrimaryButton> 
            </div>
            <div class="mt-4 text-center">
                <button class="underline lato text-sm font-bold leading-[16px]" @click="closeModalDeleteGuest">
                    {{$t('checkin.delete-guest.cancel')}}
                </button>
            </div>
        </div>
    </ModalNative>
    <!-- Eliminar Check-in -->
    <ModalNative width="327px" @closeModal="closeModalDeleteCheckin" :openProp="deleteCheckinIsOpen">
        <div class="p-6">
            <h2 class="lato text-lg font-bold leading-[20px]">{{$t('checkin.delete-checkin.title')}}</h2>
            <p class="mt-6 lato text-sm font-medium leading-[16px]">
                {{$t('checkin.delete-checkin.info')}}
            </p>
            <div class="mt-6">
                <PrimaryButton 
                    classes="shadow-guest-2 py-3 w-full h-10 border rounded-[10px] text-center lato text-sm font-bold leading-[16px]"
                    @click="deleteCheckin"
                >
                {{$t('checkin.delete-checkin.confirm')}}
                </PrimaryButton> 
            </div>
            
            <div class="mt-4 text-center">
                <button class="underline lato text-sm font-bold leading-[16px]" @click="closeModalDeleteCheckin">
                    {{$t('checkin.delete-checkin.cancel')}}
                </button>
            </div>
        </div>
    </ModalNative>
</template>
<script setup>
import { ref } from 'vue'
import { $currentPeriod, $openShareMenu } from '@/utils/helpers.js'
//
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
import KebabMenu from '@/components/Dropdowns/KebabMenu.vue';
import KebabOption from '@/components/Dropdowns/KebabMenuOption.vue';
import ModalNative from '@/components/ModalNative.vue'

import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
import { handleToast } from "@/composables/useToast"; 
const { toastSuccess } = handleToast();
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const emit = defineEmits(['reloadGuestsList'])

const modalNativeIsOpen = ref(false)
const guestDeleteId = ref(null);
const deleteCheckinIsOpen = ref(false)
const checkinId = ref(null);

defineProps({
    data:{
        type:Object,
        default:null
    }
})

function confirmDeleteGuest(id){
    guestDeleteId.value = id;
    modalNativeIsOpen.value = true;
}

function closeModalDeleteGuest(){
    guestDeleteId.value = null;
    modalNativeIsOpen.value = false;
}

function confirmDeleteCheckin(id){
    checkinId.value = id;
    deleteCheckinIsOpen.value = true;
}

function closeModalDeleteCheckin(){
    checkinId.value = null;
    deleteCheckinIsOpen.value = false;
}

async function deleteGuestOfStay(){
    modalNativeIsOpen.value = false;
    let response = await guestStore.deleteGuestOfStay(guestDeleteId.value);
    if(response){
        emit('reloadGuestsList')
        setTimeout(() => {
            toastSuccess(t('messageRequest.guestDeleted'));
        }, 500);
    }
}

async function deleteCheckin(){
    deleteCheckinIsOpen.value = false;
    let response = await guestStore.$deleteCheckinData(checkinId.value);
    if(response){
        emit('reloadGuestsList')
        setTimeout(() => {
            toastSuccess('Checkin Eliminado');
        }, 500);
    }
}



</script>
<style scoped>
.break-text{
    overflow-wrap: anywhere;
}

</style>