<template>
    <div v-if="productOptions?.length > 0" class="mt-6 lg:mt-8 flex flex-col gap-6">
        <!-- {{ productOptions }} -->
        <template v-for="(item_product, index_product) in productOptions">
            <div
                v-if="item_product.collage"
                class="border-1 border-gray-300 w-full flex flex-col lg:flex-row rounded-xl"
            >
                <div class="p-4 lg:p-6 border-b lg:border-r border-gray-300 w-full lg:w-[75%] flex flex-col space-y-6">
                    <div class="w-full">
                        <span class="bg-[#D9D9D9] p-1 text-[10px] rounded-lg">Opción {{ index_product + 1 }}</span>
                    </div>
                    <h3 class="text-lg font-normal">{{ item_product.title }}</h3>
                    <p
                        v-if="item_product.collage"
                        v-html="item_product.description"
                        class="text-sm"
                    />
                    <div
                        v-if="item_product.collage"
                        class="flex flex-wrap gap-2"
                    >
                        <button
                            v-for="(item_time, index_time) in item_product.times"
                            class=" px-4 py-3"
                            :class="formReserve.hour == item_time ? 'hbtn-cta' : 'hbtn-secondary'"
                            @click="formReserve.hour = item_time"
                        >
                            {{ $moment(item_time, "HH:mm").format("h:mm A") }}
                        </button>
                    </div>
                </div>
                <div class="p-4 lg:p-6 text-right flex flex-col justify-between w-auto flex-1">
                    <div class="mb-6">
                        <h3 class="text-lg font-medium mb-4">{{ $utils.formatPrice(item_product.total) }} Є</h3>
                        <div class="flex flex-col space-y-2">
                            <p
                                v-for="(item_price, index_price) in item_product.pricing_details"
                                :key="index_price"
                                class="text-xs font-medium"
                            >
                                {{ item_price.quantity }} {{ translate.age[item_price.ageBand.toLowerCase()][$i18n.locale] }} x {{ $utils.formatPrice(item_price.price) }} Є
                            </p>
                        </div>
                    </div>
                    <button
                        v-if="item_product.collage"
                        class="hbtn-cta w-full py-3"
                        :disabled="!formReserve.date || !formReserve.hour"
                        @click="goProductInViator()"
                    >
                        Reserva ahora
                    </button>
                </div>
            </div> 
            <div
                v-else
                class="border-1 border-gray-300 w-full flex flex-col lg:flex-row rounded-xl"
                :class="{'cursor-pointer': item_product.available}"
                @click="openOption(item_product, index_product)"
            >
                <div class="p-4 lg:p-6 w-full lg:w-[75%] flex flex-col space-y-6">
                    <div class="w-full">
                        <span class="bg-[#D9D9D9] p-1 text-[10px] rounded-lg">Opción {{ index_product + 1 }}</span>
                        <span v-if="!item_product.available" class="text-sm ml-2">(No disponible)</span>
                    </div>
                    <h3 class="text-lg font-normal" :class="{'text-[#DADADA]': !item_product.available}">{{ item_product.title }}</h3>
                </div>
                <div class="p-4 lg:p-6 text-right flex flex-col justify-between w-auto flex-1">
                    <div>
                        <h3 v-if="item_product.available" class="text-lg font-medium mb-4">{{ $utils.formatPrice(item_product.total) }} Є</h3>
                        <div class="flex flex-col space-y-2">
                            <p
                                v-for="(item_price, index_price) in item_product.pricing_details"
                                :key="index_price"
                                class="text-xs font-medium"
                            >
                                {{ item_price.quantity }} {{ translate.age[item_price.ageBand.toLowerCase()][$i18n.locale] }} x {{ $utils.formatPrice(item_price.price) }} Є
                            </p>
                        </div>
                    </div>
                </div>
            </div> 
        </template>
    </div>
</template>

<script setup>
import { provide, onMounted, computed, ref, inject, watch } from 'vue'

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
const name_days_of_week = {
    MONDAY: 2,
    TUESDAY: 3,
    WEDNESDAY: 4,
    THURSDAY: 5,
    FRIDAY: 6,
    SATURDAY: 7,
    SUNDAY: 1,
}

//INJECT
const formReserve = inject('formReserve')
const experienceData = inject('experienceData')
const experienceViatorData = inject('experienceViatorData')
const schedulesData = inject('schedulesData')
const productOptions = inject('productOptions')
const variantPrice = inject('variantPrice')
const $moment = inject('$moment')

// //COMPUTED
// const productOptions = computed(() => {
//     if (!formReserve.date) return []
//     let options = getDetailOptions()
//     return options
// })

//function 
function openOption (item_product, index) {
    if (!item_product.available) return;
    item_product.collage = true
    let option_open = productOptions.value.find(item => item.collage)
    if (option_open){
        option_open.collage = false
    }
    let option_close = productOptions.value[index]
    if (option_close) {
        productOptions.value[index].collage = true
    }
    formReserve.hour = null
}
function goProductInViator () {
    window.open(experienceViatorData.value.productUrl, '_blank')
}
</script>