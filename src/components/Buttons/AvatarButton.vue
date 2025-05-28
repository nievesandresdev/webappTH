<template>
    <div 
        class="border rounded-full z-50 flex items-center justify-center hshadow-button relative"
        id="avatar-container"
        :class="{'p-1 sp:p-[7px]' : !data?.avatar}"
        @click="goProfile"
        :style="{
            backgroundColor: chainStore.$bgColor0,
            borderColor: chainStore.$colorContrast0,
            width: $utils.isMockup() ? '24px' : size+'px',
            height: $utils.isMockup() ? '24px' : size+'px',
        }"
    >
        <BaseBadge
            size="medium"
            :showBadge="queryStore.hasPendingQuery"
            :classes="[
                'absolute border-[1.2px] rounded-full w-[7px] h-[7px] sp:w-[14px] sp:h-[14px]',
                {
                    'top-[-14px] right-[-20px] sp:top-[-26px] sp:right-[-39px]': $route.name == 'Home',
                    'top-[-13px] right-[-20px] sp:top-[-22px] sp:right-[-37px]': $route.name !== 'Home',
                }
            ]" 
        />
        <img 
            v-if="data?.avatar && !$utils.isMockup()"
            class="w-full h-full rounded-full"
            :src="$formatImage({ url : data?.avatar,type : data?.avatar_type})"
        >
        <IconCustomColor
            v-else
            class="w-full h-full"
            name="WA.user"
            :color="chainStore.$colorContrast0"
            :width="$utils.isMockup() ? '15' : sizeIcon"
            :height="$utils.isMockup() ? '15' : sizeIcon"
        />
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import BaseBadge from '@/components/BaseBadge.vue';
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
import { useQueryStore } from '@/stores/modules/query'
const queryStore = useQueryStore();

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
    return guestStore.getLocalGuest()
})

const sizeIcon = computed(()=>{
    let sizeDefault = '24';
    if(route.name == 'Home'){
        sizeDefault = '32';
    }
    return sizeDefault
})

onMounted(()=>{
    // guestStore.loadLocalGuest()
})

const $formatImage = (payload) => {
    const URL_STORAGE = process.env.VUE_APP_STORAGE_URL;
    let { url, type, urlDefault } = payload;

    // Verifica si la URL es de tipo `blob:`, lo cual indica una URL de vista previa
    if (url && url.startsWith("blob:")) return url;


    if (urlDefault) return url;

    let type_d = url.includes('https://') ? 'CDN' : 'STORAGE';
    type = type ?? type_d;

    if(type == 'GOOGLE' || type == 'FACEBOOK') {
        return url;
    }

    return type === 'CDN' || type === 'image-hotel-scraper' ? url : URL_STORAGE + url;
};
</script>
<style>
#avatar-container svg{
    margin-left: auto;
    margin-right: auto;
}
</style>