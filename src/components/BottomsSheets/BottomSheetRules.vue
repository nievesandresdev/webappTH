<template>
    <BottomModal :isOpen="isOpen && !$utils.isMockup()" @update:isOpen="updateIsOpen($event)" :scrollContentOnly="scrollContentOnly">
        <template #header>
            <div class="flex items-center gap-1 lato">
                <img src="/assets/icons/WA.normas.svg" class="w-8 h-8 text-[#333333]" alt="Normas Icon" />
                <p class="text-[20px] font-bold text-[#333333] lato">{{ $t('home.policies.title') }}</p>
            </div>
            </template>
        <div v-for="policie in rules" :key="policie" class="p-4 gap-2 rounded-[10px] border border-[#E9E9E9] bg-gradient-h h-full space-y-4 mb-4">
            <div class="text-[#333333] text-sm">
            <p class="font-bold mb-2 lato text-[16px]">{{ policie.title }}</p>
            <p class="font-normal text-sm lato">{{ policie.description }}</p>
            <div class="border-t border-[#E9E9E9] my-2" v-show="policie.penalization == 1"></div>
            <p v-show="policie.penalization == 1">
                <span class="font-bold lato text-sm">{{ $t('home.policies.penalization') }}: </span>
                <span class="font-normal lato text-sm">{{ policie.penalization_details }}</span>
            </p>
            </div>
        </div>
    </BottomModal>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import BottomModal from '@/components/Modal/GeneralBottomSheet.vue';

import { useLegalStore } from '@/stores/modules/legal';
const legalStore = useLegalStore();
const rules = ref([]);
const emit = defineEmits(['update:isOpen', 'update:count'])

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    },
    scrollContentOnly: {
        type: Boolean,
        default: false
    }
})

onMounted(async () => {
    rules.value = await legalStore.$getNormsByHotel()
    emit('update:count', rules.value.length)
})

const updateIsOpen = (value) => {
    emit('update:isOpen', value)
}
</script>


