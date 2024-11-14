<template>
    <header
        class="custom-header"
        :class="{'fixed top-0 left-0 w-full': fixed}"
    >
        <div class="header-top pt-[10px] sp:pt-6 px-[1] sp:px-2 pb-1.5 sp:pb-3">
            <div class="flex justify-between items-center w-full h-6 sp:h-10">
                <!-- Sección izquierda: Buscador o título -->
                <div class="header-left flex-1">
                    <slot name="titleOrSearch">
                        <h1 class="text-[12px] sp:text-[20px] font-bold">{{ title }}</h1>
                    </slot>
                </div>

                <!-- Sección derecha: Avatar -->
                <div class="header-avatar">
                    <slot name="avatar">
                        <IconCustomColor 
                            name="TH.WA.AVATAR.BUTTON" 
                            :color="chainStore.customizationData?.colors?.[0]?.cod_hex" 
                            only-change-background 
                            :height="windowWidth >= 250 ? '40' : '20'"
                            :width="windowWidth >= 250 ? '40' : '20'"
                        />
                    </slot>
                </div>
            </div>
        </div>

        <!-- Subheader con tabs (pestañas) -->
        <div class="subheader">
            <slot name="tabs">
                <div class="px-[8px] sp:px-[16px]">
                    <div class="flex justify-around">
                        <div
                            v-for="(tab, index) in tabs"
                            :key="index" class="tab space-y-[2px] sp:space-y-1"
                            :class="{ active: tab.isActive }" @click="tab.onClick"
                        >
                            <div class="flex flex-col items-center">
                                <IconCustomColor 
                                    class="h-[12px] sp:w-[24px] h-[12px] sp:h-[24px]" :name="tab.iconDefault" 
                                    :color="!tab.isActive ? '#777777' : null"
                                    :height="windowWidth >= 250 ? '24' : '12'"
                                    :width="windowWidth >= 250 ? '24' : '12'"
                                />
                                <span 
                                    class="text-[10px] sp:text-base font-bold leading-none lato"
                                    :class="{'text-[#777]':!tab.isActive}"
                                >{{ tab.title }}</span>
                            </div>
                            <div
                                class="flex justify-center"
                                v-show="tab.isActive"
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

import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();

const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    fixed: {
      type: Boolean,
      default: false,
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

    const windowWidth = window.innerWidth;

import IconCustomColor from '@/components/IconCustomColor.vue';

</script>

<style lang="scss">
    .custom-header {
        border-radius: 0px 0px 10px 10px;
        border: 1px solid var(--Border-invert, #FFF);
        background: var(--surface-bg-gradient, linear-gradient(105deg, #F3F3F3 0%, #FAFAFA 100%));
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
        z-index: 2000;
    }

    .tab-item__selected {
        width: 24px;
        height: 2px;
        flex-shrink: 0;
        border-radius: 5px 5px 0px 0px;
        background: #333333;
    }
    @media (min-width:300) {
        .tab-item__selected {
            width: 48px;
            height: 4px;
        }
     }
</style>