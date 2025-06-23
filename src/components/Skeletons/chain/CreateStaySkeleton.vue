<template>
    <div class="animate-pulse px-4 py-6">
        <div class="border-[2px] border-color-secondary rounded-[20px] mb-6">
            <!-- Imagen del hotel -->
            <div class="w-full h-[200px] rounded-t-[20px] bg-border-secondary"></div>
            
            <!-- Información del hotel -->
            <div class="p-4 rounded-b-[20px] bg-white">
                <div class="h-4 w-[160px] bg-border-secondary rounded-[4px] mb-2"></div>
                <div class="h-3 w-[100px] bg-border-secondary rounded-[4px] mb-2"></div>
                <div class="h-3 w-[200px] bg-border-secondary rounded-[4px] mb-2"></div>
                <div class="h-3 w-[140px] bg-border-secondary rounded-[4px]"></div>
            </div>
        </div>

        <div class="space-y-6">
            <!-- Label del formulario -->
            <div class="h-4 w-[120px] bg-border-secondary rounded-[4px]"></div>
            
            <!-- Campo de input 1 -->
            <div class="h-12 w-full bg-border-secondary rounded-[10px]"></div>
            
            <!-- Campo de input 2 -->
            <div class="h-12 w-full bg-border-secondary rounded-[10px]"></div>
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