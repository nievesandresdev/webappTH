<template>
    <div class="animate-pulse">
        <!-- Section Bar Skeleton -->
       <!--  <div class="w-full sp:h-[76px] top-0 left-0 px-2 sp:px-4 py-3.5 sp:py-6 z-[2000] flex items-center justify-between bg-head bg-gradient-100 fixed">
            <div class="flex items-center justify-center">
                <div class="sp:w-6 sp:h-6 w-4 h-4 sp:mr-2 mr-1 bg-border-secondary rounded-full"></div>
                <div class="h-5 w-[100px] bg-border-secondary rounded-[6px]"></div>
            </div>
        </div> -->

        <div class="px-2 sp:px-4 sp:my-[100px] my-[50px]">
            <!-- Avatar y nombre -->
            <div class="flex flex-col items-center mt-6">
                <div class="flex justify-center items-center rounded-full overflow-hidden bg-border-secondary"
                     style="width: 40px; height: 40px; min-width: 40px; min-height: 40px;">
                </div>
                <div class="h-5 w-[150px] bg-border-secondary rounded-[6px] mt-2"></div>
            </div>


            <div class="sp:mt-6 mt-2">
                <div class="flex flex-col p-4 gap-2 w-full rounded-[20px] border border-color-secondary bg-gradient-to-r from-[#F3F3F3] to-[#FAFAFA] relative ">
                    <!-- Nombre del hotel -->
                    <div class="h-4 w-full bg-border-secondary rounded-[4px] mb-3"></div>
                    
                    <!-- Información de la estancia -->
                    <div class="flex">
                        <div class="flex-1">
                            <!-- Línea mediana 1 -->
                            <div class="h-4 w-[180px] bg-border-secondary rounded-[4px] mb-2"></div>
                            
                            <!-- Línea mediana 2 -->
                            <div class="h-4 w-[160px] bg-border-secondary rounded-[4px] mb-2"></div>
                            
                            <!-- Dos líneas pequeñas -->
                            <div class="flex space-x-4">
                                <div class="h-4 w-[80px] bg-border-secondary rounded-[4px]"></div>
                                <div class="h-4 w-[60px] bg-border-secondary rounded-[4px]"></div>
                            </div>
                        </div>
                        
                        <!-- Círculo derecha -->
                        <div class="ml-4 mt-auto">
                            <div class="w-10 h-10 bg-border-secondary rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!--"Mis estancias" -->
            <div class="mt-4">
                <div class="flex items-center p-4 w-full rounded-[10px] border border-color-secondary bg-gradient-to-r from-[#F3F3F3] to-[#FAFAFA]">
                    <div class="w-4 h-4 bg-border-secondary rounded-full mr-3"></div>
                    <div class="flex-1">
                        <div class="h-4 w-[160px] bg-border-secondary rounded-[4px] mb-1"></div>
                        <div class="h-3 w-[200px] bg-border-secondary rounded-[4px]"></div>
                    </div>
                    <div class="w-4 h-4 bg-border-secondary rounded-full"></div>
                </div>
            </div>

            <div class="w-full h-[1px] bg-[#E9E9E9] mt-4"></div>
            
            <!-- Secciones de menú -->
            <div v-for="i in 5" :key="i" class="flex items-center mt-6 px-2">
                <div class="w-4 h-4 bg-border-secondary rounded-full mr-3"></div>
                <div class="flex-1">
                    <div class="h-4 w-[180px] bg-border-secondary rounded-[4px] mb-1"></div>
                    <div class="h-3 w-[220px] bg-border-secondary rounded-[4px]"></div>
                </div>
                <div class="w-4 h-4 bg-border-secondary rounded-full"></div>
            </div>
        
            <!-- Cerrar sesión -->
            <div class="flex items-center justify-center mt-[40px] gap-2 cursor-pointer mb-10">
                <div class="h-4 w-[120px] bg-border-secondary rounded-[4px]"></div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.bg-border-secondary {
    background-color: #E6E6E6;
}

.border-color-secondary {
    border-color: #E6E6E6;
}

.bg-head {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
}

.shadow-guest {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
}

/* Asegura que todos los elementos del skeleton se rendericen inmediatamente */
* {
    will-change: auto;
    backface-visibility: hidden;
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.7;
    }
}
</style> 