<template>
    <div class="absolute left-0 bottom-0 sp:bottom-4 md:bottom-0 w-full lg:pb-[40px] flex justify-center">
            <div class="container-fluid-landing">
                <div class="w-full lg:w-[453px] rounded-xl p-3 sp:p-4 z-[10000]" style="backdrop-filter: blur(40px)">
                    <div
                        class="flex justify-between mb-3 sp:mb-4"
                    >
                        <div class="w-[90px] sp:w-[184px] lg:w-[309px]">
                            <h2 class="text-[12px] sp:text-[22px] text-white text-medium mb-3 sp:mb-4">
                                Bienvenido
                            </h2>
                            <h2 class="truncate-1 text-[12px] sp:text-[22px] text-white text-medium">
                                Huesped
                            </h2>
                        </div>
                        <div class="flex">
                            <div class="text-center mr-3 sp:mr-4">
                                <h4 class="text-white text-xs sp:text-base font-medium">{{ $moment().format('DD/MM') }}</h4>
                                <h6 class="text-white text-[8px] sp:text-xs font-medium">10:00</h6>
                            </div>
                            <div class="text-center">
                                <h4 class="text-white text-xs sp:text-base font-medium">{{$moment().add(2, 'days').format('DD/MM')}}</h4>
                                <h6 class="text-white text-[8px] sp:text-xs font-medium">22:00</h6>
                            </div>
                        </div>
                    </div>
                    <div
                        class="flex items-end w-full justify-between"
                        :class="{'no-hover':$utils.isMockup()}"
                    >
                        <div
                            class="text-start"
                        >
                            <h4 class="text-white text-[6px] sp:text-[10px] lg:text-xs font-semibold">HAB</h4>
                            <h6 class="text-white text-lg sp:text-[22px] font-medium">10</h6>
                        </div>
                        <button
                            :disabled="$utils.isMockup()"
                            :class="{'hcursor-mobile':$utils.isMockup()}"
                            class="hbtn-blur p-2 rounded-md font-medium text-[10px] sp:text-sm text-white underline"
                        >
                            Más información
                        </button>
                    </div>
                </div>
            </div>
        </div>
</template>
<script setup>
    //import libraries
    import { onMounted, ref, reactive, inject, computed } from 'vue';
    const $moment = inject('$moment')
</script>