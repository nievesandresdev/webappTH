<template>
    <div v-if="featuredPlaces.length > 0" class="mb-4">
        <!-- Header con estrella -->
        <div class="flex items-center gap-2 px-3 py-2">
            <img src="/assets/icons/WA.STAR.BLACK.svg" class="w-4 h-4" alt="star">
            <h2 class="lato text-[16px] font-bold">
                Destino - Recomendados
            </h2>
        </div>

        <!-- Slider Container -->
        <div class="relative w-full h-[200px] sp:h-[250px]" 
            @touchstart="handleTouchStart"
            @touchmove="handleTouchMove"
            @touchend="handleTouchEnd">
            
            <!-- Slides -->
            <div v-for="(place, index) in featuredPlaces" 
                :key="place.id"
                class="absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out"
                :class="{ 'opacity-100': currentSlide === index, 'opacity-0': currentSlide !== index }"
                @click="goPlace(place.id)"
            >
                <!-- Imagen con overlay -->
                <div class="relative w-full h-full">
                    <img 
                        :src="placeStore.$loadImage(place.image)"
                        :alt="place.title"
                        class="w-full h-full object-cover"
                    >
                    <!-- Overlay con gradiente -->
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
                    
                    <!-- Información del lugar -->
                    <div class="absolute bottom-3 left-3 text-white">
                        <h3 class="text-lg font-bold" v-html="place.title"></h3>
                        <div class="flex items-center gap-2 mt-1">
                            <img src="/assets/icons/WA.pointer.svg" class="w-4 h-4 filter brightness-0 invert" alt="location">
                            <span class="text-sm">{{ place.distance }}km</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Dots Navigation -->
            <div v-if="featuredPlaces.length > 1" 
                class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                <button
                    v-for="(dot, index) in featuredPlaces"
                    :key="index"
                    class="w-2 h-2 rounded-full transition-colors duration-300 ease-in-out border border-gray-400"
                    :class="{ 'bg-gray-800': currentSlide === index, 'bg-white': currentSlide !== index }"
                    @click="goToSlide(index)"
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

// Computed para filtrar lugares recomendados y destacados
const featuredPlaces = computed(() => {
    if (!props.places) return [];
    return props.places.filter(place => place.recommended || place.place_featured);
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
        }, 5000);
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