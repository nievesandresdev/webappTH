<template>
    <!-- <div class="h-[190px] sp:h-[337px] w-full item-skeletom rounded-none relative">
        <button
        class="inline-flex items-center gap-2 p-1 absolute top-2 left-2 z-10 rounded-lg border border-white bg-gradient-to-r from-gray-200 to-gray-100 shadow-md cursor-pointer"
        @click="goBack"
        >
            <img src="/assets/icons/WA.chevron.svg" alt="Back Icon" />
        </button>
    </div> -->
    <div class="px-[16px]">
        <div class="pt-[16px] pb-[16px] border-b border-gray-300">
            <div class="item-skeletom w-full h-[40px] mb-[8px]" />
            <div class="item-skeletom w-full h-[28px] w-[68px] mb-[16px] mr-auto" />
            <div class="item-skeletom w-[10%] h-[54px] w-full" />
        </div>
        <div class="p-4 rounded-[10px] border-[--Border-secondary] bg-gray-100 space-y-[12px]">
            <div class="h-[20px] w-full item-skeletom"></div>
            <div class="h-[54px] w-full item-skeletom"></div>
            <div class="h-[16px] w-[50px] item-skeletom ml-auto"></div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

function goBack() {
    router.back();
}
</script>