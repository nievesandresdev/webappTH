<template>
    <div v-if="featuredPlaces.length > 0" class="mb-10">
        <!-- Slider Container -->
        <div class="relative w-full h-[150px] sp:h-[250px]" 
            @touchstart="handleTouchStart"
            @touchmove="handleTouchMove"
            @touchend="handleTouchEnd">
            
            <!-- slides -->
            <div v-for="(place, index) in featuredPlaces" 
                :key="place.id"
                class="absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out"
                :class="{ 'opacity-100': currentSlide === index, 'opacity-0': currentSlide !== index }"
                @click="goPlace(place.id)"
            >
                <!-- imagen con overlay -->
                <div class="relative w-full h-full">
                    <img 
                        :src="placeStore.$loadImage(place.image)"
                        :alt="place.title"
                        class="w-full h-full object-cover"
                    >
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
                    
                    <!-- informacion del lugar con fondo -->
                    <div class="absolute bottom-0 left-0 right-0 py-2 px-2 text-white" style="background-color: rgba(51, 51, 51, 0.5);">
                        <div class="flex justify-between items-end">
                            <!-- titulo y distancia-->
                            <div class="flex-1">
                                <h3 class="text-[#FAFAFA] font-bold sp:text-[16px] text-[10px] lato line-clamp-2 mb-1" v-html="place.title"></h3>
                                <div class="flex items-center gap-[2px]">
                                    <img src="/assets/icons/WA.pointer.svg" class="w-3 h-3 filter brightness-0 invert" alt="pointer">
                                    <p class="text-[#FAFAFA] sp:text-[12px] text-[8px] lato font-medium">{{ place.distance }}km</p>
                                    
                                </div>
                            </div>
                            
                            <div class="flex-shrink-0 ml-2">
                                <img 
                                    v-if="place.categori_place?.icon" 
                                    class="w-6 h-6 filter brightness-0 invert" 
                                    :src="`/assets/icons/${place.categori_place.icon}.svg`"
                                    alt=""
                                >
                                <img 
                                    v-else 
                                    class="w-6 h-6 filter brightness-0 invert" 
                                    src="/assets/icons/WA.MONUMENTOS.svg"
                                    alt=""
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Dots Navigation -->
            <div v-if="featuredPlaces.length > 1" 
                class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                <button
                    v-for="index in Math.min(3, featuredPlaces.length)"
                    :key="index"
                    class="w-2 h-2 rounded-full transition-colors duration-300 ease-in-out border border-gray-400"
                    :class="{ 
                        'bg-gray-800': index === 3 ? currentSlide >= 2 : currentSlide === index - 1, 
                        'bg-white': index === 3 ? currentSlide < 2 : currentSlide !== index - 1 
                    }"
                    @click="goToSlide(index - 1)"
                ></button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePlaceStore } from '@/stores/modules/place';

const props = defineProps({
    places: {
        type: Array,
        default: () => []
    }
});

const router = useRouter();
const placeStore = usePlaceStore();

const currentSlide = ref(0);
const touchStartX = ref(0);
const touchStartY = ref(0);
let isScrollingVertically = false;
let isScrollingHorizontally = false;
let autoSlideInterval = null;

// Computed para filtrar lugares recomendados y destacados aplicando reverse POR CATEGORÍA
const featuredPlaces = computed(() => {
    if (!props.places) return [];
    
    // Primero filtrar solo los lugares featured/recommended
    const filtered = props.places.filter(place => place.recommended || place.place_featured);
    
    // Separar por categorías usando lógica simple basada en posición original
    const whatvisitPlaces = [];
    const whereeatPlaces = [];
    const leisurePlaces = [];
    
    // Para cada lugar filtrado, encontrar su posición en el array original
    // y determinar su categoría
    filtered.forEach(place => {
        const originalIndex = props.places.findIndex(p => p === place);
        const totalPlaces = props.places.length;
        
        // Dividir en tercios aproximados
        if (originalIndex < totalPlaces / 3) {
            whatvisitPlaces.push(place);
        } else if (originalIndex < (totalPlaces * 2) / 3) {
            whereeatPlaces.push(place);
        } else {
            leisurePlaces.push(place);
        }
    });
    
    // Aplicar reverse a cada categoría y combinar en el orden correcto
    const result = [
        ...whatvisitPlaces.reverse(),
        ...whereeatPlaces.reverse(),
        ...leisurePlaces.reverse()
    ];
    
    return result;
});

// Navegación
const goToSlide = (index) => {
    currentSlide.value = index;
    resetAutoSlide();
};

const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % featuredPlaces.value.length;
};

const prevSlide = () => {
    currentSlide.value = (currentSlide.value - 1 + featuredPlaces.value.length) % featuredPlaces.value.length;
};

// Auto-slide
const startAutoSlide = () => {
    if (featuredPlaces.value.length > 1) {
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 2500);
    }
};

const stopAutoSlide = () => {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
};

const resetAutoSlide = () => {
    stopAutoSlide();
    startAutoSlide();
};

// Touch handlers mejorados
const handleTouchStart = (e) => {
    touchStartX.value = e.touches[0].clientX;
    touchStartY.value = e.touches[0].clientY;
    isScrollingVertically = false;
    isScrollingHorizontally = false;
    stopAutoSlide();
};

const handleTouchMove = (e) => {
    if (!touchStartX.value || !touchStartY.value) return;

    const touchCurrentX = e.touches[0].clientX;
    const touchCurrentY = e.touches[0].clientY;
    const deltaX = Math.abs(touchCurrentX - touchStartX.value);
    const deltaY = Math.abs(touchCurrentY - touchStartY.value);

    // Si aún no hemos determinado la dirección
    if (!isScrollingVertically && !isScrollingHorizontally) {
        // Si el movimiento es más horizontal que vertical (usando un ángulo de 30 grados)
        if (deltaX > deltaY && deltaX > 10) {
            isScrollingHorizontally = true;
            e.preventDefault();
        } else if (deltaY > deltaX && deltaY > 10) {
            isScrollingVertically = true;
        }
    }
    
    // Si ya determinamos que es scroll horizontal, prevenimos el scroll vertical
    if (isScrollingHorizontally) {
        e.preventDefault();
    }
};

const handleTouchEnd = (e) => {
    if (isScrollingHorizontally) {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX.value - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // Resetear valores
    touchStartX.value = 0;
    touchStartY.value = 0;
    isScrollingHorizontally = false;
    isScrollingVertically = false;
    
    startAutoSlide();
};

// Navegación a detalle del lugar
const goPlace = (placeId) => {
    if (!window.$utils?.isMockup()) {
        router.push({ name: 'PlaceDetail', params: { id: placeId } });
    }
};

// Lifecycle
onMounted(() => {
    startAutoSlide();
});

onUnmounted(() => {
    stopAutoSlide();
});
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style> 