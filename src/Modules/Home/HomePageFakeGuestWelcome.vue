<template>
        <div
            class="absolute left-0 bottom-0 sp:bottom-4 md:bottom-0 w-full lg:pb-[40px] flex justify-center"
        >
            <div class="container-fluid-landing">
                <!-- content card -->
                <div class="w-full lg:w-[453px] rounded-xl p-2 sp:p-4 z-[10000]" style="background: rgba(206, 206, 206, 0.10); backdrop-filter: blur(40px)">
                    <!-- welcome to the guest -->
                    <p class="text-xs sp:text-sm font-semibold truncate text-white leading-110">
                        {{ $t('home.title-welcome') }} Huesped
                    </p>
                    <!-- settings button -->
                    <div class="flex items-center mt-2 sp:mt-4">
                        <p class="text-sm sp:text-base font-semibold text-white leading-110">
                            {{ $t('home.stayTitle') }}
                        </p>
                        <img class="w-4 sp:w-6 h-4 sp:h-6 ml-auto" src="/assets/icons/1.TH.SETTINGS.SHAPE.svg" alt="">
                    </div>
                    <!-- date stay and room -->
                    <div class="flex items-center mt-0.5 sp:mt-2 justify-between">
                        <div class="">
                            <div class="inline-block">
                                <h4 class="text-xs sp:text-sm font-medium leading-110 text-white">{{ $moment().format('DD/MM') }}</h4>
                                <h5 class="text-[10px] sp:text-xs font-medium leading-90 text-white mt-1">10:00</h5>
                            </div>
                            <div class="inline-block ml-4">
                                <h4 class="text-xs sp:text-sm font-medium leading-110 text-white">{{ $moment().add(2, 'days').format('DD/MM') }}</h4>
                                <h5 class="text-[10px] sp:text-xs font-medium leading-90 text-white mt-1">20:00</h5>
                            </div>
                        </div>
                        <div class="text-right">
                            <h5 class="text-[10px] sp:text-xs font-medium leading-90 text-white">{{ $t('home.hab') }}</h5>
                            <h4 class="text-xs sp:text-sm font-medium leading-110 text-white mt-1">208</h4>
                        </div>
                    </div>
                    <div class="flex mt-0.5 sp:mt-2 items-center">
                        <p class="text-xs sp:text-sm font-semibold text-white">
                            {{ $t('home.guestTitle')}} 
                            2 / 3
                        </p>
                        <button 
                            class="hbtn-cta text-xs sp:text-sm font-medium py-1.5 sp:py-3 w-[60px] sp:w-[104px] text-center ml-auto leading-3"
                        >
                            {{ $t('home.invite')}}
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