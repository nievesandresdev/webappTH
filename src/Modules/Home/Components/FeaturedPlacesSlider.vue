<template>
    <div v-if="featuredPlaces.length > 0" class="mb-4 mx-3 sp:mx-4">
        <!-- Header Section with Yellow Background -->
        <div class="bg-yellow-400 text-black px-4 py-3 rounded-t-[16px] sp:rounded-t-[20px]">
            <h2 class="lato text-[14px] sp:text-[20px] font-bold leading-[12px] sp:leading-[18px]">
                Sitios exclusivos para ti
            </h2>
        </div>

        <!-- Slider Container -->
        <div class="relative">
            <!-- Progress Lines (Líneas de progreso) - FIJAS SOBRE TODO -->
            <div v-if="featuredPlaces.length > 1" class="absolute top-4 left-4 right-4 z-30">
                <div class="flex gap-2">
                    <button
                        v-for="(place, index) in featuredPlaces"
                        :key="`line-${index}`"
                        @click.stop="goToSlide(index)"
                        class="relative flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
                    >
                        <!-- Línea de progreso que se llena -->
                        <div 
                            v-if="currentSlide === index"
                            class="absolute top-0 left-0 h-full bg-white rounded-full progress-fill"
                            :class="{ 'animate-progress': !isPaused }"
                        ></div>
                        <!-- Línea completa para slides ya pasados -->
                        <div 
                            v-else-if="index < currentSlide"
                            class="absolute top-0 left-0 w-full h-full bg-white rounded-full"
                        ></div>
                    </button>
                </div>
            </div>

            <!-- Slider de Imágenes -->
            <div class="overflow-hidden rounded-b-[16px] sp:rounded-b-[20px]">
                <div 
                    class="flex transition-transform duration-300 ease-in-out"
                    :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
                    @touchstart="handleTouchStart"
                    @touchmove="handleTouchMove"
                    @touchend="handleTouchEnd"
                >
                    <div 
                        v-for="place in featuredPlaces" 
                        :key="place.id"
                        class="w-full flex-shrink-0 relative cursor-pointer"
                        @click="goPlace(place.id)"
                    >
                        <!-- Background Image -->
                        <div class="relative h-[140px] sp:h-[180px]">
                            <img 
                                :src="placeStore.$loadImage(place.image)"
                                :alt="place.title"
                                class="absolute inset-0 w-full h-full object-cover"
                            >
                            
                            <!-- Content Overlay -->
                            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                            
                            <!-- Place Info - Bottom overlay -->
                            <div class="absolute bottom-0 left-0 right-0 p-3 sp:p-4 text-white">
                                <div class="flex items-center gap-3">
                                    <!-- Category Icon -->
                                    <img 
                                        v-if="place.categori_place?.icon" 
                                        class="w-5 h-5 filter brightness-0 invert" 
                                        :src="`/assets/icons/${place.categori_place.icon}.svg`"
                                        alt=""
                                    >
                                    <img 
                                        v-else 
                                        class="w-5 h-5 filter brightness-0 invert" 
                                        src="/assets/icons/WA.MONUMENTOS.svg"
                                        alt=""
                                    >
                                    
                                    <!-- Title and Distance -->
                                    <div class="flex-1">
                                        <h3 class="text-sm sp:text-base font-bold line-clamp-1 text-white" v-html="place.title"></h3>
                                        <p class="text-xs sp:text-sm text-white opacity-90">{{ place.distance }} km</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
const isPaused = ref(false);
let autoSlideInterval = null;

// Variables para el manejo del swipe táctil
const touchStartX = ref(0);
const touchEndX = ref(0);
const isSwiping = ref(false);

// Computed para filtrar lugares recomendados y destacados
const featuredPlaces = computed(() => {
    if (!props.places) return [];
    return props.places.filter(place => place.recommended || place.place_featured);
});

// Navegación del slider
const nextSlide = () => {
    if (currentSlide.value < featuredPlaces.value.length - 1) {
        currentSlide.value++;
    } else {
        currentSlide.value = 0; // Loop back to first slide
    }
};

const previousSlide = () => {
    if (currentSlide.value > 0) {
        currentSlide.value--;
    } else {
        currentSlide.value = featuredPlaces.value.length - 1; // Loop to last slide
    }
};

const goToSlide = (index) => {
    currentSlide.value = index;
    // Reiniciar auto-slide cuando se hace click manual
    if (autoSlideInterval) {
        stopAutoSlide();
        setTimeout(() => {
            startAutoSlide();
        }, 100);
    }
};

// Auto-slide funcionalidad
const startAutoSlide = () => {
    if (featuredPlaces.value.length > 1) {
        isPaused.value = false;
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 5000); // Cambiar slide cada 5 segundos
    }
};

const stopAutoSlide = () => {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
        isPaused.value = true;
    }
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

// Funciones para manejo de swipe táctil
const handleTouchStart = (e) => {
    touchStartX.value = e.touches[0].clientX;
    isSwiping.value = true;
    // Pausar auto-slide durante el toque
    stopAutoSlide();
};

const handleTouchMove = (e) => {
    if (!isSwiping.value) return;
    
    // Prevenir scroll vertical si el movimiento es principalmente horizontal
    const touchCurrentX = e.touches[0].clientX;
    const deltaX = Math.abs(touchCurrentX - touchStartX.value);
    const deltaY = Math.abs(e.touches[0].clientY - e.touches[0].clientY);
    
    if (deltaX > deltaY) {
        e.preventDefault();
    }
};

const handleTouchEnd = (e) => {
    if (!isSwiping.value) return;
    
    touchEndX.value = e.changedTouches[0].clientX;
    handleSwipeGesture();
    isSwiping.value = false;
    
    // Reiniciar auto-slide después del swipe
    setTimeout(() => {
        startAutoSlide();
    }, 500);
};

const handleSwipeGesture = () => {
    const swipeDistance = touchStartX.value - touchEndX.value;
    const minSwipeDistance = 50; // Mínima distancia para considerar un swipe
    
    if (Math.abs(swipeDistance) < minSwipeDistance) return;
    
    if (swipeDistance > 0) {
        // Swipe hacia la izquierda - siguiente slide
        nextSlide();
    } else {
        // Swipe hacia la derecha - slide anterior
        previousSlide();
    }
};

// Pausar auto-slide cuando el usuario interactúa
const handleUserInteraction = () => {
    stopAutoSlide();
    // Reiniciar auto-slide después de 3 segundos de inactividad
    setTimeout(() => {
        startAutoSlide();
    }, 3000);
};
</script>

<style scoped>
.line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Animación de progreso para las líneas */
.progress-fill {
    width: 0%;
}

.animate-progress {
    animation: fillProgress 5s linear forwards;
}

@keyframes fillProgress {
    from {
        width: 0%;
    }
    to {
        width: 100%;
    }
}
</style> 