<template>
    <div class="pb-[12px] sp:pb-6 lg:pb-0">
        <h1 class="hidden lg:block text-[32px] mt-[8px] sp:mt-2 font-medium">
            <span class="text-[10px] sp:text-sm font-normal">desde</span> {{ $utils.formatPrice(experienceData.from_price) }}€
        </h1>
        <p v-if="variantPrice" class="hidden lg:block text-xs mt-4 lg:mt-0 font-medium">
            {{ $t('experience.detail-page.variant-price') }}
        </p>
        <h3 class="text-[10px] sp:text-base mt-[12px] sp:mt-6 mb-[8px] sp:mb-4 font-medium">
            {{ $t('experience.detail-page.when-experience-label') }}
        </h3>
        <DetailPageSectionReserveCalendar />
        <div
            class="people mt-[12px] sp:mt-6"
        >

            <div class="relative">
                <span v-if="formReserve.date" class="reservar-span inline-block mb-3.5 lg:mb-4">
                    {{ $t('experience.detail-page.maximum-reserves-label',{ maxSeats }) }}
                </span>
                <div v-if="formReserve.date" class="flex flex-col gap-4">
                    <div
                        v-for="(tourist, index) in addTypeTourits"
                        :key="index"
                        class="inner block"
                    >
                        <div class="prices-counting flex items-center justify-between">
                            <div>
                                <p class="text-sm block mb-2">{{ tourist.name }} ({{ tourist.startAge }}-{{ tourist.endAge }} años)</p>
                                <p class="text-sm block">Min: {{ tourist.minTravelersPerBooking }}, Max: {{ tourist.maxTravelersPerBooking }}</p>
                            </div>
                            <div class="couting">
                                <button
                                    :disabled="tourist.quantity <= tourist.minTravelersPerBooking"
                                    :class="tourist.quantity <= tourist.minTravelersPerBooking ? 'bg-gray-300' : 'hbg-green-600'"
                                    class="rounded-lg  h-6 w-6 inline mr-2 text-white"
                                    @click="changeQuantity(tourist.ageBand,'-')"
                                >-</button>
                                    <h4 class="text-base lg:text-sm font-semibold inline">{{ tourist.quantity }}</h4>
                                <button
                                    class="rounded-lg h-6 w-6 inline ml-2 text-white"
                                    :disabled="(tourist.quantity >= tourist.maxTravelersPerBooking) || !validMaxSeats"
                                    :class="(tourist.quantity >= tourist.maxTravelersPerBooking) || !validMaxSeats ? 'bg-gray-300' : 'hbg-green-600'"
                                    @click="changeQuantity(tourist.ageBand,'+')"
                                >+</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    class="py-1.5 sp:py-3 text-center w-full hbtn-cta mt-[12px] sp:mt-6 text-[10px] sp:text-base"
                    :disabled="!formReserve.date || formReserve.ages.length <= 0 || !validMaxSeats"
                    @click="getDetailOptions()"
                >
                {{ $t('experience.detail-page.availability-label') }}
                </button>
                <p class="text-[8px] sp:text-sm font-medium mt-[12px] sp:mt-6">
                    <template v-if="experienceData['cancellation_policy'] == 'STANDARD'">
                        {{ $t('experience.detail-page.free-cancellation-label') }}
                    </template>
                    <template v-else>
                        {{ $t('experience.detail-page.non-refundable-cancellation-label') }}
                    </template>
                </p>
                <!-- <p class="text-sm font-medium mt-2">Hasta 24 horas de anticipación</p> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { provide, onMounted, computed, ref, inject, watch, reactive } from 'vue'

import DetailPageSectionReserveCalendar from './DetailPageSectionReserveCalendar.vue'

import { useLocaleStore } from '@/stores/modules/locale'
        const localeStore = useLocaleStore()

//DATA STATIC
const translate = {
    age: {
        infant: {
            es: 'Bébe',
            en: 'Infant',
            fr: 'Nourrisson',
        },
        child: {
            es: 'Niño',
            en: 'Child',
            fr: 'Enfant',
        },
        adult: {
            es: 'Adulto',
            en: 'Adult',
            fr: 'Adulte',
        },
        senior: {
            es: 'Tercera edad',
            en: 'Senior',
            fr: 'Senior',
        },
        youth: {
            es: 'Joven',
            en: 'Youth',
            fr: 'Jeunesse',
        },
        traveler: {
            es: 'Viajero',
            en: 'Traveler',
            fr: 'Voyageur',
        },
    }
}

//DATA
const addTypeTourits = ref([])

//INJECT
const $moment = inject('$moment')
const formReserve = inject('formReserve')
const experienceData = inject('experienceData')
const experienceViatorData = inject('experienceViatorData')
const schedulesData = inject('schedulesData')
const productOptions = inject('productOptions')
const variantPrice = inject('variantPrice')

//COMPUTED
const totalSeats = computed(() => {
    return formReserve.ages.reduce((acc, item) =>{
         acc += item.quantity
         return acc
    }, 0)
})
const maxSeats = computed(() => {
    return typeTourists.value[0].maxTravelersPerBooking
})
const validMaxSeats = computed(() => {
    return totalSeats.value < maxSeats.value
})
const typeTourists = computed(() => {
    let ages = experienceViatorData?.value.pricingInfo?.ageBands || []
    ages = ages.map(item => {
        let age = item.ageBand.toLowerCase()
        return {
            name: translate.age[age][localeStore.localeCurrent],
            ageBand: item.ageBand,
            startAge: item.startAge,
            endAge: item.endAge,
            minTravelersPerBooking: item.minTravelersPerBooking,
            maxTravelersPerBooking: item.maxTravelersPerBooking,
            quantity: 0,
        }
    })
    .sort((a, b) => {
        if (a.startAge > b.startAge) return -1 
        if (a.startAge < b.startAge) return 1
        return 0 
    })
    return ages
})

