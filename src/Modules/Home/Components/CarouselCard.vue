<template>
    <div class="bg-gradient-h rounded-[16px] sp:rounded-[20px] overflow-hidden w-[160px] sp:w-[253px] flex-shrink-0 shadow-guest z-[150] border border-white">
        <!-- img section -->
        <div class="relative">
            <img 
                :src="imgUrl"
                class="object-cover w-full h-[102px] sp:h-[168px]"
            >

            <div    
                v-if="data.ad_tag || data.recommended || data.place_featured"
                class="absolute bottom-[6px] sp:bottom-2 left-[6px] sp:left-2 px-[6px] sp:px-2 rounded-full hbg-gray-100 h-[15px] sp:h-[20px]"
            >
                <div class="flex items-center h-full">
                    <img 
                        v-if="data.recommended || data.place_featured"
                        class="w-2 sp:w-3 h-2 sp:h-3 mr-[3px] sp:mr-1" 
                        src="/assets/icons/WA.STAR.BLACK.svg"
                    >
                    <p  class="roboto text-[8px] sp:text-xs font-bold leading-[5px] sp:leading-[10px] uppercase">
                        {{ data.ad_tag ?? ''}}
                        {{ data.recommended || data.place_featured ? $utils.capitalize($t('home.card-product.recommended')) : ''}}
                    </p>
                </div>
            </div>
        </div>
        
        <!-- body card -->
        <div class="p-3 sp:p-4">
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