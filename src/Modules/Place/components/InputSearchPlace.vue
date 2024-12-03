<template>
    <div class="relative w-full">
        <button
            v-if="searchFull"
            class="w-3 sp:w-6 h-3 sp:h-6 absolute left-1.5 sp:left-3 top-[4px] sp:top-[7.5px] z-10"
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
            class="absolute left-1.5 sp:left-3 top-[9px] sp:top-[7.5px] w-2.5 sp:w-6 h-3 sp:h-6 z-10"
        >
        <input
            v-model="valueSearch"
            type="text"
            :placeholder="$t('place.placeholder-search')"
            class="border-[#333] rounded-[100px] h-[20px] sp:h-[40px] w-full pl-5 sp:pl-11 text-[8px] sp:text-sm font-medium"
            :style="valueSearch ? 'border-width: 2px !important;' : 'border-width: 1px;'"
            @input="searchHnadle"
            @click="activateSearch('top')"
        >
        <div class="absolute right-[8px] sp:right-[16px] top-[3px] sp:top-[7.5px] z-10 flex space-x-1 sp:space-x-2 flex items-center">
            <button
                v-if="searchFull"
                class="w-[12px] sp:w-6 h-[12px] sp:h-6"
                @click="cleanSearch"
            >
                <img
                    src="/assets/icons/WA.Close.svg"
                    alt="prepend inner icon"
                    class="w-full z-10"
                >
            </button>
            <div
                class="relative"
                @click="handleOpenFilter"
            >
                <IconCustomColor 
                    v-if="!emptyFilters"
                    class="w-[7px] sp:w-[14px] h-[7px] sp:h-[14px] z-[2000] absolute top-[4px] sp:top-[-1px] right-[-1px] sp:right-[-2px]"
                    name="WA.FILTER.DOT" 
                    :color="chainStore.$colorContrast1" 
                />
                <button
                    v-if="!loadingSearch"
                    class="w-[12px] sp:w-6 h-[12px] sp:h-6"
                >
                    <img
                        src="/assets/icons/WA.Filtros.svg"
                        alt="prepend inner icon"
                        class="w-full z-10"
                    >
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits, computed, inject } from 'vue';
import IconCustomColor from '@/components/IconCustomColor.vue';

const emits = defineEmits(['search', 'cleanSearch', 'activateSearch', 'openFilter']);

const props = defineProps({
    emptyFilters: {
        type: Number,
        default: 0,
    }
});

import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();

const valueSearch = ref('');
const debounce = ref(null);

const searchingActive = inject('searchingActive');
const loadingSearch = inject('loadingSearch');

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
    clearTimeout(debounce.value);
    debounce.value = setTimeout(async() => {
        emits('search', $event);
    }, 500);
}

function activateSearch (position) {
    emits('activateSearch', position);
}

function handleOpenFilter () {
    emits('openFilter');
}

</script>