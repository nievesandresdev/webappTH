<template>
    <div
        class="grid grid-flow-col auto-cols-max pb-[8px] sp:pb-4 z-40 overflow-x-scroll gap-[8px] sp:gap-4 w-full no-scrollbar"
    >
        <div
            v-for="(item, index) in categoriplaces" :key="index"
            class="flex items-center  px-[8px] sp:px-4 py-[3px] sp:py-[6px] rounded-[100px] first:ml-4 last:mr-4"
            :class="{ 'item-menu-cat-active': !formFilter.categoriplace?.includes(String(item.id)), 'hbg-gray-100 hborder-black-100': formFilter.categoriplace?.includes(String(item.id)) }"
            @click="changeCategory(item.id, formFilter.typeplace)"
        >
                <img :src="`/assets/icons/${item.icon}.svg`" class=" w-[10px] sp:w-[20px] sp:w-auto mr-[4px] sp:mr-2 inline" />
                <span class="text-[8px] sp:text-sm font-bold">{{ item.translation_current }}</span>
        </div>
    </div>
</template>

<script setup>
import { inject, defineEmits } from 'vue';

const emits = defineEmits(['changeCategory']);

const categoriplaces = inject('categoriplaces');
const formFilter = inject('formFilter');

// FUNCTION

// function changeCategory (idCategory = null, idTypePlace = null) {
//     if (formFilter.categoriplace) {
//         idCategory = null;
//     }
//     emits('changeCategory', {idCategory, idTypePlace});
// }

function changeCategory (idCategory = [], idTypePlace = null) {
    // if (formFilter.categoriplace) {
    //     idCategory = null;
    // }
    idCategory = String(idCategory);
    emits('changeCategory', {idCategory, idTypePlace});
}


</script>

<style lang="scss" scoped>
    .item-menu-cat {
        align-items: center;
    }
    
    .item-menu-cat-active {
        border: 1px solid #FFF;
        background: linear-gradient(105deg, #F3F3F3 0%, #FAFAFA 100%);

        /* shadow-small */
        box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.12), 0px 3px 1px 0px rgba(0, 0, 0, 0.04);
    }
</style>