//ONMOUNTED
onMounted(() => {
    addTypeTourits.value = [...typeTourists.value]
    let type_tourist = addTypeTourits.value.find(item => item.ageBand == 'ADULT')
    type_tourist.quantity = 2
    formReserve.ages = addTypeTourits.value.filter(item => item.quantity > 0)
})



//FUNCTION
function disablePlusQuantityTypeTourist(id){

}
function changeQuantity(age, type){
    let type_tourit = addTypeTourits.value.find(item => item.ageBand == age)
    type == '+' ? type_tourit.quantity++ : type_tourit.quantity--
    
    formReserve.ages = addTypeTourits.value.filter(item => item.quantity > 0)
}
function getDetailOptions (code) {
    formReserve.hour = null
    let date_reserve = $moment(formReserve.date)
    let options = []
    let bookable_items = schedulesData?.value.bookableItems
    bookable_items.forEach(item_bookable => {
        let code = item_bookable?.productOptionCode

        item_bookable.seasons.forEach(item_season => {
            let start_date = ''
            let end_date = ''
            if (item_season?.endDate) {
                start_date = item_season.startDate
                end_date = item_season.endDate
            } else {
                start_date =  $moment()
                end_date = $moment().add(384, 'days')
            }
            let date_now = $moment()
            let date = $moment(start_date)
            // if (date_now.isSame(date)) {
            //     start_date = $moment(start_date).add(1, 'days')
            //     end_date = $moment(end_date).add(-1, 'days')
            // }
            let compared_date = date_reserve.isSameOrAfter(start_date) && date_reserve.isSameOrBefore(end_date)
            // console.log(compared_date, code, 'compared_date')
            if (!compared_date) return;
            // return compared_date

            let name_day = date_reserve.locale('en').format("dddd").toUpperCase()
            let times = []
            let pricing_details = []
            item_season.pricingRecords.forEach(item_price => {
                
                let day_of_week = item_price.daysOfWeek.includes(name_day)
                if (!day_of_week) return;

                let timed_entries = item_price?.timedEntries?.filter(item_time => {
                    let unavailable_dates = item_time?.unavailableDates || []
                    unavailable_dates = unavailable_dates.map(item_una => item_una.date)
                    return !unavailable_dates.includes(date_reserve.format('YYYY-MM-DD'))
                })

                //MODIFICATED
                if (!timed_entries?.length || timed_entries?.length === 0) return

                times = timed_entries.map(item_time => item_time.startTime)

                if (!variantPrice) {
                    pricing_details = item_price.pricingDetails
                        .filter(item_price => {
                            let age = formReserve.ages.find(item_age => {
                                return item_age.ageBand == item_price.ageBand
                            })
                            return age
                        })
                        .map(item_price => {
                            let age = formReserve.ages.find(item_age => {
                                return item_age.ageBand == item_price.ageBand
                            })
                            let quantity = age.quantity
                            let price = item_price.price.original.recommendedRetailPrice
                            let sub_total = quantity * price
                            return {
                                pricing_package_type: item_price.pricingPackageType,
                                ageBand: item_price.ageBand,
                                price,
                                quantity,
                                sub_total,
                            }
                        })
                } else {
                    pricing_details = item_price.pricingDetails
                        .filter(item_price => {
                            let age = formReserve.ages.find(item_age => {
                                let valid_age = item_age.ageBand == item_price.ageBand
                                return valid_age
                            })
                            if (item_price?.maxTravelers && age) {
                                let valid_travel = (age.quantity >= item_price.minTravelers) && (age.quantity <= item_price.maxTravelers)
                                return valid_travel && age
                            }
                            return age
                        })
                        .map(item_price => {
                            let age = formReserve.ages.find(item_age => {
                                return item_age.ageBand == item_price.ageBand
                            })
                            let quantity = age.quantity
                            let price = item_price.price.original.recommendedRetailPrice
                            let sub_total = quantity * price
                            return {
                                pricing_package_type: item_price.pricingPackageType,
                                ageBand: item_price.ageBand,
                                price,
                                quantity,
                                sub_total,
                            }
                        })
                }


            })
            
            let product_option = null
            if (code) {
                product_option = experienceViatorData?.value.productOptions.find(item_option => item_option.productOptionCode == code)
            }

            let total = pricing_details.reduce((acc, item) => {
                let amount = item.price * item.quantity
                acc += amount
                return acc
            }, 0)

            let option = options.find(item => item.product_option_code == code)
            if (option) {
                option.times.push(...times)
            } else {
                options.push({
                    product_option_code: code,
                    title: code && product_option?.title ? product_option?.title : experienceViatorData?.value.title,
                    description: code && product_option?.description ? product_option?.description : experienceViatorData.value?.description,
                    season: [item_season.startDate, item_season?.endDate],
                    day_of_week: name_day,
                    times,
                    pricing_details,
                    total,
                })  
            }
            
        })
    })
    productOptions.value = options.map((item, index) => {
        return {
            ...item,
            collage: false,
            available: item.times.length > 0
        }
    })
    productOptions.value = productOptions.value.sort((a, b) => {
        return b.available - a.available;
    })

    let products_options_valid = productOptions.value.filter(item => item.available)

    if (!products_options_valid?.length) {
        goProductInViator()
    }
    scrollToShowOptions()
}
function goProductInViator () {
    window.open(experienceViatorData?.value.productUrl, '_blank')
}
function scrollToShowOptions () {
    const showOptionsElement = document.getElementById('show-options');
    if (showOptionsElement) {
    showOptionsElement.scrollIntoView({ behavior: 'smooth' });
    }
}

</script>

<style lang="scss" scoped>
    
</style>