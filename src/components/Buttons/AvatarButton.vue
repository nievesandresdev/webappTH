<template>
    <div 
        class="border border-white rounded-full z-50"
        :class="{'p-1 sp:p-2' : !data?.avatar}"
        @click="goProfile"
        :style="{
            backgroundColor: chainStore.$bgColor0,
            width: $utils.isMockup() ? '24px' : size+'px',
            height: $utils.isMockup() ? '24px' : size+'px',
        }"
    >
        <img 
            v-if="data?.avatar"
            class="w-full h-full rounded-full"
            :src="data?.avatar"
        >
        <IconCustomColor
            v-else
            class="w-full h-full"
            name="WA.user"
            color="#fff"
            :width="$utils.isMockup() ? '15' : sizeIcon"
            :height="$utils.isMockup() ? '15' : sizeIcon"
        />
    </div>
</template>
<script setup>
import { computed } from 'vue'
import IconCustomColor from '@/components/IconCustomColor.vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
import { useGuestStore } from '@/stores/modules/guest'
const guestStore = useGuestStore();
import { useStayStore } from '@/stores/modules/stay'
const stayStore = useStayStore();
import { useChainStore } from '@/stores/modules/chain'
const chainStore = useChainStore();

const props = defineProps({
    size:{
        type:String,
        default:'48'
    }
})

const goProfile = () =>{
    if(stayStore.stayData && guestStore.guestData){
        router.push({ name : 'Profile'})   
    }
}

const data = computed(()=>{
    return guestStore.guestData
})

const sizeIcon = computed(()=>{
    let sizeDefault = '24';
    if(route.name == 'Home'){
        sizeDefault = '32';
    }
    return sizeDefault
})
</script>