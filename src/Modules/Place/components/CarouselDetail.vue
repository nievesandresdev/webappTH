<template>
    <!-- Carousel Imagenes Places -->
    <div id="carousel-show-place" v-if="place?.place_images?.length > 0"  class="hidden lg:block">
        <Carousel :items-to-show="3">
            <Slide v-for="(img, index) in place.place_images" :key="index">
                <div class="mx-auto carousel__item">
                    <img :src="getImagePath(img)" class="block w-full h-full rounded-[10px] object-cover"
                        alt="...">
                </div>
            </Slide>

            <template #addons>
                <Navigation />
            </template>
        </Carousel>
    </div>
    <!-- END Carousel Imagenes Places -->
    <!-- TABLET Carousel Imagenes Places -->
    <div class="hidden overflow-x-auto md:flex lg:hidden">
        <template  v-for="(img, index) in place?.place_images" :key="index">
            <img 
                :src="getImagePath(img)" 
                class="block object-cover mr-4 h-72"
                style="min-width:24rem"
            >
        </template>
    </div>
    <!-- END Carousel Imagenes Places -->
    <!-- MOBILE Carousel Imagenes Places -->
    <div id="carousel-show-place-mobile" v-if="place?.place_images?.length > 0"  class="relative md:hidden">
        <Carousel :items-to-show="1">
            <Slide v-for="(img, index) in place.place_images" :key="index">
                <router-link 
                    :to="{ name : 'PlaceList', query: { typeplace: place.type_place?.id, categoriplace: place?.categori_places_id, mobile : true } }"
                    class="rounded-full bg-white p-[4px] sp:p-2 absolute top-[8px] sp:top-4 left-[8px] sp:left-4"
                >
                    <img class="w-4" src="/assets/icons/arrow-back.svg"/>
                </router-link>
                <img 
                    :src="getImagePath(img)" 
                    class="block w-full h-[130px] sp:h-60 object-cover"
                    style="border-radius: 0px 0px 10px 10px;"
                >
                
            </Slide>

            <template #addons>
                <Navigation />
                <Pagination />
            </template>
        </Carousel>
    </div>
    <!-- END MOBILE Carousel Imagenes Places -->
</template>
<script setup>
    import { onMounted } from 'vue';
    import { Carousel, Pagination, Slide, Navigation } from 'vue3-carousel'
    import 'vue3-carousel/dist/carousel.css'
    import { useMainStore } from '@/stores'
    const mainStore = useMainStore()

    const props = defineProps({
        place:{
            type:Object,
            default:{}
        }
    })
    onMounted(()=>{
        // console.log('props.place',props.place)
    })
    
    const storageUrl = mainStore.URL_STORAGE

    function getImagePath(image) {
        return `${storageUrl}/storage/places/${image.image}`
    }
</script>
<style scoped>


.carousel__pagination .carousel__pagination-button--active {
    background-color: #fff !important;
    margin-top: 0;
}
@media (min-width: 1020px){
    .carousel__item {
        height: 400px;
        width: 97%;
    }
}

.carousel__pagination {
    bottom: 0;
    position: absolute;
    left: 0;
    right: 0;
}

.carousel__pagination {
margin: 16px 0;
}
.carousel__pagination .carousel__pagination-button{
background-color: #bfbfbf !important;
}
.carousel__pagination .carousel__pagination-button--active{
background-color: #000 !important;
}
.carousel__pagination-button {
background-color: #cfcfcf !important;
border-radius: 20px  !important;
padding: 6px  !important;
}

@media(max-width:300px) {
    #carousel-show-place-mobile .carousel__pagination {
        /* display: none !important; */
        transform: scale(0.6);
    }
}
</style>