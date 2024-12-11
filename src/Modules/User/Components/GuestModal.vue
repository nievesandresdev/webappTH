<template>
    <BottomModal :isOpen="isGuestModalOpen" @update:isOpen="closeModal">
        <div>
            <h2 class="lato text-[20px] font-bold leading-[28px]">Huésped {{guestIndexSelected+1}}</h2>
            <div class="mt-3">
                <div class="flex items-center gap-1">
                    <img class="w-4 h-4" src="/assets/icons/WA.user.svg" alt="">
                    <p class="lato text-sm font-bold">{{guestSelected.name}}</p>
                </div>
                <div class="flex items-center gap-1 mt-2">
                    <img class="w-4 h-4" src="/assets/icons/WA.mail.svg" alt="">
                    <p class="lato text-sm font-bold">{{guestSelected.email}}</p>
                </div>
                <PrimaryButton 
                    nameIconLeft="WA.Share"
                    @click="closeAndShare"
                    classes="block mt-6 h-10 text-center py-3 rounded-[10px] text-sm font-bold leading-[16px] w-full shadow-guest"
                >
                    Compartir estancia nuevamente
                </PrimaryButton> 
                
                <button 
                    class="flex items-center mt-6 justify-end w-full underline lato text-sm font-bold"
                    v-if="stayStore.stayData.guestIdCreator == guestStore.guestData.id"
                    @click="deleteGuestOfStay"
                >
                    <img class="w-4 h-4 mr-2" src="/assets/icons/WA.delete.svg">
                    Eliminar huésped de la estancia
                </button>
            </div>
        </div>
        <!-- {{guestSelected}} -->
    </BottomModal>
</template>
<script setup>
import { computed, ref, onMounted, toRefs, inject } from 'vue'
import BottomModal from '@/components/Modal/GeneralBottomSheet.vue';
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
//store
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
import { useStayStore } from '@/stores/modules/stay';
const stayStore = useStayStore();
import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();
import { handleToast } from "@/composables/useToast"; 
const { toastSuccess } = handleToast();

const emit = defineEmits(['ShareModalOpen','reloadGuestsList'])

const isGuestModalOpen = inject('isGuestModalOpen');
const guestSelected = inject('guestSelected');
const guestIndexSelected = inject('guestIndexSelected');

const shareLinkInput = ref(null);
const shareUrl = ref(null);



onMounted(async() => {
    //
})


const deleteGuestOfStay = async () => {
    closeModal();
    let response = await guestStore.deleteGuestOfStay(guestSelected.value.id);
    if(response){
        emit('reloadGuestsList')
        setTimeout(() => {
            toastSuccess("Huesped eliminado");
        }, 500);
    }
};

const closeModal = (e) => {
    isGuestModalOpen.value = false;
};


const closeAndShare = (e) => {
    console.log('test closeAndShare')
    closeModal();
    setTimeout(() => {
        console.log('test emit ShareModalOpen')
        emit('ShareModalOpen')
    }, 500);
};

</script>