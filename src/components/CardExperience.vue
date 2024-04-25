<template>
    <div
        class="w-full card-exp rounded-t-lg text-left"
        :class="{'cursor-pointer':!$utils.isMockup(),'no-hover':$utils.isMockup()}"
        @click="goExperience(data)"
    >
         <div class="container-image rounded-t-lg w-full relative">
            <img
                class="img w-full h-full lg:h-48 2xl:h-52 overflow-hidden rounded-t-lg object-cover"
                :src="data.image?.url"
                loading="lazy"
                :alt="data.image?.url"
            >
            <div
                class="absolute bottom-2 left-2 text-[6px] sp:text-[10px] text-white font-semibold rounded p-1 flex items-center"
                style="rgba(206, 206, 206, 0.10); backdrop-filter: blur(40px);"
            >
                <template v-if="data.recomendations">
                    <img
                        :src="`/assets/icons/1.TH.RECOMMEND.svg`"
                        class="mr-1 w-2.5 sp:w-4"
                        :alt="`RECOMMEND`"
                    />
                     {{ $utils.capitalize($t('experience.card-experience.recommed')) }}
                </template>
                <template v-else-if="data.product_featured">
                    <img
                        :src="`/assets/icons/1.TH.FEATURED.svg`"
                        class="mr-1 w-2.5 sp:w-4 xs:mb-0.5"
                        :alt="`FEATURED`"
                    />
                    {{ $utils.capitalize($t('experience.card-experience.prominent')) }}
                </template>
            </div>
        </div>
        <div class="mt-1.5 sp:mt-2 md:mt-4 h-[34px]">
            
            <p class="font-semibold text-[8px] sp:text-[10px]">
                <template v-if="duration.minutes <= 0">
                    {{ `${duration.hours}H ${$t('experience.card-experience.aprox').toUpperCase()}` }}
                </template>
                <template v-else>
                    {{ `${duration.hours}H ${$t('experience.card-experience.and').toUpperCase()} ${duration.minutes} ${$t('experience.card-experience.aprox').toUpperCase()}` }}
                </template>
            </p>
            <p class="font-semibold text-[8px] sp:text-[10px] mt-0.5 sp:mt-1">
                <template v-if="data.cancellation_policy == 'STANDARD'">
                    {{ $t('experience.card-experience.annulation-gratuite').toUpperCase() }}
                </template>
                <template v-else>
                    {{ $t('experience.card-experience.non-refundable').toUpperCase() }}
                </template>
            </p>
        </div>
        <h5 
            class="text-xs sp:text-base font-medium mt-0 sp:mt-2.5"
            :class="{'h-8 sp:h-11 truncate-2':truncateTitle}"
        >
            {{data.title}}
        </h5>
        <div class="mt-1 sp:mt-2 flex">
            <div v-if="data?.reviews?.combined_average_rating" class="flex items-center gap-0.5 sp:gap-1 mr-1 sp:mr-2">
                <img
                    v-for="(item, index) in Math.ceil(data?.reviews?.combined_average_rating)" :key="index"
                    :src="`/assets/icons/1.TH.REVIEW.svg`"
                    class="w-4 h-4"
                    :alt="`star_${index}`"
                />
            </div>
            <div>
                <span class="text-[10px] sp:text-sm mr-0.5 sp:mr-1">{{ data.reviews?.combined_average_rating.toFixed(1) }}</span>
                <span class="text-[10px] sp:text-sm">({{ data.reviews?.total_reviews }})</span>
            </div>
        </div>
        <h4  class="text-xs sp:text-base mt-1 sp:mt-2 mb-2 sp:mb-4">
            {{ $t('experience.card-experience.from') }} {{ $utils.formatPrice(data.from_price) }}€
            
        </h4>
        <div class="flex items-center mt-2" v-if="distance">
            <img class="w-2.5 sp:w-4 h-2.5 sp:h-4 mr-0.5 sp:mr-1" src="/assets/icons/1.TH.Location.svg" alt="Location">
            <p class="text-[8px] sp:text-xs font-medium">{{ data.city_experince }}</p>
        </div>
        <div class="flex items-center mt-2" v-if="distance">
            <img class="w-2.5 sp:w-4 h-2.5 sp:h-4 mr-0.5 sp:mr-1" src="/assets/icons/1.TH.footstep.svg" alt="distance">
            <p class="text-[8px] sp:text-xs font-medium"> a {{ distance }} km</p>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, computed } from 'vue'
    import { useRouter } from 'vue-router'
    const route = useRouter()

    const { data } = defineProps({
        data: {
            type: Object,
            default: () => ({}),
        },
        truncateTitle:{
            type: Boolean,
            default: true,
        },
        distance: {
            type: String,
            default: null,
        },
    })

    const duration = computed(() => {
        if (!data.duration) null
        let hours = Math.floor(data.duration / 60)
        let minutes = data.duration % 60
        let m = {
            hours,
            minutes,
        }
        return m
    })

    // function getActImage (images) {
    //     let store = 'activity'
    //     if (images?.length === 0) return '/vendor_asset/img/default/default_activities.png'
    //     return images[0].url
    // }

    function goExperience (item) {
        route.push({name: 'ExperienceDetail', params:{ slug: item.slug }})
    }

</script>

<style lang="scss" scoped>

    .card-exp{
        //width: 242px;
        .container-image {
            height: 96px;
        }
    }
    @media (min-width:300px) {
        .card-exp{
            //width: 242px;
            .container-image {
                height: 161px;
            }
        }
    }
    @media (min-width:768px) {
        .card-exp{
            //width: 260px;
            .container-image {
                height: 173px;
            }
        }
    }
    @media (min-width:1024px) {
        .card-exp{
            //width: 302px;
        }
    }
    @media (min-width:1280px) {
        .card-exp{
            //width: 302px;
            .container-image {
                height: 201px;
            }
        }
    }


    .container-image{
        overflow: hidden;
        transition: all 500ms ease;
        /*&__img {
            transition: all 500ms case;
            &:hover{
                transition: scale(1.2);
            }
        }*/
    }

    .container-image img {
        width: 100%;
        height: 100%;
        aspect-ratio: 1.5;
        transition: all 500ms ease;
    }

    .container-image {
        .img:hover {
            transform: scale(1.2);
        }
    }
</style>