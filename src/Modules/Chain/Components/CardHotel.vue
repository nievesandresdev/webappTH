<template>
    <div @click="selectHotel" class="shadow-guest rounded-[20px] overflow-hidden">
        <img 
            class="h-[226px] w-full" 
            v-if="data.image"
            :src="hotelStore.$loadImage({url:data.image, type:'gallery'})" 
            alt="image hotel"
        >
        <div v-else class="h-[226px] w-full hbg-gray-400" ></div>
        <div class="hbg-gray-100 p-4">
            <h2 class="lato text-lg font-bold leading-[28px]">{{data.name}}</h2>
            <div v-if="data.category" class="flex items-center gap-1 mt-3">
                <img class="w-4 h-4" src="/assets/icons/WA.STAR.BLACK.svg" alt="">
                <p  class="lato text-sm font-bold leading-[16px]">
                    {{data.category}}
                    <template v-if="Number(data.category) > 1">
                        {{$t('auth.hotel-list.stars-text')}}
                    </template>
                    <template v-else>
                        {{$t('auth.hotel-list.star-text')}}
                    </template>
                </p>
            </div>
            <div v-if="data.address" class="flex items-center gap-1 mt-2">
                <img class="w-4 h-4" src="/assets/icons/WA.map.svg" alt="">
                <p  class="lato text-sm font-bold leading-[16px]">{{data.address}}</p>
            </div>
            <div v-if="data.zone" class="flex items-center gap-1 mt-2">
                <img class="w-4 h-4" src="/assets/icons/WA.pointer.svg" alt="">
                <p class="lato text-sm font-bold leading-[16px]">{{data.zone}}</p>
            </div>
            <!-- v-if moreinfo  -->
            <div v-if="moreInfo && data.phone" class="flex items-center gap-1 mt-2">
                <img class="w-4 h-4" src="/assets/icons/WA.llamar.svg" alt="">
                <p  class="lato text-sm font-bold leading-[16px]">{{data.phone}}</p>
            </div>
            <!-- v-if moreinfo && email -->
            <div v-if="moreInfo && data.email" class="flex items-center gap-1 mt-2">
                <img class="w-4 h-4" src="/assets/icons/WA.mail.svg" alt="">
                <p  class="lato text-sm font-bold leading-[16px]">{{data.email}}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
//store
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()

const emit = defineEmits(['modalOpen']);

const props = defineProps({
    data:Object,
    clickable:{
        type:Boolean,
        default:false
    },
    modal:{
        type:Boolean,
        default:false
    },
    moreInfo: {
        type: Boolean,
        default: false
    }
})

async function selectHotel(){

    if(props.modal){
        emit('modalOpen')
    }
    //tomar el actual subdominio
    //se usara para que en un caso que el huesped decida regresar a la estancia actual
    //poder tener el subdominio de dicha estancia
    const currentSubdomain = hotelStore.hotelData?.subdomain;
    if(currentSubdomain){
        hotelStore.$setOldLocalHotel(currentSubdomain)
    }
    //
    if(!props.clickable) return
    await hotelStore.$setAndLoadLocalHotel(props.data.subdomain)
    router.push({ name:'CreateStayFromChain', params:{ hotelSlug : props.data.subdomain}})

   
}

</script>