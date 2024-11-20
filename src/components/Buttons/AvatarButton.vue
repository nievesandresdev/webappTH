<template>
    <div 
        class="h-[48px] w-[48px] border border-white rounded-full z-50 bg-red-100"
        :class="{'p-2' : !data?.avatar}"
        @click="goProfile"
        :style="{
            backgroundColor: chainStore.$bgColor0,
            width: size,
            height: size,
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
            width="30"
            height="30"
        />
    </div>
</template>
<script setup>
import { computed } from 'vue'
import IconCustomColor from '@/components/IconCustomColor.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
import { useGuestStore } from '@/stores/modules/guest'
const guestStore = useGuestStore();
import { useStayStore } from '@/stores/modules/stay'
const stayStore = useStayStore();
import { useChainStore } from '@/stores/modules/chain'
const chainStore = useChainStore();

const props = defineProps({
    size:{
        type:String,
        default:'48px'
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
</script>