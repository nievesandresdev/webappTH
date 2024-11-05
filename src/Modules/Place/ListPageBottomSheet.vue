<template>
    <BaseBottomSheet
        :open="true"
        class-container="h-[58px]"
        :position-bottom="classControlsSheet"
    >
    <!-- 28 -->
    <!-- h-[58%] -->
        <div class="px-4 pt-[12px] h-full">
            <div
                class="w-full flex justify-center mb-6"
                @click="minBottomSheet"
            >
                <img
                    src="/assets/icons/WA.ITEM.BOTTOM.SHEET.HANDLER.svg"
                    class="w-[48px] h-[4px]"
                    alt=""
                >
            </div>
            <div class="space-y-4 h-full flex flex-col">
                <ListPageBottomSheetCategory @changeCategory="changeCategoryHandle($event)" />
                <p class="text-sm font-bold">0000 lugares encontrados</p>
                <ListPageBottomSheeList />
            </div>
        </div>
    </BaseBottomSheet>
</template>

<script setup>
    import { ref } from 'vue';

    import BaseBottomSheet from '@/components/Modal/BaseBottomSheet.vue';
    import ListPageBottomSheetCategory from './ListPageBottomSheetCategory.vue';
    import ListPageBottomSheeList from './ListPageBottomSheeList.vue';

    const emits = defineEmits(['changeCategory']);

    const classControlsSheet = ref('0px');

    function changeCategoryHandle (payload) {
         emits('changeCategory', payload);
    }

    function minBottomSheet () {
        classControlsSheet.value = classControlsSheet.value == '0px' ? '-275px' : '0px';
    }
</script>