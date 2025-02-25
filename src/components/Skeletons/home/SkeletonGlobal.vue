<template>
    <div class="animate-pulse">
        <div class="h-[98px] sp:h-[140px] w-full item-skeletom animate-pulse relative">
            <div class="absolute bottom-[-80px] sp:bottom-[-115px] px-4 w-full">
                <div class="p-[12px] sp:p-4 flex card-data space-x-[1.4px] sp:space-x-2 w-full">
                    <div class="flex-1">
                        <div class="item-skeletom h-[14px] sp:h-[20px] w-full mb-[8.4px] sp:mb-[12px]"></div>
                        <div class="item-skeletom h-[14px] sp:h-[20px] w-[70%] mb-[5.6px] sp:mb-[8px]"></div>
                        <div class="item-skeletom h-[14px] sp:h-[20px] w-[50%] mb-[5.6px] sp:mb-[8px]"></div>
                        <div class="flex space-x-[1.4px] sp:space-x-2 w-[40%]">
                            <div class="item-skeletom h-[14px] sp:h-[20px] w-[60%]"></div>
                            <div class="item-skeletom h-[14px] sp:h-[20px] flex-1"></div>
                        </div>
                    </div>
                    <div class="flex flex-col justify-end">
                        <div class="size-[28px] sp:size-[40px] item-skeletom rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-[105px] sp:mt-[150px] w-full pb-[70px] sp:pb-[100px]">
            <div class="ml-[12px] sp:ml-4 space-x-[12px] sp:space-x-4 flex overflow-hidden w-full">
                <template v-for="(item, index) in 2" :key="index">
                    <div class="min-w-[177px] sp:min-w-[253px]">
                        <div class="w-[81px] sp:w-[116px] h-[19px] sp:h-[28px] item-skeletom mb-[12px] sp:mb-4"></div>
                        <div class="h-[117px] sp:h-[168px] item-skeletom"></div>
                        <div class="p-[12px] sp:p-4">
                            <div class="h-[22px] sp:h-[32px] w-full item-skeletom"></div>
                        </div>
                    </div>
                </template>
            </div>

            <template v-for="item in 3">
                <div class="ml-[12px] sp:ml-4 space-x-[12px] sp:space-x-4 flex overflow-hidden w-full mt-[4.2px] sp:mt-6">
                    <template v-for="(item, index) in 2" :key="index">
                        <div class="min-w-[177px] sp:min-w-[253px]">
                            <div class="w-[81px] sp:w-[116px] h-[19px] sp:h-[28px] item-skeletom mb-[12px] sp:mb-4"></div>
                            <div class="h-[117px] sp:h-[168px] item-skeletom"></div>
                            <div class="p-[12px] sp:p-4 w-full">
                                <div class="w-full h-[14px] sp:h-[20px] item-skeletom mb-[5.6px] sp:mb-[8px]"></div>
                                <div class="w-[50%] h-[11px] sp:h-[16px] item-skeletom mb-[5.6px] sp:mb-[8px]"></div>
                                <div class="w-[50%] h-[11px] sp:h-[16px] item-skeletom mb-[5.6px] sp:mb-[8px]"></div>
                                <div class="w-[50%] h-[11px] sp:h-[16px] item-skeletom"></div>
                            </div>
                        </div>
                    </template>
                </div>
            </template>

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