<template>
    <div v-if="featuredPlaces.length > 0" class="mx-3 sp:mx-4">
        <!-- header con fondo amarillo -->
        <div class="bg-[#FFD700] text-black px-2 py-3 rounded-t-[10px]">
            <h2 class="lato sp:text-[16px] text-[12px] lato  font-bold leading-[12px] ">
                {{ $t('home.recomendation-places.title-slider') }}
            </h2>
        </div>

        <!-- contenedor del slider -->
        <div class="relative">
            <!-- lineas de progreso - FIJAS SOBRE TODO -->
            <div v-if="featuredPlaces.length > 1" class="absolute top-2 left-2 right-2 z-30">
                <div class="flex gap-2">
                    <button
                        v-for="(place, index) in featuredPlaces"
                        :key="`line-${index}`"
                        @click.stop="goToSlide(index)"
                        class="relative flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
                    >
                        <!-- linea de progreso que se llena -->
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

            <!-- Slider de imagenes -->
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
                        <!-- imagen de fondo -->
                        <div class="relative h-[140px] sp:h-[180px]">
                            <img 
                                :src="placeStore.$loadImage(place.image)"
                                :alt="place.title"
                                class="absolute inset-0 w-full h-full object-cover"
                            >
                            
                            <!-- Content Ovoverlayerlay -->
                            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                            
                            <!-- informacion del lugar con fondo -->
                            <div class="absolute bottom-0 left-0 right-0 py-3 px-2 text-white" style="background-color: rgba(51, 51, 51, 0.3);">
                                <div class="flex items-center gap-2">
                                    <!-- icono de la categoria -->
                                    <img 
                                        v-if="place.categori_place?.icon" 
                                        class="w-6 h-6 filter brightness-0 invert" 
                                        :src="`/assets/icons/${place.categori_place.icon}.svg`"
                                        alt=""
                                    >
                                    <img 
                                        v-else 
                                        class="w-5 h-5 filter brightness-0 invert" 
                                        src="/assets/icons/WA.MONUMENTOS.svg"
                                        alt=""
                                    >
                                    
                                    <!-- titulo y distancia -->
                                    <div class="flex items-center">
                                        <div class="max-w-[70%] min-w-0">
                                            <span class="text-[#FAFAFA] font-bold line-clamp-1 sp:text-[16px] text-[11px] lato" v-html="place.title + ','"></span>
                                        </div>
                                        <p class="text-[#FAFAFA] sp:text-[14px] text-[10px] lato font-bold flex-shrink-0 ml-1">{{ place.distance }} km</p>
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
const touchStartX = ref(0);
const touchStartY = ref(0);
let isScrollingVertically = false;
let isScrollingHorizontally = false;
let autoSlideInterval = null;

// computed para filtrar lugares recomendados y destacados
const featuredPlaces = computed(() => {
    if (!props.places) return [];
    return props.places.filter(place => place.recommended || place.place_featured);
});

// Navegación del slider
const nextSlide = () => {
    if (currentSlide.value < featuredPlaces.value.length - 1) {
        currentSlide.value++;
    } else {
        currentSlide.value = 0; // volver al primer slide
    }
};

const previousSlide = () => {
    if (currentSlide.value > 0) {
        currentSlide.value--;
    } else {
        currentSlide.value = featuredPlaces.value.length - 1; // volver al ultimo slide
    }
};

const goToSlide = (index) => {
    currentSlide.value = index;
    // reiniciar auto-slide cuando se hace click manual
    if (autoSlideInterval) {
        stopAutoSlide();
        setTimeout(() => {
            startAutoSlide();
        }, 100);
    }
};

// auto-slide funcionalidad
const startAutoSlide = () => {
    if (featuredPlaces.value.length > 1) {
        isPaused.value = false;
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 2500); // cambiar slide cada 2.5 segundos
    }
};

const stopAutoSlide = () => {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
        isPaused.value = true;
    }
};

// navegacion a detalle del lugar
const goPlace = (placeId) => {
    if (!window.$utils?.isMockup()) {
        router.push({ name: 'PlaceDetail', params: { id: placeId } });
    }
};

onMounted(() => {
    startAutoSlide();
});

onUnmounted(() => {
    stopAutoSlide();
});

// handlers de touch mejorados
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

    // si aun no hemos determinado la direccion
    if (!isScrollingVertically && !isScrollingHorizontally) {
        // si el movimiento es mas horizontal que vertical (usando un angulo de 30 grados)
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
                previousSlide();
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

// Pausar auto-slide cuando el usuario interactúa
const handleUserInteraction = () => {
    stopAutoSlide();
    // reiniciar auto-slide despues de 1.5 segundos de inactividad
    setTimeout(() => {
        startAutoSlide();
    }, 2500);
};
</script>

<style scoped>
.line-clamp-2 {
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
    animation: fillProgress 2.5s linear forwards;
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