<template>
        <div
            class="flex items-center inline-block px-4 py-[6px] rounded-[100px] max-w-max"
            :class="{'item-menu-cat-active': !active, 'hbg-gray-100 border hborder-black-100': active}"
            @click="changeValue"
        >
                <img
                    v-if="icon"
                    :src="`/assets/icons/${icon}.svg`"
                    class=" w-[20px] sp:w-auto mr-[4px] sp:mr-2 inline"
                />
                <span class="text-sm font-bold">{{ name }}</span>
        </div>
</template>

<script setup>

    import { ref, defineProps, defineEmits } from 'vue';

    const emits = defineEmits(['change']);

    const props = defineProps({
        active: {
            type: Boolean,
            default: false,
        },
        icon: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: '',
        },
        value: {
            type: String,
            default: '',
        },
    });

    function changeValue () {
        emits('change');
    }

</script>

<style lang="scss">
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