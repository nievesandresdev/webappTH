<template>
    <div class="animate-pulse pb-[70px] sp:pb-[100px]">
        <div class="item-skeletom h-[235px] sp:h-[337px]  rounded-b-[20px]"></div>
        <div class="mt-[6px] sp:mt-[8px]">
            <div class="mx-2 sp:mx-4">
                <div class="item-skeletom w-[40%] h-[20px] sp:h-[28px]"></div>
                <div class="item-skeletom w-[70%] h-[12px] sp:h-[16px] mt-[6px] sp:mt-2"></div>
                <div class="mt-[8px] sp:mt-[12px] pb-[16px] sp:pb-[24px] border-b border-gray-300">
                        <div class="item-skeletom w-full h-[38px] sp:h-[55px]"></div>
                        <div class="item-skeletom w-[20%] h-[12px] sp:h-[16px] mt-[8px] sp:mt-[12px] ml-auto"></div>
                </div>
                <div class="mt-[16px] sp:mt-[24px] pb-[16px] sp:pb-[24px] border-b border-gray-300">
                    <div class="w-full h-[28px] sp:h-[40px] item-skeletom"></div>
                </div>
                <div class="mt-[16px] sp:mt-[24px] pb-[16px] sp:pb-[24px] border-b border-gray-30 flex justify-between">
                    <div class="item-skeletom w-[40%] h-[14px] sp:h-[20px]"></div>
                    <div class="item-skeletom w-[40%] h-[14px] sp:h-[20px]"></div>
                </div>
                <div class="mt-[16px] sp:mt-[24px] pb-[16px] sp:pb-[24px] border-b border-gray-30 flex justify-between">
                    <div class="item-skeletom w-[70%] h-[14px] sp:h-[20px]"></div>
                    <div class="item-skeletom w-[20%] h-[14px] sp:h-[20px]"></div>
                </div>
                <div class="mt-[16px] sp:mt-[24px] pb-[16px] sp:pb-[24px] border-b border-gray-30 flex justify-between">
                    <div class="item-skeletom w-[70%] h-[14px] sp:h-[20px]"></div>
                    <div class="item-skeletom w-[20%] h-[14px] sp:h-[20px]"></div>
                </div>
                <div class="mt-[16px] sp:mt-[24px] pb-[16px] sp:pb-[24px] border-b border-gray-30  flex justify-start">
                    <div class="item-skeletom w-[70%] h-[14px] sp:h-[20px]"></div>
                </div>
                <div class="mt-[16px] sp:mt-[24px] pb-[16px] sp:pb-[24px] border-b border-gray-30  flex justify-between">
                    <div class="item-skeletom w-[70%] h-[14px] sp:h-[20px]"></div>
                    <div class="item-skeletom w-[20%] h-[14px] sp:h-[20px]"></div>
                </div>
            </div>
            <div class="ml-[12px] sp:ml-4 space-x-[2.8px] sp:space-x-4 flex overflow-hidden w-full">
                <template v-for="(item, index) in 2" :key="index">
                    <div class="min-w-[177px] sp:min-w-[253px]">
                        <div class="w-[81px] sp:w-[116px] h-[19px] sp:h-[28px] item-skeletom mb-[11px] sp:mb-4"></div>
                        <div class="h-[117px] sp:h-[168px] item-skeletom"></div>
                        <div class="p-[11px] sp:p-4">
                            <div class="h-[22px] sp:h-[32px] w-full item-skeletom"></div>
                        </div>
                    </div>
                </template>
            </div>
            <div class="mt-[16px] sp:mt-[24px] mx-2 sp:mx-">
                <div class="item-skeletom w-[20%] h-[14px] sp:h-[20px] mb-3 sp:mb-4"></div>
                <div class="flex justify-around">
                    <template v-for="item in 4">
                        <div class="w-[33px] sp:w-[48px]">
                            <div class="item-skeletom w-[33px] sp:w-[48px] h-[33px] sp:h-[48px]  rounded-full mb-2"></div>
                            <div class="item-skeletom w-[33px] sp:w-[48px] h-[11px] sp:h-[16px]  rounded-full"></div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .card-data {
        border-radius: 20px;
        border: 2px solid #E9E9E9;
        background: #FAFAFA;
    }
</style>