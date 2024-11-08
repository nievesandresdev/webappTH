<template>
    <div class="relative w-full">
        <button
            v-if="searchFull"
            class="w-6 h-6 absolute left-3 top-[7.5px] z-10"
            @click="closeSearch"
        >
            <img
                src="/assets/icons/WA.ExitSearch.svg"
                alt="prepend inner icon"
            >
        </button>
        <img
            v-else
            src="/assets/icons/WA.search.svg"
            alt="prepend inner icon"
            class="absolute left-3 top-[7.5px] w-6 h-6 z-10"
        >
        <input
            v-model="valueSearch"
            type="text"
            :placeholder="$t('place.placeholder-search')"
            class="border-[#333] rounded-[100px] h-[40px] w-full pl-11 text-sm font-medium"
            :style="valueSearch ? 'border-width: 2px !important;' : 'border-width: 1px;'"
            @input="searchHnadle"
            @click="activateSearch('top')"
        >
        <div class="absolute right-[16px] top-[7.5px] z-10 flex space-x-2">
            <button
                v-if="searchFull"
                class="w-6 h-6"
                @click="cleanSearch"
            >
                <img
                    src="/assets/icons/WA.Close.svg"
                    alt="prepend inner icon"
                    class="w-full z-10"
                >
            </button>
            <button
               class="w-6 h-6"
            >
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
import { ref, defineEmits, computed, inject } from 'vue';

const emits = defineEmits(['search', 'cleanSearch', 'activateSearch']);

const valueSearch = ref('');
const debounce = ref(null);

const searchingActive = inject('searchingActive');

const searchFull = computed(() => {
    return !!valueSearch.value;
});

// FUNCTIONS
function closeSearch () {
    cleanSearch();
    activateSearch('medium');
}
function cleanSearch () {
    valueSearch.value = '';
    emits('cleanSearch');
    resetSearch(null);
}

function resetSearch ($event) {
    searchingActive.value = false;
    emits('search', null);
}
function searchHnadle ($event) {
    searchingActive.value = true;
    clearTimeout(debounce.value);
    debounce.value = setTimeout(async() => {
        emits('search', $event);
    }, 500);
}

function activateSearch (position) {
    emits('activateSearch', position);
}

</script>