<template>
    <div class="relative w-full">
        <img
            v-if="search"
            src="/assets/icons/WA.ExitSearch.svg"
            alt="prepend inner icon"
            class="absolute left-3 top-[7.5px] w-6 h-6 z-10"
        >
        <img
            v-else
            src="/assets/icons/WA.search.svg"
            alt="prepend inner icon"
            class="absolute left-3 top-[7.5px] w-6 h-6 z-10"
        >
        <input
            type="text"
            class="border hborder-black-100 rounded-[100px] h-[40px] w-full pl-11 text-sm font-medium"
        >
        <div class="absolute right-[16px] top-[7.5px] z-10 flex space-x-2">
            <button class="w-6 h-6">
                <img
                    src="/assets/icons/WA.Close.svg"
                    alt="prepend inner icon"
                    class="w-full z-10"
                >
            </button>
            <button class="w-6 h-6">
                <img
                    src="/assets/icons/WA.Filtros.svg"
                    alt="prepend inner icon"
                    class="w-full z-10"
                >
            </button>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const search = ref('d');

</script>