<template>
    <div class="animate-pulse">
        <!-- Section Bar Skeleton -->
        <div class="w-full sp:h-[76px] top-0 left-0 px-2 sp:px-4 py-3.5 sp:py-6 z-[2000] flex items-center justify-between bg-head bg-gradient-100 fixed">
            <div class="flex items-center justify-center">
                <div class="sp:w-6 sp:h-6 w-4 h-4 sp:mr-2 mr-1 bg-border-secondary rounded-full"></div>
                <div class="h-5 w-[100px] bg-border-secondary rounded-[6px]"></div>
            </div>
        </div>

        <!-- Contenido del perfil -->
        <div class="px-2 sp:px-4 sp:my-[100px] my-[50px]">
            <!-- Avatar y nombre -->
            <div class="flex flex-col items-center mt-6">
                <div class="flex justify-center items-center rounded-full overflow-hidden bg-border-secondary"
                     style="width: 40px; height: 40px; min-width: 40px; min-height: 40px;">
                </div>
                <div class="h-5 w-[150px] bg-border-secondary rounded-[6px] mt-2"></div>
            </div>

            <!-- Tarjeta de estancia -->
            <div class="sp:mt-6 mt-2">
                <div class="h-[150px] w-full bg-border-secondary rounded-[10px]"></div>
            </div>

            <!-- Sección "Mis estancias" -->
            <div class="mt-4">
                <div class="h-[60px] w-full bg-border-secondary rounded-[10px]"></div>
            </div>

            <div class="w-full h-[1px] bg-[#E9E9E9] mt-4"></div>
            
            <!-- Secciones de menú -->
            <div v-for="i in 6" :key="i" class="flex items-center mt-6 gap-2">
                <div class="w-6 h-6 bg-border-secondary rounded-full"></div>
                <div class="h-4 w-[200px] bg-border-secondary rounded-[6px] mr-auto"></div>
                <div class="w-6 h-6 bg-border-secondary rounded-full"></div>
            </div>
        
            <!-- Cerrar sesión -->
            <div class="flex items-center justify-center mt-[40px] gap-2 cursor-pointer mb-10">
                <div class="h-4 w-[100px] bg-border-secondary rounded-[6px]"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
// No es necesario importar nada para este componente
</script>

<style scoped>
.bg-border-secondary {
    background-color: #E6E6E6;
}

.bg-head {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
}

/* Asegura que todos los elementos del skeleton se rendericen inmediatamente */
* {
    will-change: auto;
    backface-visibility: hidden;
}

/* Mejora la animación de pulso para que sea más suave */
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