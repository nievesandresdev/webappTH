<template>
    <div 
        :id="`${items.length > 1 ? 'facility-cross-mobile' : ''}`"
        class="carousel-home"
        :class="{
            'pl-2.5 sp:pl-4': items.length > 1,
            'flex justify-center': !(items.length > 1)
        }"
    >
        <div 
            v-if="items.length > 1"
            class="overflow-hidden w-full cursor-grab select-none active:cursor-grabbing"
            ref="carouselContainer"
            @mousedown="handleStart"
            @touchstart="handleStart"
            @mousemove="handleMove"
            @touchmove="handleMove"
            @mouseup="handleEnd"
            @touchend="handleEnd"
            @mouseleave="handleEnd"
        >
            <div 
                class="flex w-full gap-4"
                ref="carouselTrack"
                :style="{ transform: `translateX(${translateX}px)` }"
            >
                <div 
                    v-for="(item, index) in items" 
                    :key="index"
                    class="flex-none min-w-0 h-[155px] sp:h-[240px]"
                >
                    <CarouselCard
                        :img-url="facilityStore.$loadImage(item?.image)"    
                        :data="item"
                        @click="handleCardClick(item.id, $utils.isMockup())"
                    >
                        <div class="flex items-center h-[22px] sp:h-[32px]">
                            <p 
                                v-if="item.title"
                                class="lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px] truncate-2t text-left"
                                v-html="item.title[0].toUpperCase() + item.title.substring(1)"
                            ></p>
                        </div>  
                    </CarouselCard>
                </div>
            </div>
        </div>
        
        <!-- Single item display -->
        <div v-else class="w-full h-[140px] sp:h-[240px]">
            <CarouselCard
                v-if="items[0]"
                :img-url="facilityStore.$loadImage(items[0]?.image)"    
                :data="items[0]"
                @click="handleCardClick(items[0].id, $utils.isMockup())"
            >
                <div class="flex items-center h-[22px] sp:h-[32px]">
                    <p 
                        v-if="items[0].title"
                        class="lato text-[10px] sp:text-sm font-bold leading-[12px] sp:leading-[16px] truncate-2t text-left"
                        v-html="items[0].title[0].toUpperCase() + items[0].title.substring(1)"
                    ></p>
                </div>  
            </CarouselCard>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import CarouselCard from './CarouselCard.vue';
//
import { useRouter } from 'vue-router';
const router = useRouter();
// STORE
import { useFacilityStore } from '@/stores/modules/facility'
const facilityStore = useFacilityStore()

const carouselContainer = ref(null)
const carouselTrack = ref(null)

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

// Carousel state
let isDragging = ref(false);
let translateX = ref(0);
let startX = ref(0);
let maxTranslate = ref(0);

onMounted(() => {
    if (carouselContainer.value && props.items.length > 1) {
        // Esperar a que las cards se rendericen
        setTimeout(() => {
            const containerWidth = carouselContainer.value.offsetWidth;
            const trackWidth = carouselTrack.value.scrollWidth; // Ancho total del contenido
            maxTranslate.value = Math.max(0, trackWidth - containerWidth);
        }, 100);
    }
});

const handleStart = (event) => {
    if (props.items.length <= 1) return;
    
    isDragging.value = true;
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    startX.value = clientX;
    
    // Prevent default to avoid scrolling on mobile
    event.preventDefault();
};

const handleMove = (event) => {
    if (!isDragging.value || props.items.length <= 1) return;
    
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const deltaX = clientX - startX.value;
    
    // Hacer el scroll más sensible multiplicando por 1.5
    const sensitivityMultiplier = 1.5;
    const adjustedDelta = deltaX * sensitivityMultiplier;
    
    let newTranslateX = translateX.value + adjustedDelta;
    
    // Límites estrictos - no permitir ningún espacio extra
    newTranslateX = Math.max(-maxTranslate.value, Math.min(0, newTranslateX));
    translateX.value = newTranslateX;
    
    startX.value = clientX; // Update start position for smooth dragging
    
    event.preventDefault();
};

const handleEnd = (event) => {
    if (!isDragging.value || props.items.length <= 1) return;
    
    isDragging.value = false;
    
    // Remove event listeners
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('touchmove', handleMove);
};

const handleCardClick = (facilityId, isMockup) => {
    if (!isDragging.value) {
        goFacility(facilityId, isMockup);
    }
};

function goFacility (facility, isMockup) {
    if(!isMockup){
        router.push({name:'ShowFacility',params:{id:facility}})
    }
}

// Add global event listeners
onMounted(() => {
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);
});

onUnmounted(() => {
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('mouseup', handleEnd);
    document.removeEventListener('touchend', handleEnd);
});

</script>
<style>
/* Prevent text selection during drag - no se puede hacer con Tailwind */
.overflow-hidden.cursor-grab * {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* Transform property for smooth dragging */
.flex.gap-4 {
    will-change: transform;
}
</style>