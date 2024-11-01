<template>
    <header class="custom-header">
        <div class="header-top flex pt-6 px-4 pb-[12px] justify-between">
            <!-- Sección izquierda: Buscador o título -->
            <div class="header-left">
                <slot name="titleOrSearch">
                <h1 class="text-[20px] font-bold mt-2">{{ title }}</h1>
                </slot>
            </div>

            <!-- Sección derecha: Avatar -->
            <div class="header-avatar">
                <slot name="avatar">
                    <IconCustomColor name="TH.WA.AVATAR.BUTTON" color="#FA0000" only-change-background />
                </slot>
            </div>
        </div>

        <!-- Subheader con tabs (pestañas) -->
        <div class="subheader">
            <slot name="tabs">
                <div class="px-[16px]">
                    <div class="flex justify-around">
                        <div
                            v-for="(tab, index) in tabs"
                            :key="index" class="tab space-y-1"
                            :class="{ active: tab.isActive }" @click="tab.onClick"
                        >
                            <div class="flex flex-col items-center">
                                <IconCustomColor class="w-[24px] h-[24px]" :name="tab.iconDefault" />
                                <span class="text-base font-bold leading-none lato">{{ tab.title }}</span>
                            </div>
                            <div
                                class="flex justify-center"
                                v-show="tab.routeNameIncludes.includes($route.name)"
                            >
                                <div class="tab-item__selected" />
                            </div>
                        </div>
                    </div>
                </div>
            </slot>
        </div>
    </header>
</template>

<script setup>
import { onMounted, reactive, computed, defineProps } from 'vue';

const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    // avatarSrc: {
    //   type: String,
    //   default: '/path/to/default-avatar.png', // Ruta predeterminada para el avatar
    // },
    tabs: {
      type: Array,
      default: () => [],
    },
});

import IconCustomColor from '@/components/IconCustomColor.vue';

</script>

<style lang="scss">
    .custom-header {
        border-radius: 0px 0px 10px 10px;
        border: 1px solid var(--Border-invert, #FFF);
        background: var(--surface-bg-gradient, linear-gradient(105deg, #F3F3F3 0%, #FAFAFA 100%));
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
    }
    .tab-item__selected {
        width: 48px;
        height: 4px;
        flex-shrink: 0;
        border-radius: 5px 5px 0px 0px;
        background: #333333;
    }
</style>