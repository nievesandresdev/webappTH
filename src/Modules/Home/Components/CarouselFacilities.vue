<template>
    <div :id="`carousel-facility-${id}`" v-if="items.length > 0" class="hidden lg:block">
        <div id="facility-cross">
            <Carousel v-model="current_slide" :settings="settings_cross" :breakpoints="breakpoints">
                <Slide v-for="(item, index) in items" :key="index">
                    <div class="card-width cursor-pointer" @click="go_facility(item.id, $utils.isMockup())">
                        <div class="h-40 rounded-lg relative overflow-hidden">
                            <div class="overlay rounded-lg absolute h-full z-10 w-full top-0 left-0" style="background: rgba(0, 0, 0, 0.3);"></div>
                            <img 
                                :src="facilityStore.$loadImage(item?.image?.url)"
                                class="object-cover rounded-lg"
                            >
                            <h1 class="absolute top-0 bottom-0 left-0 right-0 m-auto text-center text-white text-base font-medium z-30 h-6">
                                {{item.title[0].toUpperCase() + item.title.substring(1)}}
                            </h1>
                        </div>
                    </div>
                </Slide>
                <template #addons>
                    <Navigation />
                </template>
            </Carousel> 
        </div>
    </div>
    <div v-if="items.length > 0"  id="facility-cross-mobile" class="flex lg:hidden overflow-x-auto overflow-y-hidden w-full">
        <div
            v-for="(item, index) in items"
            :key="index"
            class="mr-3 card-width shrink-0 h-24 sp:h-40 rounded-lg relative"
             @click="go_facility(item.id, $utils.isMockup())"
        >
            <img 
                :src="facilityStore.$loadImage(item?.image?.url)"
                class="object-cover rounded-lg w-full h-full"
            >
            <div class="overlay rounded-lg absolute h-full z-10 w-full top-0 left-0" style="background: rgba(0, 0, 0, 0.3);"></div>
            <h2 class="absolute top-0 bottom-0 left-0 right-0 m-auto text-center text-white text-[10px] sp:text-base font-medium z-30 h-4 sp:h-6">
                {{item.title[0].toUpperCase() + item.title.substring(1)}}
            </h2>   
        </div>
    </div>
</template>

<script setup>
    // IMPORTS
    import { onMounted, computed, ref, toRefs, watch } from 'vue'
    import { Carousel, Slide, Navigation } from 'vue3-carousel'
    import 'vue3-carousel/dist/carousel.css'
    import { useRouter } from 'vue-router'

    // STORE
    import { useFacilityStore } from '@/stores/modules/facility'
    const facilityStore = useFacilityStore()


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
    const router = useRouter();

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
        // let class_name = 'carousel__prev'
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
    function getImg(payload) {
        if (payload?.images.length > 0) return `/storage/facility/${payload.images[0].url}`
        else return '/vendor_asset/img/default/default_activities.png'
    }

    function changeVisivilitySlice (class_name = 'carousel__prev', visivility = 'visible') {
        let element = document.getElementById(`carousel-facility-${id.value}`).getElementsByClassName(class_name)
        let array_element = Array.from(element)
        array_element.forEach(item => {
            item.style.cssText = `visibility: ${visivility} !important;`
        })
    }

    function go_facility (facility,isMockup) {
        if(!isMockup){
            router.push({name:'FacilityDetail',params:{id:facility}})
        }
    }

</script>

<style lang="scss" scoped>
    #facility-cross {
        .carousel__next .carousel__icon, .carousel__prev .carousel__icon {
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
    #facility-cross:hover {
        .carousel__prev, .carousel__next {
            display: block;
        }
    }
    #facility-cross{
        margin: 0 -12px;
    }
    #facility-cross-mobile .card-width{
        width: 150px;
    }
    #facility-cross{
        .overlay:hover ~ img{
            transform: scale(1.2);
        }
        h1:hover,
        .overlay:hover ~ h1{
            font-size: 18px !important;
        }
        img {
            width: 100%;
            height: 100%;
            transition: all 500ms ease;
        }
    }
    @media (min-width:300px) {
        #facility-cross-mobile .card-width{
            width: 242px;
        }
    }
    @media (min-width:768px) {
        #facility-cross-mobile .card-width{
            width: 260px;
        }
    }
    @media (min-width:1024px) {
        #facility-cross .card-width{
            overflow: hidden;
            transition: all 500ms ease;
            width: 100%;
            margin: 0 12px;
        }
    }
</style>
