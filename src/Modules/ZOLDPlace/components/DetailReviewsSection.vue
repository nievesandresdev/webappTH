<template>
    <div class="lg:w-1/2 border-t lg:border-t-0 border-gray-300 lg:pl-3 mt-[8px] sp:mt-4 lg:mt-0">
        <div class="flex flex-col md:flex-row justify-between">
            <h2 class="text-[10px] sp:text-base lg:text-lg mt-[8px] sp:mt-4 lg:mt-0 font-medium">
                {{ $t('place.detail.opinionsTitle') }}
            </h2>
            <div class="mt-[8px] sp:mt-4 lg:mt-0">
                <div class="flex justify-start xs:items-center">
                    <p 
                        class="md:hidden rounded-[6px] sp:rounded-[10px] py-[4px] sp:py-3.5 px-[7px] sp:px-3.5 mr-[10px] sp:mr-5 text-[10px] sp:text-sm font-medium" 
                        style="border: 1px solid #FF9C06;"
                    >
                        {{ converStar(placeData?.num_stars).toFixed(1) }}
                    </p>
                    <div>
                        <div>
                            <img
                                v-for="(value, index) in 5"
                                :key="index"
                                :src="Math.round(converStar(placeData?.num_stars)) >= value ? url_star+'star_yellow.svg' : url_star+'star_not_filled.svg'" 
                                class="w-[10px] sp:w-[24px] inline mr-2"
                            />
                        </div>
                        <p class="text-[8px] sp:text-sm font-medium text-right mt-2 mr-2">
                            {{ placeData?.num_reviews }}
                            {{ $t('place.detail.opinionsWord') }}
                        </p>
                    </div>
                    <p class="hidden md:inline rounded-[10px] py-4 px-4 text-sm font-medium" style="border: 1px solid #FF9C06;">{{ converStar(placeData?.num_stars).toFixed(1) }}</p>
                </div>
            </div>
        </div>

        <!-- barras de review -->
        <h1 class="text-[10px] sp:text-sm lg:text-base font-medium mt-[8px] sp:mt-4">
            {{ $t('place.detail.ratingTitle') }}
        </h1>
        <div class="mt-[8px] sp:mt-4">
            <div class="rating-box w-full sp:w-4/5 lg:w-[411px]">
                <div 
                    class="flex justify-between items-center pb-[8px] sp:pb-4"
                    v-for="(review, index) in [5,4,3,2,1]"
                >
                    <p v-if="starSelected == review" class="underline text-sm cursor-pointer">
                        {{ review }}
                        {{ review == 1 ? $t('place.detail.starWord') : $t('place.detail.starsWord')}}
                        <img 
                            class="w-[8px] sp:w-4 inline ml-[2px] sp:ml-1 cursor-pointer" 
                            @click="filterReviews(6)"
                            src="/assets/icons/close.svg" 
                        >
                    </p>
                    <p v-else @click="filterReviews(review)"  class="text-[8px] sp:text-sm cursor-pointer">
                        {{ review }}
                        {{ review == 1 ? $t('place.detail.starWord') : $t('place.detail.starsWord')}}
                    </p>
                    <div class="mx-4 w-32 lg:w-[210px]">
                        <div class="h-[8px] hbg-gray-200 w-full rounded-full">
                            <div 
                                v-if="dataReviewsPercentaje && dataReviewsPercentaje[review] > 0"
                                class="h-full hbg-gray-200 rounded-full bg-[#FF9C06]"
                                :class="{
                                    'w-[20%]': dataReviewsPercentaje[review] > 0 && dataReviewsPercentaje[review] <= 0.20,
                                    'w-[40%]': dataReviewsPercentaje[review] > 0.21 && dataReviewsPercentaje[review] <= 0.40,
                                    'w-[60%]': dataReviewsPercentaje[review] > 0.41 && dataReviewsPercentaje[review] <= 0.60,
                                    'w-[80%]': dataReviewsPercentaje[review] > 0.61 && dataReviewsPercentaje[review] <= 0.80,
                                    'w-full': dataReviewsPercentaje[review] > 0.81,
                                }"
                                >
                            </div>
                        </div>
                    </div>
                    <p class="text-[8px] sp:text-sm">
                        {{ dataReviewsAmmout ? dataReviewsAmmout[review] : 0}}
                    </p>
                </div>
            </div>
        </div>

        <!-- Reviews de users -->
        <div id="carousel-reviews-place" class="hidden lg:block lg:sticky top-[8px] sp:top-4 mb-10">
            <div v-if="dataReviews?.length > 0" class="relative mt-[8px] sp:mt-4">
                <Carousel :items-to-show="2">
                    <Slide v-for="review in dataReviews" :key="review" class="slide-margin">
                        <div class="card_review_user flex flex-col rounded-[10px] w-[140px] sp:w-[100%] h-[140px] sp:h-[296px]">
                            <div @click="ShowSelectedReviewModal(review)" class="card-body-review cursor-pointer p-4">
                                <div class="flex justify-between items-center">
                                    <img src="/assets/icons/user_review.svg"
                                        class="w-[20px] sp:w-[40px] h-[20px] sp:h-[40px]"
                                        alt="user review icon"
                                    />
                                    <div class="flex mx-[-4px]">
                                        <img
                                            v-for="(value, index) in 5"
                                            :key="index"
                                            :src="review.general_rating >= value ? url_star+'star_yellow.svg' : url_star+'star_not_filled.svg'" 
                                            class="w-[11px] sp:w-[24px] h-[11px] sp:h-[24px] mx-1"
                                        />
                                    </div>
                                </div>
                                <h5 v-if="review?.user_name" class="text-xs sp:text-lg pt-[4px] sp:pt-2 text-left">    
                                    {{ review.user_name }}
                                </h5>
                                <p v-if="review.comment == null" class="mt-[8px] sp:mt-4 text-[10px] sp:text-sm">
                                    {{  $t('place.detail.noComment') }}
                                </p>
                                <p v-else class="mt-[8px] sp:mt-4 text-[10px] sp:text-sm text-left">

                                    <template v-if="review.comment.length < 215"> {{ review.comment }}</template>
                                    <template v-else>
                                        <template v-if="review.comment.length > 215">
                                            {{ review.comment.substring(0, 215) }}
                                            <a href="javascript:void(0)" class="text-sm  font-medium  underline cursor-pointer">
                                                {{  $t('place.detail.seeMoreComment') }}
                                            </a>
                                        </template>
                                    </template>

                                </p>
                            </div>
                        </div>
                    </Slide>
                    <template #addons>
                        <Navigation />
                    </template>
                </Carousel>
            </div>

            <div class="flex justify-between pt-6" v-if="dataReviews?.length > 0">
                <button @click="ShowAllReviewsModal()" class="hbtn-primary text-base font-medium py-5 px-9 leading-3">
                    {{  $t('place.detail.seeAllComments') }}
                </button>
            </div>
        </div>
        <!-- END Reviews de users -->

        <!-- mobile Reviews de users -->
        <div class="lg:hidden overflow-x-auto flex mt-[8px] sp:mt-4 sp:mr-[-8px] -sp:mr-4">
            <div
                v-for="review in dataReviews" :key="review.id"
                class="card_review_user gap-[12px] sp:gap-6 flex flex-col rounded-10 mr-[8px] sp:mr-4 p-[8px] sp:p-4 h-40 sp:h-80 overflow-hidden"
            >
                <div @click="ShowSelectedReviewModal(review)" class="card-body-review">
                    <div class="flex flex-col md:flex-row md:justify-between">
                        <img src="/assets/icons/user_review.svg"
                            class="w-[20px] sp:w-[40px] h-[20px] sp:h-[40px]"
                            alt="user review icon" />
                        <div class="flex justify-start mt-[4px] sp:mt-2 md:mt-0">
                            <img
                                v-for="(value, index) in 5"
                                :key="index"
                                :src="review.general_rating  >= value ? url_star+'star_yellow.svg' : url_star+'star_not_filled.svg'" 

                                class="w-[10px] sp:w-[18px] inline mr-0.5"
                            />
                        </div>
                    </div>
                    <h5 v-if="review.user_name" class="text-xs sp:text-lg pt-[4px] sp:pt-2">
                        {{ review.user_name }}
                    </h5>
                    <p class="text-[8px] sp:text-sm text-dark mt-[4px] sp:mt-2">{{ date(review.date_review) }}</p>
                    <p v-if="review.comment == null" class="mt-[8px] sp:mt-4 text-[8px] sp:text-sm">
                        {{  $t('place.detail.noComment') }}
                    </p>
                    <p v-else class="mt-[8px] sp:mt-4 text-[8px] sp:text-sm">
                        <template v-if="review.comment.length < 135"> 
                            {{ review.comment }}
                        </template>
                        <template v-if="review.comment.length >= 135">
                            {{ review.comment.substring(0, 135) }}
                            <a
                                href="javascript:void(0)"
                                class="text-[8px] sp:text-sm  font-medium  underline cursor-pointer"
                            >
                            {{  $t('place.detail.seeMoreComment') }}
                            </a>
                        </template>
                    </p>
                </div>
            </div>
        </div>
        <div class="mt-[8px] sp:mt-6 lg:hidden mb-10" v-if="dataReviews?.length > 0">
            <button @click="ShowAllReviewsModal()" class="font-medium hbtn-primary text-[10px] sp:text-base py-[6px] sp:py-2.5 w-full md:w-64 md:mr-4">
                {{ $t('place.detail.seeAllComments') }}
            </button>
        </div>
        <!-- END mobile Reviews de users -->
        <ModalReviews 
            :reviews="reviewsModal" 
            ref="modalReviews"
            :ammountTotal="dataReviewsAmmountTotal"
        />

    </div>
