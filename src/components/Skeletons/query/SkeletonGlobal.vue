<template>
    <div class="mt-4 sp:mt-6 mx-2 sp:mx-4">
        <div class="rounded-[20px] border-[2px] border-color-secondary p-4 hbg-gray-100">
            <div class="w-[204px] h-5 bg-border-secondary rounded-[10px]"></div>
            <div class="w-[277px] h-4 bg-border-secondary rounded-[10px] mt-3"></div>
            <div class="mt-4 flex items-center justify-around">
                <div 
                    v-for="item in 5" :key="item"
                >
                    <div class="bg-border-secondary rounded-full w-10 h-10"></div>
                    <div class="bg-border-secondary rounded-[4px] w-full h-3 mt-2"></div>
                </div>
            </div>
            <div class="mt-6 flex justify-end">
                <div class="w-[71px] h-10 rounded-[10px] bg-border-secondary"></div>
            </div>
        </div>
    </div>
</template>