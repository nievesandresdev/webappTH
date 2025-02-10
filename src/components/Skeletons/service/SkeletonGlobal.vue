<template>
    <div class="px-[12px] sp:px-[16px] mt-[24px] sp:mt-[24px] animate-pulse">
        <div class="item-skeletom w-[80%] h-[16px] mb-[16px]"></div>
        <div class="space-y-[16px]">
            <template v-for="item in 5">
                <SkeletonCard />
            </template>
        </div>
    </div>
</template>

<script setup>

import SkeletonCard from "@/Modules/Service/components/SkeletonCard";

</script>