</template>
<script setup>
    import ModalReviews from './ModalReviews.vue'
    import { Carousel, Pagination, Slide, Navigation } from 'vue3-carousel'
    import Moment from 'moment'
    import { useHotelStore } from '@/stores/modules/hotel';
    import { usePlaceStore } from '@/stores/modules/place';
    import { onMounted, watch, ref  } from 'vue';


    const hotelStore = useHotelStore();
    const placeStore = usePlaceStore();

    const props = defineProps({
        placeData:{
            type:Object,
            default:{}
        }
    })
    //static
    const url_star = '/assets/icons/';

    //ref
    const starSelected = ref(6);
    const dataReviews = ref([]);
    const dataReviewsAmmout = ref(null);
    const dataReviewsPercentaje = ref(null);
    const dataReviewsAmmountTotal = ref(0);
    const modalReviews = ref(null);
    const reviewsModal = ref(null);
    

    //function
    const converStar = (value) => {
        if(!value) return 0
        return parseFloat(value.replace(",", "."))
    }
    
    const filterReviews = async (value) => {
        starSelected.value = value;
        let params = {id:props.placeData?.id, search:value}
        if(value){
            let response = await placeStore.$getReviewsByRating(params);
            if(response.ok){
                // console.log('filterReviews',response.data)
                dataReviews.value = response.data;
            } 
        }
    }

    const getDataReviews = async () => {
        let response = await placeStore.$getDataReviews(props.placeData?.id);
        if(response.ok){
            dataReviews.value = response.data.reviews;
            reviewsModal.value = response.data.reviews;
            dataReviewsAmmout.value = response.data.ammount;
            dataReviewsPercentaje.value = response.data.percentaje;
            dataReviewsAmmountTotal.value = response.data.ammountTotal;
        } 
    }

    const ShowSelectedReviewModal = (review) => {
        reviewsModal.value = [review];
        modalReviews.value.open();
    }

    const ShowAllReviewsModal = (value) => {
        reviewsModal.value = dataReviews.value;
        modalReviews.value.open();
    }

    const date = (value) => {
        return Moment(value).format('DD/MM/YYYY');
    }
    
    watch(() => props.placeData, (newValue) => {
        if (newValue && Object.keys(newValue).length > 0) {
            getDataReviews();
        }
    }, { immediate: true });
</script>
<style scoped>
.recomender {
    border: 1px solid #FF9C06;
    box-sizing: border-box;
}
.carousel__slide {
  justify-content: flex-start; 
  align-items: stretch;        
  width: calc(50% - 12px) !important;
}
.slide-margin {
    margin-right: 24px !important;
}
.card_review_user {
    min-width: 124px;
    border: 2px solid #F3F3F3;
}
@media (min-width: 1020px) {
    #location {
        border: 1px solid #A0A0A0;
    }
}
@media (min-width: 300px) {
    .card_review_user {
        min-width: 249px;
    }
}
</style>
