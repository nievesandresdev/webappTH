<template>
    <div class="h-[190px] sp:h-[337px] w-full item-skeletom rounded-none relative">
        <button
        class="inline-flex items-center gap-2 p-1 absolute top-2 left-2 z-10 rounded-lg border border-white bg-gradient-to-r from-gray-200 to-gray-100 shadow-md cursor-pointer"
        @click="goBack"
        >
            <img src="/assets/icons/WA.chevron.svg" alt="Back Icon" />
        </button>
    </div>
    <div class="px-[16px]">
        <div class="pt-[16px] pb-[16px] border-b border-gray-300">
            <div class="item-skeletom w-full h-[28px] mb-[8px]" />
            <div class="item-skeletom w-full h-[54px] mb-[12px]" />
            <div class="item-skeletom w-[10%] h-[16px] ml-auto" />
        </div>
        <div class="item-skeletom w-full h-[361px] mt-[24px]" />
    </div>
</template>