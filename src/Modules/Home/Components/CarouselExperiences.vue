<template>
    <div :id="`carousel-exp-${id}`" v-if="items?.length > 0" class="hidden lg:block">
        <div id="carouser-wrapper-activities">
            <Carousel v-model="current_slide" :settings="settings_cross" :breakpoints="breakpoints">
                <Slide v-for="(item, index) in items" :key="index">
                    <div class="card-width">
                        <CardExperience :data="item" />
                    </div>
                </Slide>
                <template #addons>
                    <Navigation />
                </template>
            </Carousel> 
        </div>
    </div>
    <div v-if="items.length > 0" class="flex lg:hidden overflow-x-auto w-full">
        <div
            v-for="(item, index) in items"
            :key="index"
            class="mr-3"
            :class="{'cursor-pointer':!$utils.isMockup()}"
        >
            <div class="card-width">
                <CardExperience :data="item" />
            </div>
        </div>
    </div>
</template>

<script setup>

    import { onMounted, computed, provide, inject, toRefs, ref, watch, watchEffect } from 'vue';
    import { Carousel, Pagination, Slide, Navigation } from 'vue3-carousel'
    import 'vue3-carousel/dist/carousel.css'
    //import components
    import CardExperience from '@/components/CardExperience.vue'    

    const props =  defineProps({
        items: {
            type: Array,
            default: () => ([])
        },
        id: {
            type: String,
            default: '0'
        }
    })

    const { items, id } = toRefs(props)

    //DATA
    const settings_cross = {
        itemsToShow: 2,
        snapAlign: 'start',
    }
    const breakpoints = {
        700: {
            itemsToShow: 4,
            snapAlign: 'start',
        },
        1024: {
            itemsToShow: 4,
            snapAlign: 'start', 
        },
    }
    const current_slide = ref(0)

    //WATCHS
    watch(current_slide, (value) => {
        let length = items.length
        let slice = 4 + value
        let class_name = 'carousel__prev'
        if (value == 0) {
            changeVisivilitySlice('carousel__prev', 'hidden')
            changeVisivilitySlice('carousel__next', 'visible')
        }else if (slice == length) {
            changeVisivilitySlice('carousel__prev', 'visible')
            changeVisivilitySlice('carousel__next', 'hidden')
        } else {
            changeVisivilitySlice('carousel__prev', 'visible')
            changeVisivilitySlice('carousel__next', 'visible')
        }
    })

    //MOUNTED
    onMounted(() => {
        //i18n.locale = 'en'
        //console.log(i18n.locale, '$i18n.locale')
        let length = items.length
        if (length > 0) {
            let carousel_next_visible = length > 4 ? 'visible' : 'hidden'
            changeVisivilitySlice('carousel__prev', 'hidden')
            changeVisivilitySlice('carousel__next', carousel_next_visible)
        }
    })

    //FUNCTIONS
    function changeVisivilitySlice (class_name = 'carousel__prev', visivility = 'visible') {
        let element = document.getElementById(`carousel-exp-${id.value}`).getElementsByClassName(class_name)
        let array_element = Array.from(element)
        array_element.forEach(item => {
            item.style.cssText = `visibility: ${visivility} !important;`
        })
    }
    function filterPrice (price) {
        price = Number(price)
        return Math.round(price)
    }

</script>

<style lang="scss">
    #carouser-wrapper-activities{
        margin: 0 -12px;
    }
    
    .card-width{
        width: 150px;
    }
    @media (min-width:300px) {
        .card-width{
            width: 242px;
        }
    }
    @media (min-width:768px) {
        .card-width{
            width: 260px;
        }
    }
    @media (min-width:1024px) {
        #carouser-wrapper-activities .card-width{
            width: 100%;
            margin: 0 12px;
        }
    }
    .mx-0{
        margin-left: 0;
        margin-right: 0;
    }

  #carouser-wrapper-activities {
    .carousel__next .carousel__icon, 
    .carousel__prev .carousel__icon {
        fill: #000 !important;
        margin-left: 3px;
    }
    .carousel__next > .carousel__icon {
        margin-left: -1px;
        margin-top: -3px;
    }
    .carousel__prev > .carousel__icon {
        margin-left: -3px;
        margin-top: -3px;
    }
    .carousel__prev, .carousel__next {
        top: 35%;
        background-color: white !important; 
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
        display: none;
        transition: all 2s ease;
        border-radius: 50%;
    }
    .carousel__prev {
        margin-left: 0.6rem !important;
        visibility: visible;
    }
    .carousel__next { 
        margin-right: 0.6rem !important;
        visibility: visible;
    }
  }
    #carousel-exp-0:hover, #carousel-exp-1:hover, 
    #carousel-exp-2:hover, #carousel-exp-3:hover {
        .carousel__prev, .carousel__next {
            display: block;
        }
    }
</style>

