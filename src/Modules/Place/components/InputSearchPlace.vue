<template>
    <div class="relative w-full">
        <button
            v-if="searchFull || isFocused"
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
            id="input-search-place"
            type="text"
            :placeholder="$t('place.placeholder-search')"
            class="border-[#333] rounded-[100px] h-[20px] sp:h-[40px] w-full pl-5 sp:pl-11 text-[8px] sp:text-sm font-medium focus:border-[2px]"
            :class="valueSearch ? 'border-[2px]' : 'border-[1px]'"
            @input="searchHnadle"
            @focus="isFocused = true"
            @blur="isFocused = false"
            @click="activateSearch('top')"
        >
        <div class="absolute right-[8px] sp:right-[16px] top-[3px] sp:top-[7px] z-10 flex space-x-1 sp:space-x-2 flex items-center">
            <button
                v-if="searchFull"
                class="size-[12px] sp:size-6 mb-[1px] sp:mb-[2px]"
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
                <!-- <IconCustomColor 
                    v-if="!emptyFilters"
                    class="w-[7px] sp:w-[14px] h-[7px] sp:h-[14px] z-[2000] absolute top-[4px] sp:top-[-1px] right-[-1px] sp:right-[-2px]"
                    name="WA.FILTER.DOT" 
                    :color="chainStore.$colorContrast1" 
                /> -->
                <BaseBadge
                    :showBadge="!emptyFilters"
                    size="medium"
                    :bg-color="chainStore.$bgColor1"
                    :border-color="chainStore.$colorContrast1"
                >
                    <button
                        class="size-[12px] sp:size-6"
                    >
                        <img
                            src="/assets/icons/WA.Filtros.svg"
                            alt="prepend inner icon"
                            class="w-full z-10"
                        >
                    </button>
                </BaseBadge>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits, computed, inject, watch } from 'vue';
import IconCustomColor from '@/components/IconCustomColor.vue';
import BaseBadge from '@/components/BaseBadge.vue';

const emits = defineEmits(['search', 'cleanSearch', 'activateSearch', 'openFilter']);

const props = defineProps({
    emptyFilters: {
        type: Number,
        default: 0,
    },
    value: {
        type: String, 
    }
});

import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();

const valueSearch = ref('');
const debounce = ref(null);
const isFocused = ref(false);

const searchingActive = inject('searchingActive');
const loadingSearch = inject('loadingSearch');
const formFilter = inject('formFilter');

const searchFull = computed(() => {
    return !!valueSearch.value;
});

watch(() => formFilter.search, function(valNew, valOld) {
    if (!valNew || valOld) return;
    valueSearch.value = valNew;
});

// FUNCTIONS
function closeSearch () {
    cleanSearch();
    activateSearch('medium');
}
function cleanSearch () {
    valueSearch.value = '';
    emits('cleanSearch');
    resetSearch('');
    focusInputSearch();
}

function focusInputSearch () {
    const input = document.getElementById("input-search-place");
    if (input) {
        input.focus();
    }
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