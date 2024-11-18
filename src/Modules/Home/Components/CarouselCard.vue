<template>
    <div class="rounded-[20px] overflow-hidden min-w-[253px] shadow-guest z-[150]">
        <!-- img section -->
        <div class="relative">
            <img 
                :src="imgUrl"
                class="object-cover w-full h-[168px]"
            >

            <div    
                v-if="data.ad_tag"
                class="absolute bottom-2 left-2 h-5 px-2 py-1 rounded-full hbg-gray-100"
            >
                <div class="flex items-center roboto text-xs font-bold leading-[120%] uppercase">
                    {{ data.ad_tag }}
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
