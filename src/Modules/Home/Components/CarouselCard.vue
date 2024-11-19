<template>
    <div class="rounded-[20px] overflow-hidden min-w-[253px] shadow-guest z-[150]">
        <!-- img section -->
        <div class="relative">
            <img 
                :src="imgUrl"
                class="object-cover w-full h-[168px]"
            >

            <div    
                v-if="data.ad_tag || data.recommended || data.place_featured"
                class="absolute bottom-2 left-2 px-2 rounded-full hbg-gray-100 h-[20px]"
            >
                <div class="flex items-center h-full">
                    <img 
                        v-if="data.recommended || data.place_featured"
                        class="w-3 h-3 mr-1" 
                        src="/assets/icons/WA.STAR.BLACK.svg"
                    >
                    <p  class="roboto text-xs font-bold leading-[10px] uppercase">
                        {{ data.ad_tag ?? ''}}
                        {{ data.recommended || data.place_featured ? $utils.capitalize($t('home.card-product.recommended')) : ''}}
                    </p>
                </div>
            </div>
        </div>
        
        <!-- body card -->
        <div class="bg-gradient-h p-4">
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
import { toRefs } from 'vue';
const props = defineProps({
    imgUrl:String,
    data:Object,
})

const { imgUrl } = toRefs(props)

</script>
