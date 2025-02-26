<template>
    <button
        class="py-1.5 sp:py-2 w-full flex items-center justify-center gap-2 shadow-guest hbg-gray-100 border border-[#333] rounded-[6px] sp:rounded-[10px]"
        :class="customClasess"
        @click="goOta()"
    >
        <img
            class="w-4 sp:w-6 h-4 sp:h-6"
            :src="`/assets/icons/${nameIcons[ota]}`"
            alt="icon OTA link"
        />
        <p class="lato text-[9px] sp:text-sm font-bold leading-[114%]">{{textButton}}</p>
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
        airbnb : 'WA.AIRBNB.svg',
        booking : 'WA.Booking.svg',
        expedia : 'WA.Expedia.svg',
        google : 'WA.google.svg',
        tripadvisor : 'WA.Tripadvisor.svg',
    };

    onMounted(async ()=>{
        let response = await hotelOtaStore.$getAll();
        hotelOtasData.value = response;
        loadOtaUrl();
    })

    async function loadOtaUrl () {
        // console.log('test code',hotelData?.code)
        let dataOta = await reviewStore.$getDataOTAS({ googleMapCid : hotelData?.code })
        // console.log('test dataOta',dataOta)
        let detailHotel = await reviewStore.$getHotelDetail({ ota: 'GOOGLE', googleMapCid : hotelData?.code })
        // console.log('test detailHotel',detailHotel)
        let searchTripadvisorData = dataOta.otas.find(item => item.ota == "TRIPADVISOR")
        // console.log('test searchTripadvisorData',searchTripadvisorData)
        if(ota == "google" && detailHotel.hotel){
            let placeid = detailHotel.hotel.placeId;
            urlReview.value = placeid ? `https://search.google.com/local/writereview?placeid=${placeid}` : ''
        }
        
        if(ota == "tripadvisor" && searchTripadvisorData){
            urlReview.value = searchTripadvisorData?.url ? `https://www.tripadvisor.es/UserReviewEdit-${matchUrl(searchTripadvisorData?.url)}` : ''
        }

        if(ota == "booking"){
            urlReview.value = "https://secure.booking.com/reviewmanage.html";
            if(screen.width > 1020){
                urlReview.value = "https://secure.booking.com/reviewtimeline.html";
            }
        }
    }

    function goOta () {
        console.log('test urlReview',urlReview.value)
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