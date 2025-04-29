<template>
    <div class="min-h-[68.6vh] mt-4 px-4">
        <div v-if="$route.name == 'PersonalInfo'" class="flex items-center gap-2 mb-4">
            <!-- Círculo para la foto-->
            <div
                class="border border-color-secondary bg-border-secondary animate-pulse rounded-full"
                style="width: 40px; height: 40px;"
            ></div>
            <span class="h-4 w-[120px] bg-border-secondary animate-pulse rounded-[6px]"></span>
        </div>
        <div class="flex flex-col w-full gap-4">
            <div v-for="item in numberInput" :key="item">
                <div class="h-4 w-[80px] bg-border-secondary animate-pulse rounded-[6px] mb-1"></div>
                <div class="h-10 w-full bg-border-secondary animate-pulse rounded-[10px]"></div>
            </div>

        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const numberInput = computed(() => {
    if (route.name == 'PersonalInfo') return 10;
    if (route.name == 'UbicationData') return 4;
    if (route.name == 'ContactData') return 2;
    return 0;
});
</script>
