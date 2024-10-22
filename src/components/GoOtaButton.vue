<template>
    <button
        class="py-1.5 sp:py-2 px-1.5 sp:px-3 text-[9px] sp:text-sm font-medium relative w-full hbtn-primary text-center"
        :class="customClasess"
        @click="goOta()"
    >
         <div class="absolute top-1 sp:top-1.5 sp:left-3">
            <img
                class="w-4 sp:w-6 h-4 sp:h-6"
                :src="`/assets/icons/${nameIcons[ota]}`"
                alt="icon OTA link"
            />
        </div>
        {{textButton}}
    </button>
</template>
<script setup>
    import { ref, onMounted } from 'vue'
    import { useHotelStore } from '@/stores/modules/hotel'
    const hotelStore = useHotelStore()
    const { hotelData } = hotelStore
    
    import { useHotelOtaStore } from '@/stores/modules/hotelOta'
    const hotelOtaStore = useHotelOtaStore()

    import { useReviewStore } from '@/stores/modules/review'
    const reviewStore = useReviewStore()

    const { ota } = defineProps({
        ota:{
            type: String,
            default : null
        },
        textButton:{
            type: String,
            default : 'Texto del boton'
        },
        customClasess:{
            type: String,
            default : ''
        },
    })
    
    const urlReview = ref(null);
    const hotelOtasData = ref(null);
    const nameIcons = {
        google : '1.TH.GOOGLE.svg',
        tripadvisor : '1.TH.TRIPADVISOR.svg',
    };

    onMounted(async ()=>{
        let response = await hotelOtaStore.$getAll();
        hotelOtasData.value = response;
        loadOtaUrl();
        // reviewStore.$getHotelDetail({ ota : "GOOGLE", googleMapCid : hotelData?.code })
        reviewStore.$getDataOTAS({ googleMapCid : hotelData?.code })
    })

    function loadOtaUrl () {
        let searchOta = hotelOtasData.value.find(item => item.enum_ota == ota)
        console.log('tripadvisor: ',searchOta)
        if(ota == "google" && searchOta){
            let placeid = hotelData.google_maps_place_id
            console.log('google: ',placeid)
            urlReview.value = placeid ? `https://search.google.com/local/writereview?placeid=${placeid}` : ''
        }
        if(ota == "tripadvisor" && searchOta){
            urlReview.value = searchOta?.url ? `https://www.tripadvisor.es/UserReviewEdit-${matchUrl(searchOta?.url)}` : ''
        }
    }

    function goOta () {
        if(urlReview.value){
            window.open(urlReview.value, '_blank')
        }
    }

    // AUX
    function matchUrl (url) {
        const regex = /Hotel_Review-(.*?)-Reviews/
        const matches = url.match(regex)
        if (matches && matches[1]) {
        const result = matches[1]
        return result
        } else {
            return ''
        }
    }
</script>