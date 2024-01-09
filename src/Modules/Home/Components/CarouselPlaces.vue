<template>
    <div :id="`carousel-place-${id}`" v-if="items.length > 0" class="hidden lg:block">
        <div id="carouser-wrapper-places">
            <Carousel v-model="current_slide" :settings="settings_cross" :breakpoints="breakpoints">
                <Slide v-for="(item, index) in items" :key="index">
                    <div class="card-width">
                        <CardProduct :data="item" place />
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
                <CardProduct :data="item" place />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, computed, provide, inject, ref, toRefs, watch } from 'vue'
    import { Carousel, Pagination, Slide, Navigation } from 'vue3-carousel'
    import 'vue3-carousel/dist/carousel.css'
    //import components
    import CardProduct from './CardProduct'


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

    const { id, items } = toRefs(props)

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

    //MOUNTED
    onMounted(() => {
        let length = items.length
        if (length > 0) {
            let carousel_next_visible = length > 4 ? 'visible' : 'hidden'
            changeVisivilitySlice('carousel__prev', 'hidden')
            changeVisivilitySlice('carousel__next', carousel_next_visible)
        }
    })

    //WATCH
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

    //FUNCTIONS
    function changeVisivilitySlice (class_name = 'carousel__prev', visivility = 'visible') {
        let element = document.getElementById(`carousel-place-${id.value}`).getElementsByClassName(class_name)
        let array_element = Array.from(element)
        array_element.forEach(item => {
            item.style.cssText = `visibility: ${visivility} !important;`
        })
    }

</script>

<style lang="scss">

    #carouser-wrapper-places {
        .carousel__next .carousel__icon, 
        .carousel__prev .carousel__icon {
        fill: #000 !important;
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
            background-color: white !important; 
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
            display: none;
            transition: all 2s ease;
            border-radius: 50%;
        }
        .carousel__prev {
            margin-left: 0.4rem !important;
        }
        .carousel__next { 
            margin-right: 0.4rem !important; 
        }
    }
    #carouser-wrapper-places:hover {
        .carousel__prev, .carousel__next {
            display: block;
        }
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
    #carouser-wrapper-places{
        margin: 0 -12px;
    }
    @media (min-width:1024px) {
        #carouser-wrapper-places .card-width{
            width: 100%;
            margin: 0 12px;
        }
    }
    // @media (min-width:1280px) {
    //     .card-width{
    //         width: 302px;
    //     }
    // }
</style>
