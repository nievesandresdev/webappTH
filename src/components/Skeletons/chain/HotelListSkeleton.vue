<template>
    <div>
        <div class="h-[16px] w-full bg-border-secondary animate-pulse rounded-[4px]"></div>
        <div class="h-[16px] w-[191px] bg-border-secondary animate-pulse rounded-[4px] mt-1"></div>
        <div class="h-[16px] w-[171px] bg-border-secondary animate-pulse rounded-[4px] mt-4"></div>
        <!-- card -->
         <div class="mt-4" v-for="card in 3" :key="card">
            <div class="w-full h-[226px] rounded-t-[20px] bg-border-secondary animate-pulse"></div>
            <div class="p-4 border-[2px] border-color-secondary rounded-b-[20px]">
                <div class="h-[16px] w-[147px] bg-border-secondary animate-pulse rounded-[4px]"></div>
                <div class="h-[16px] w-[91px] mt-3 bg-border-secondary animate-pulse rounded-[4px]"></div>
                <div class="h-[16px] w-[191px] mt-2 bg-border-secondary animate-pulse rounded-[4px]"></div>
                <div class="h-[16px] w-[123px] mt-2 bg-border-secondary animate-pulse rounded-[4px]"></div>
            </div>
         </div>
    </div>
</template>