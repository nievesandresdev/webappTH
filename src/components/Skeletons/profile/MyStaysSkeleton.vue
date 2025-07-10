<template>
    <div class="animate-pulse px-3 pb-10 pt-[100px]">

        <div class="flex flex-col p-4 gap-2 w-full rounded-[20px] border border-color-secondary bg-gradient-to-r from-[#F3F3F3] to-[#FAFAFA] relative">
            <!-- Línea larga arriba -->
            <div class="h-4 w-full bg-border-secondary rounded-[4px] mb-3"></div>
            
            <!-- Información de la estancia -->
            <div class="flex">
                <div class="flex-1">
                    <!-- Línea mediana -->
                    <div class="h-4 w-[200px] bg-border-secondary rounded-[4px] mb-2"></div>
                    
                    <!-- Línea corta -->
                    <div class="h-4 w-[160px] bg-border-secondary rounded-[4px]"></div>
                </div>
            </div>
        </div>

        <div class="flex flex-col p-4 gap-2 w-full rounded-[20px] border border-color-secondary bg-gradient-to-r from-[#F3F3F3] to-[#FAFAFA] relative mt-6">
            <!-- Línea larga arriba -->
            <div class="h-4 w-full bg-border-secondary rounded-[4px] mb-3"></div>
            
            <!-- Información de la estancia -->
            <div class="flex">
                <div class="flex-1">
                    <!-- Línea mediana -->
                    <div class="h-4 w-[180px] bg-border-secondary rounded-[4px] mb-2"></div>
                    
                    <!-- Línea corta -->
                    <div class="h-4 w-[140px] bg-border-secondary rounded-[4px]"></div>
                </div>
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