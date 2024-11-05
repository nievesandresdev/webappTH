<template>
    <div
        class="grid grid-flow-col auto-cols-max py-[8px] sp:py-4 z-40 overflow-x-auto space-x-[8px] sp:space-x-4 bg-white w-full"
    >
        <div
            v-for="(item, index) in categoriplaces" :key="index"
            class="flex items-center  px-4 py-[6px] rounded-[100px]"
            :class="{'item-menu-cat-active': item.id != formFilter.categoriplace,'hbg-gray-100 hborder-black-100':(item.id == formFilter.categoriplace)}"
            @click="changeCategory(item.id, formFilter.typeplace)"
        >
                <img :src="`/assets/icons/${item.icon}.svg`" class=" w-[20px] sp:w-auto mr-[4px] sp:mr-2 inline" />
                <span class="text-sm font-bold">{{ item.name }}</span>
        </div>
    </div>
</template>

<script setup>
import { inject, defineEmits } from 'vue';

const emits = defineEmits(['changeCategory']);

const categoriplaces = inject('categoriplaces');
const formFilter = inject('formFilter');

// FUNCTION

function changeCategory (idCategory = null, idTypePlace = null) {
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