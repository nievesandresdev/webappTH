<template>
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