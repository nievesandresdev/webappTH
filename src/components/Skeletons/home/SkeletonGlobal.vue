<template>
    <div class="animate-pulse">
        <div class="h-[140px] sp:h-[265px] w-full item-skeletom animate-pulse relative">
            <div class="absolute bottom-[-115px] px-4 w-full">
                <div class="p-4 flex card-data space-x-2 w-full">
                    <div class="flex-1">
                        <div class="item-skeletom h-[20px] w-full mb-[12px]"></div>
                        <div class="item-skeletom h-[20px] w-[70%] mb-[8px]"></div>
                        <div class="item-skeletom h-[20px] w-[50%] mb-[8px]"></div>
                        <div class="flex space-x-2 w-[40%]">
                            <div class="item-skeletom h-[20px] w-[60%]"></div>
                            <div class="item-skeletom h-[20px] flex-1"></div>
                        </div>
                    </div>
                    <div class=" flex flex-col justify-end">
                        <div class="size-[40px] item-skeletom rounded-full"></div>
                    </div>
                </div>
            </div>

        </div>
        <div class="mt-[150px] w-full">
            <div class="ml-4 space-x-4 flex overflow-hidden w-full">
                <template v-for="(item, index) in 2" :key="index">
                    <div class="min-w-[253px]">
                        <div class="w-[116px] h-[28px] item-skeletom mb-4"></div>
                        <div class="h-[168px] item-skeletom"></div>
                        <div class="p-4">
                            <div class="h-[32px] w-full item-skeletom"></div>
                        </div>
                    </div>
                </template>
            </div>

            <div class="ml-4 space-x-4 flex overflow-hidden w-full mt-6">
                <template v-for="(item, index) in 2" :key="index">
                    <div class="min-w-[253px]">
                        <div class="w-[40%] h-[28px] item-skeletom mb-4"></div>
                        <div class="w-[40%]h-[168px] item-skeletom"></div>
                        <div class="w-[40%]h-[168px] item-skeletom"></div>
                        <div class="w-[40%]h-[168px] item-skeletom"></div>
                    </div>
                </template>
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