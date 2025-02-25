<template>
    <div class="skeleton-place-card card-list">
        <div class="animate-pulse flex w-full">
            <div class="w-[77px] sp:w-[111px] h-[67px] sp:h-[96px] rounded-t-[7px] sp:rounded-t-[10px] rounded-b-none relative item-skeletom">
            </div>
            <div class="p-[5.6px] sp:p-[8px] flex flex-col flex-1">
                <div class="w-[50%] h-[2.8px] sp:h-4 item-skeletom mb-[4px] sp:mb-2"></div>
                <div class="w-full h-[13px] sp:h-[32px] item-skeletom mb-[4.2px] sp:mb-[6px]"></div>
                <div class="flex items-center justify-between">
                    <div class="h-[8.4px] sp:h-[12px] w-[20%] item-skeletom"></div>
                    <div class="size-[14px] sp:size-[20px] item-skeletom rounded-[2.8px] sp:rounded-[4px]"></div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    .card-list {
        border-radius: 10px;
        border: 2px solid #E6E6E6 ;
        background: linear-gradient(214deg, #F3F3F3 19.98%, #FAFAFA 80.15%);
    }
</style>