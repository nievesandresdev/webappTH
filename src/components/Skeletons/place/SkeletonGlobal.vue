<template>
    <div class="relative h-full ">
        <div class="bg-[#E6E6E6] fixed top-0 left-0  w-full h-full"></div>
        <!-- 68% -->
        <div class="bg-white h-[58%] bottom-sheet relative pt-[6px] sp:pt-[12px]">
            <div
                class="flex justify-center py-[6px] sp:py-[12px] w-full absolute top-0 left-0"
            >
                <div
                class="handlebar"
                />
            </div>
            <div class="h-full">
                <div class="content pt-[12px] sp:pt-[24px] h-full animate-pulse">
                    <div class="flex mx-[12px] sp:mx-4">
                        <div class="item-skeletom h-[23px] sp:h-[32px] w-[40%] mr-[12px] sp:mr-4"></div>
                        <div class="item-skeletom h-[23px] sp:h-[32px] w-[40%] mr-[12px]"></div>
                    </div>
                    <div class="item-skeletom h-[12px] sp:h-[16px] w-[40%] mt-[23px] sp:mt-[48px] mb-[12px] sp:mb-4 mx-[12px] sp:mx-4"></div>
                    <div class="item-skeletom h-[12px] sp:h-[16px] w-[30%] mt-[6px] sp:mt-[8px] mb-[12px] sp:mb-4 mx-[12px] sp:mx-4"></div>
                    <div class="grid grid-flow-col auto-cols-max gap-[6px] sp:gap-[8px] overflow-x-hidden ml-[12px] sp:ml-4">
                        <div
                            v-for="item in 3"
                            :key="item"
                            class="item-skeletom h-[146px] sp:h-[209px] w-[112px] sp:w-[160px]"
                        >
                        </div>
                    </div>
                    <div class="item-skeletom h-[12px] sp:h-[16px] w-[40%] mx-[12px] sp:mx-4 mb-[12px] sp:mb-[16px] mt-[22px] sp:mt-[32px]"></div>
                    <div class="space-y-[12px] sp:space-y-4 mx-[12px] sp:mx-4">
                        <template v-for="item in 5">
                            <SkeletonCard />
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { watch } from 'vue';

import SkeletonCard from "@/Modules/Place/components/SkeletonCard";

</script>

<style lang="scss">
.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: height 0.3s ease-in-out;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: linear-gradient(93deg, #F3F3F3 0%, #FAFAFA 100%);
  border: 1px solid #FFF;
}

.handlebar {
  width: 24px;
  height: 2px;
  background-color: #777777;
  border-radius: 10px;
  cursor: grab;
}
</style>