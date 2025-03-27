<template>
    <div
        class="card-list flex w-full cursor-pointer"
        :class="class"
        @click="goService"
    >
        <div class="w-[55px] sp:w-[111px] rounded-[10px] relative overflow-hidden">
            <img
                class="object-cover size-full"
                 :src="serviceStore.$loadImage(data?.images?.[0] ?? data?.image)"
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
            <p class="text-[6px] sp:text-[14px] font-bold lato leading-none" v-html="data?.name ?? data?.title" />
            <p v-if="typeService != 'ACTIVITY'" class="text-[6px] sp:text-[14px] lato leading-none truncate-2" v-html="data?.translation_current?.description ?? data?.description" />
            <div
                class="flex items-end justify-end pb-[4px] sp:pb-[8px]"
                :class="data?.name_api === 'viator' ? 'justify-between' : 'justify-end'"
            >
                <img v-if="data?.name_api === 'viator'" class="w-[30px] sp:w-[49px]" src="/assets/icons/TH.VIATOR.svg" alt="VIATOR">
                <div class="text-right">
                    <template v-if="serviceStore.calPrice(data)?.isFree">
                        {{ $t('service.card-item.free') }}
                    </template>
                    <template v-else>
                        <span v-if="serviceStore.calPrice(data)?.isFrom" class="text-[7px] sp:text-[10px] lato leading-none font-bold block">
                            {{ $t('experience.card-experience.from') }}
                        </span>
                        <span>
                            {{ serviceStore.calPrice(data)?.price }}
                        </span>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, computed, defineEmits } from 'vue';

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const emits = defineEmits(['navigate']);

const props = defineProps({
    class: String,
    typeService: String,
    data: {
        type: Object,
        default: () => null,
    },
    isSubservice: {
        type: Boolean,
        default: false,
    },
});
const  { typeService, data, isSubservice } = props;

const serviceStore = inject('serviceStore'); 
const experienceStore = inject('experienceStore');

function goService () {
    if (isSubservice) {
        emits('navigate');
        return;
    }
    let typeServiceSlug = typeService?.toLowerCase();
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