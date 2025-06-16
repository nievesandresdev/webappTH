<template>
<div class="content h-full animate-pulse">
    <div class="flex mx-[12px] sp:mx-4">
        <div class="item-skeletom h-[23px] sp:h-[32px] w-[40%] mr-[12px] sp:mr-4"></div>
        <div class="item-skeletom h-[23px] sp:h-[32px] w-[40%] mr-[12px]"></div>
    </div>
    <div class="item-skeletom h-[12px] sp:h-[16px] w-[40%] mt-[23px] sp:mt-[48px] mb-[12px] sp:mb-4 mx-[12px] sp:mx-4"></div>
    <div class="item-skeletom h-[12px] sp:h-[16px] w-[30%] mt-[6px] sp:mt-[8px] mb-[12px] sp:mb-4 mx-[12px] sp:mx-4"></div>
    <div class="grid grid-flow-col auto-cols-max gap-[6px] sp:gap-[8px] overflow-x-hidden ml-[12px] sp:ml-4">
        <div
            v-for="item in 3"
            :key="item"
            class="item-skeletom h-[146px] sp:h-[209px] w-[112px] sp:w-[160px]"
        >
        </div>
    </div>
    <div class="item-skeletom h-[12px] sp:h-[16px] w-[40%] mx-[12px] sp:mx-4 mb-[12px] sp:mb-[16px] mt-[22px] sp:mt-[32px]"></div>
    <div class="space-y-[12px] sp:space-y-4 mx-[12px] sp:mx-4">
        <template v-for="item in 5">
            <SkeletonCard />
        </template>
    </div>
</div>
</template>