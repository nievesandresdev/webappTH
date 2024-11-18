<template>
    <HeaderHomeRed />
    <HeroSectionRed />

    <!-- carousel's -->
    <div class="mt-6 pb-[120px]">
        
        <!-- facilities carousel -->
        <section 
            v-if="crossellingsData?.crosselling_facilities?.length > 0 && hotelData?.show_facilities" 
            class="pl-4"
        >
            <div class="flex items-center justify-between pr-4 h-[28px]">
                <h2 class="lato text-[20px] font-bold leading-[18px]">
                    {{ $utils.capitalize($t('home.section-facility.title')) }}
                </h2>
                <a 
                    @click="goFacilities()" 
                    class="lato text-sm font-bold leading-[16px] underline hover:underline" href="javascript:void(0)"
                >
                    {{ $utils.capitalize($t('home.btn-see-all')) }}
                </a>
            </div>
            <div class="">
                <CarouselFacilities id="1" :items="crossellingsData.crosselling_facilities"/>
            </div>
        </section>
    </div>

    <!-- forms -->
    <ResetPasswordBottomSheet :open="formType == 'reset'"/>
    <RegisterOrLoginBottomSheet :open="formType == 'log' || !guestStore.guestData && formType !== 'reset'"/>
    <CompleteRegisterBottomSheet :open="formType == 'complete' || guestStore.guestData && !guestStore.guestData.name"/>
    <CreateStayBottomSheet :open="formType == 'createstay' || guestStore.guestData && guestStore.guestData.name && !stayStore.stayData && !formType"/>
</template>
<script setup>
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
//forms
import RegisterOrLoginBottomSheet from '@/layout/Auth/RegisterOrLoginBottomSheet.vue';
import CompleteRegisterBottomSheet from '@/layout/Auth/CompleteRegisterBottomSheet.vue'
import CreateStayBottomSheet from '@/layout/Auth/CreateStayBottomSheet.vue'
import ResetPasswordBottomSheet from '@/layout/Auth/ResetPasswordBottomSheet.vue'
//sections
import HeaderHomeRed from './Components/HeaderHomeRed.vue'
import HeroSectionRed from './Components/HeroSectionRed.vue'
import CarouselFacilities from './Components/CarouselFacilitiesRed.vue'

import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();
import { useStayStore } from '@/stores/modules/stay'
const stayStore = useStayStore();
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore();
const { hotelData } = hotelStore

const props = defineProps({
    acform: {
        type:String,
        default:false
    }
});

// DATA
const crossellingsData = ref(null)

onMounted(() => {
    loadCrossellings();
})

async function loadCrossellings () {
    crossellingsData.value = await hotelStore.$getCrossellings()
    console.log('test crossellingsData',crossellingsData.value.crosselling_facilities)
}

const goFacilities = () => {
    router.push({ name: 'FacilityList' });
}

const formType = computed(() => props.acform);
</script>