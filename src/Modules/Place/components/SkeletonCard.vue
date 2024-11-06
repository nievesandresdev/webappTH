<template>
    <div class="skeleton-place-card flex w-full animate-pulse">
        <div class="w-[111px] h-[96px] rounded-[10px] relative item-skeletom">
        </div>
        <div class="p-[8px] flex flex-col flex-1">
            <div class="flex-1 truncate-2">
                <div class="flex items-center space-x-2 mb-2">
                    <div class="w-4 h-4 item-skeletom"></div>
                    <div class="h-4 w-[20px] item-skeletom"></div>
                    <div class="h-4 w-[20px] item-skeletom"></div>
                </div>
                <div class="h-[14px] w-[100px] item-skeletom"></div>
            </div>
            <div
                class="flex items-center justify-between"
            >
                <div
                    class="flex items-center space-x-[2px]"
                >
                    <div class="h-[12px] w-[12px] item-skeletom"></div>
                    <div class="h-[10px] w-[12px] item-skeletom"></div>
                </div>
                <div class="h-6 w-6 item-skeletom"></div>
            </div>
        </div>
    </div>
</template>