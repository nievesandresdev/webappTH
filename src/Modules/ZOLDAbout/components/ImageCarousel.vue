<template>
    <div class="relative">
        <Carousel
            ref="carousel"
            v-model:currentSlide="currentSlide"
            :wrap-around="true"
        >
            <Slide v-for="image in images" :key="image">
            <div class="w-full h-[120px] sp:h-[240px] flex-shrink-0">
                <img :src="hotelStore.$loadImage(image?.url)" :alt="image.name" class="w-full h-full object-cover">
            </div>
            </Slide>
        </Carousel>

        <!-- Botones Next y Previous -->
        
        <span
            id="previous"
            class="absolute left-0 top-[40%] bottom-0 rounded-full hbg-white-100 w-[24px] sp:w-8 h-[24px] sp:h-8 flex items-center justify-center ml-[8px] sp:ml-4"
            @click="prev($utils.isMockup())"
            v-if="images?.length > 1"
        >
            <img src="/assets/icons/previousCarrousel.svg" alt="Previous" class="h-2 sp:h-3.5 mr-0.5">
        </span>
        
        <span
            id="next"
            class="absolute right-0 top-[40%] bottom-0 rounded-full hbg-white-100 w-[24px] sp:w-8 h-[24px] sp:h-8 flex items-center justify-center mr-[8px] sp:mr-4"
            @click="next($utils.isMockup())"
            v-if="images?.length > 1"
        >
            <img src="/assets/icons/nextCarrousel.svg" alt="Next"  class="h-2 sp:h-3.5 ml-0.5">
        </span>
            
        <!-- Contador -->
        <div 
            class="absolute bottom-[8px] sp:bottom-[1rem] right-[8px] sp:right-[1rem] text-white p-0.5 sp:p-1 info-carousel rounded-[1.5px] sp:rounded-[3px] flex items-center"
        >
            <img src="/assets/icons/images.svg" alt="Imagen" class="w-3.5 sp:w-4 h-3.5 sp:h-4 inline-block">
                <span class="text-[8px] sp:text-xs font-medium ml-1 htext-white-100">{{ images?.length }}</span>
        </div>
    </div>
</template>
  
<script setup>
  import { ref } from 'vue';
  import 'vue3-carousel/dist/carousel.css';
  import { Carousel, Slide } from 'vue3-carousel';
  import { useHotelStore } from '@/stores/modules/hotel'

  const hotelStore = useHotelStore()

  defineProps({
    images:{
        type:Array,
        default:[]
    }
  })
  // Variable reactiva para el slide actual
  const currentSlide = ref(0);
  
  // Referencia al componente Carousel
  const carousel = ref(null);
  
  // Función para avanzar al siguiente slide
  const next = (isMockup) => {
    if(!isMockup){
        carousel.value.next();
    }
  };
  
  // Función para retroceder al slide anterior
  const prev = (isMockup) => {
    if(!isMockup){
        carousel.value.prev();
    }
  };
</script>
<style scoped>
/* .carousel__item{
    
} */
</style>
  