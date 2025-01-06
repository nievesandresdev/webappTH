<template>
    <div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[2000]" />
    <div class="">
        <div class="h-[190px] sp:h-[295px] w-full bg-black">
            <button class="fixed flex z-20 mt-3 ml-3">
                <div class="div-back h-[18px] w-[18px] sp:h-6 sp:w-6 bg-white rounded-full pt-1 pl-1">
                    <img class="w-2.5 sp:w-4" src="/assets/icons/arrow-back.svg">
                </div>
            </button>
        </div>
        <div class="px-4 mt-[16px] sp:mt-[24px]">
            <div class="mb-2.5 sp:mb-6">
                <h2 class="text-xs sp:text-base lg:text-[22px] font-medium mb-1.5 sp:mb-4">
                    Mi instalación
                </h2>
                <div class="justify">
                    <p class="text-[10px] sp:text-sm">
                        Añade una descripción de tu instalación
                    </p>
                </div>
            </div>
            <div class="flex justify-between items-center"> 
                <h2 class="text-xs sp:text-base lg:text-lg font-medium mb-1.5 sp:mb-4">
                    Horario
                </h2>
            </div>
            <div class="row">
                <div class="col-12 justify">
                    <p
                        class="text-[10px] sp:text-sm"
                    >
                        Añade el horario de tu instalación
                    </p>
                </div>
            </div>
        </div>
        
    </div>
</template>