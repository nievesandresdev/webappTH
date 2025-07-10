<template>
    <div class="animate-pulse px-4 py-6">
        <!-- Línea superior -->
        <div class="h-4 w-full bg-border-secondary rounded-[4px] mb-6"></div>
        
        <div v-for="card in 2" :key="card" class="mb-6">
            <!-- Imagen del hotel -->
            <div class="w-full h-[200px] bg-border-secondary rounded-t-[20px]"></div>
            
            <!-- Información del hotel -->
            <div class="p-4 border-[2px] border-color-secondary border-t-0 rounded-b-[20px] bg-white">
                <div class="h-4 w-[180px] bg-border-secondary rounded-[4px] mb-2"></div>
                <div class="h-3 w-[120px] bg-border-secondary rounded-[4px] mb-2"></div>
                <div class="h-3 w-[200px] bg-border-secondary rounded-[4px] mb-2"></div>
                <div class="h-3 w-[160px] bg-border-secondary rounded-[4px]"></div>
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