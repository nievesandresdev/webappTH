<template>
    <div
        class="card-list flex w-full cursor-pointer"
        :class="class"
        @click="goService"
    >
        <div class="w-[55px] sp:w-[111px] rounded-[10px] relative overflow-hidden">
            <img
                class="object-cover w-full h-full"
                 :src="serviceStore.$loadImage(data?.images[0])"
                alt="img_service"
                loading="lazy"
            >
            <div
                v-if="data?.featured"
                class="absolute bottom-0 left-0 px-[2px] sp:px-[4px] pb-[4px] sp:pb-[8px] z-20 w-full"
            >
                <div class="rounded-full px-[2px] sp:px-[4px] py-[1px] sp:py-[2px] flex space-x-[1px] sp:space-x-1 bg-white flex items-center">
                    <img
                        src="/assets/icons/WA.STAR.BLACK.svg"
                        class="size-[6px] sp:size-[12px]"
                    >
                    <span class="text-[4px] sp:text-[10px] font-bold htext-black-100 leading-none lato">{{ ($t('home.card-product.recommended'))?.toUpperCase() }}</span>
                </div>
            </div>
        </div>

        
        <div
            class="p-[4px] sp:p-[8px] flex flex-col flex-1 truncate-2 space-y-[8px] sp:space-y-[16px]"
            
        >
            <p class="text-[6px] sp:text-[14px] font-bold lato leading-none" v-html="data.name ?? data.title" />
            <p v-if="typeService != 'ACTIVITY'" class="text-[6px] sp:text-[14px] lato leading-none truncate-2" v-html="data.description" />
            <div
                class="flex items-end justify-end pb-[4px] sp:pb-[8px]"
                :class="data.name_api === 'viator' ? 'justify-between' : 'justify-end'"
            >
                <img v-if="data.name_api === 'viator'" class="w-[30px] sp:w-[49px]" src="/assets/icons/TH.VIATOR.svg" alt="VIATOR">
                <div class="text-right">
                    <template v-if="showPriceFrom">
                        <p class="text-[5px] sp:text-[10px] font-medium lato leading-none">{{ $t('experience.card-experience.from') }}</p>
                        <p class="text-[9px] sp:text-[16px] font-medium lato leading-none">{{ price?.toFixed(2)?.replace('.', ',') }}€</p>
                    </template>
                    <template v-else-if="data.type_price == 1">
                        <p class="text-[9px] sp:text-[16px] font-medium lato leading-none">{{ price?.toFixed(2)?.replace('.', ',') }}€</p>
                    </template>
                    <template v-else="data.type_price == 3">
                        <p class="text-[9px] sp:text-[16px] font-medium lato leading-none">{{ $t('service.card-item.free') }}</p>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();

const props = defineProps({
    class: String,
    typeService: String,
    data: {
        type: Object,
        default: () => null,
    }
});
const  { typeService, data } = props;

const serviceStore = inject('serviceStore'); 
const experienceStore = inject('experienceStore');

const price = computed(() => {
    return data.from_price ?? data.price;
});

const showPriceFrom = computed(() => {
    return data?.type_price == 2 || (typeService === 'ACTIVITY' && data?.name_api == 'viator');
});

function goService () {
    let typeServiceSlug = typeService.toLowerCase();
    if (typeServiceSlug === 'activity' && data?.name_api == 'viator') {
        router.push({name: 'DetailActivity', params: { service: typeServiceSlug, slug: data.slug } });
        return;
    }
    if (typeServiceSlug === 'activity' && data?.name_api == 'thehoster') {
        router.push({name: 'DetailService', params: { service: typeServiceSlug, slug: data.slug } });
        return;
    }
    router.push({name: 'DetailService', params: { service: typeServiceSlug, slug: data.id } });
}

</script>

<style lang="scss">
    .card-list {
        border-radius: 10px;
        border: 1px solid #FFF;
        background: linear-gradient(214deg, #F3F3F3 19.98%, #FAFAFA 80.15%);
        box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.12), 0px 3px 1px 0px rgba(0, 0, 0, 0.04);
    }
</style>