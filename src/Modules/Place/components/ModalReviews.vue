<template>
    <Modal 
        :openModal="reviewsModal" 
        @closeModal="reviewsModal = false"
        :customClasess="'max-w-[555px]'"
        >
        <div class="text-center border-b border-gray-300 relative h-16 sticky top-0 left-0 z-50 bg-white rounded-t-xl">
            <button @click="reviewsModal = false" class="absolute right-4 lg:right-6 top-5">
                <img 
                    class="w-4 inline cursor-pointer" 
                    src="/assets/icons/close.svg" 
                >
            </button>
            <h1 class="text-lg lg:text-[22px] py-5 lg:py-6 px-10 lg:px-0 leading-5">
                {{ $t('place.detail.titleAllReviews') }} 
            </h1>
        </div>
        <div class="modal-height-content overflow-y-auto lg:max-h-[450px] no-scrollbar">
            <p v-if="reviews?.length > 1" class="pt-4 font-normal px-4 text-left"> 
                {{ ammountTotal }} {{ $t('place.detail.opinionsWord') }}
            </p>

            <div v-for="review in reviews" :key="review">
                <div class="border-b border-gray-200">
                    <div class="card border-0">
                        <div class="card-body pb-1 px-5 pt-5">
                            <div class="flex justify-between">
                                <img src="/assets/icons/user_review.svg" height="38" width="40"
                                    alt="user review icon" />
                                <div class="flex justify-start">
                                    <img
                                        v-for="(value, index) in 5"
                                        :key="index"
                                        :src="review?.general_rating  >= value ? url_star+'star_yellow.svg' : url_star+'star_not_filled.svg'" 
                                        class="w-[10px] sp:w-5 inline mr-0.5"
                                    />
                                </div>

                            </div>
                            <div class="flex">
                                <h5 v-if="review?.user_name" style="max-width: 200px;" class="text-base font-medium mt-4 text-left">
                                    {{ review?.user_name }}
                                </h5>
                                <p class="text-sm pl-2 mt-4 pt-0.5 text-left">{{ date(review?.date_review) }}</p>
                            </div>
                            
                            <p class="card-text pt-2 text-sm text-left">
                                {{ review?.comment == null ? $t('place.detail.noComment') : review?.comment}} 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Modal>
</template>
<script setup>
    import { ref } from 'vue'
    import Moment from 'moment'
    import Modal from '@/components/Modal.vue'
    const reviewsModal = ref(false)

    const props = defineProps({
        reviews:{
            type:Array,
            default:[]
        },
        ammountTotal:{
            type:Number,
            default:0
        },
    })

    const url_star = '/assets/icons/';

    const open = () =>{
        reviewsModal.value = true;
    }

    const date = (value) => {
        return Moment(value).format('DD/MM/YYYY');
    }

    defineExpose({
        open
    });
    
</script>