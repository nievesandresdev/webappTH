<template>
    <div class="md:w-[650px] md:mx-auto">
        <div class="mt-4 sp:mt-6 mx-2 sp:mx-4">
            <div class="rounded-[20px] border-[2px] border-color-secondary p-4 hbg-gray-100">
                <div class="w-[204px] h-5 md:h-6 bg-border-secondary rounded-[10px]"></div>
                <div class="w-[277px] h-4 md:h-6 bg-border-secondary rounded-[10px] mt-3"></div>
                <div class="mt-4 md:mt-8 flex items-center justify-around">
                    <div 
                        v-for="item in 5" :key="item"
                    >
                        <div class="bg-border-secondary rounded-full w-10 h-10 md:w-[64px] md:h-[64px]"></div>
                        <div class="bg-border-secondary rounded-[4px] w-full h-3 mt-2"></div>
                    </div>
                </div>
                <div class="mt-6 md:mt-10 flex justify-end">
                    <div class="w-[71px] md:w-[100px] h-10 md:h-12 rounded-[10px] bg-border-secondary"></div>
                </div>
            </div>
        </div>
    </div>
</template>