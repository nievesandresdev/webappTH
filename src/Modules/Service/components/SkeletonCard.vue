<template>
    <!-- <div
        class="skeleton-card card-list flex w-full" :class="class"
    >
        <div class="w-[45px] sp:w-[111px] rounded-[10px] relative overflow-hidden animate-pulse">
            <div class="w-full h-full item-skeletom"></div>
            <div
                class="absolute bottom-0 left-0 px-[2px] sp:px-[4px] pb-[4px] sp:pb-[8px] z-20 w-full"
            >
                <div class="rounded-full px-[2px] sp:px-[4px] py-[1px] sp:py-[2px] flex space-x-[1px] sp:space-x-1 bg-white flex items-center">
                    <div class="size-[6px] sp:size-[12px] item-skeletom"></div>
                    <div class="h-[4px] sp:h-[10px] w-[120px] item-skeletom"></div>
                </div>
            </div>
        </div>
        <div class="p-[4px] sp:p-[8px] flex flex-col flex-1">
            <div class="flex items-center space-x-[4px] space-x-2 mb-[4px] sp:mb-2">
                <div class="size-[8px] sp:size-4 item-skeletom"></div>
                <div class="h-[8px] sp:h-4 item-skeletom w-[25px] sp:w-[50px]"></div>
            </div>
            <p class="h-[6px] sp:h-[14px] item-skeletom w-[200px] item-skeletom" />
            <div
                class="flex items-center justify-between pb-[4px] sp:pb-[8px] mt-[9px] sp:mt-[16px]"
            >
                <div class="flex flex-col space-y-1 sp:space-y-2">
                    <div class="flex items-center space-x-0.5 sp:space-x-1">
                        <div class="size-[6px] sp:size-[12px] item-skeletom"></div>
                        <span class="h-[5px] sp:h-[10px] w-[40px] item-skeletom"></span>
                    </div>
                    <p class="h-[10px] w-[50px] item-skeletom"></p>
                </div>
                <div class="flex flex-col items-ringht">
                    <p class="h-[5px] sp:h-[10px] w-[20px] item-skeletom" ></p>
                    <p class="h-[9px] sp:h-[16px] w-[30px] item-skeletom"></p>
                </div>
            </div>
        </div>
    </div> -->
    <div
        class="skeleton-card card-list flex w-full" :class="class"
    >
        <div class="w-[77.7px] sp:w-[111px] rounded-[7px] sp:rounded-[10px] relative overflow-hidden animate-pulse">
            <div class="w-full h-full item-skeletom"></div>
        </div>
        <div class="p-[5.6px] sp:p-[8px] flex flex-col flex-1 space-y-[11.2px] sp:space-y-[16px]">
            <div class="h-[11.2px] sp:h-[16px] w-full item-skeletom"></div>
            <div class="h-[22.4px] sp:h-[32px] w-full item-skeletom"></div>
            <div class="h-[14px] sp:h-[20px] w-[20%] item-skeletom ml-auto"></div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    class: {
        type: String,
        default: null
    }
});

</script>

<style lang="scss">
    .card-list {
        border-radius: 10px;
        border: 2px solid #E6E6E6 ;
        background: linear-gradient(214deg, #F3F3F3 19.98%, #FAFAFA 80.15%);
    }
</style> 