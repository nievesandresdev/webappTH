<template>
    <header
        id="header"
        class="custom-header"
        :class="{'fixed top-0 left-0 w-full': fixed}"
    >
        <div class="header-top pt-[10px] sp:pt-6 px-1 sp:px-4 pb-1.5 sp:pb-3">
            <h1
                v-if="withTitleRoute"
                class="text-[14px] sp:text-[20px] font-bold mb-[8px] sp:mb-[16px]"
            >
                {{ $t($route.meta.title) }}
            </h1>
            <div class="flex justify-between items-start w-full h-6 sp:h-10 space-x-1 sp:space-x-2">
                <!-- Sección izquierda: Buscador o título -->
                <div class="header-left flex-1">
                    <slot name="titleOrSearch">
                        <h1 class="lato text-[14px] sp:text-[20px] font-bold leading-[18px] first-letter:capitalize">{{ title }}</h1>
                    </slot>
                </div>

                <!-- Sección derecha: Avatar -->
                <div class="header-avatar">
                    <slot name="avatar">
                        <AvatarButton :size="innerWidth <= 300 ? 20 : 40"/>
                    </slot>
                </div>
            </div>
        </div>

        <!-- Subheader con tabs (pestañas) -->
        <div class="subheader" v-show="showSubHeader">
            <slot name="tabs">
                <div class="px-[8px] sp:px-[16px]">
                    <div class="flex justify-around">
                        <div
                            v-for="(tab, index) in tabs"
                            :key="index" class="tab space-y-[2px] sp:space-y-1 relative  w-[80px] sp:w-[100px]"
                            :class="{ active: tab.isActive }" @click="tab.onClick ? tab.onClick() : navigateTo(tab.routeName)"
                        >
                            <BaseBadge
                                size="medium"
                                :showBadge="!$utils.isMockup() && tab.notify"
                                classes="absolute top-[1px] right-[36px] border-[1.2px] rounded-full" 
                            />
                            <div class="flex flex-col items-center">
                                <IconCustomColor 
                                    class="" :name="tab.iconDefault" 
                                    :color="!tab.isActive ? '#777777' : null"
                                    :height="innerWidth <= 300 ? '12' : '24'"
                                    :width="innerWidth <= 300 ? '12' : '24'"
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
import AvatarButton from '@/components/Buttons/AvatarButton.vue';
import BaseBadge from '@/components/BaseBadge.vue';
import $utils from '@/utils/utils';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    withTitleRoute: {
      type: Boolean,
      default: false,
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
    showSubHeader: {
      type: Boolean,
      default: true,
    },
    redirectToShow: {
      type: Boolean,
      default: false,
    },
});

    const innerWidth = window.innerWidth;

import IconCustomColor from '@/components/IconCustomColor.vue';


const navigateTo = (routeName) => {
    router.push({ name: routeName });
};

</script>

<style lang="scss">
    .custom-header {
        border-radius: 0px 0px 10px 10px;
        border: 1px solid #FFF;
        background:  linear-gradient(105deg, #F3F3F3 0%, #FAFAFA 100%);
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
        z-index: 3000;
    }


    .tab-item__selected {
        width: 24px;
        height: 2px;
        flex-shrink: 0;
        border-radius: 5px 5px 0px 0px;
        background: #333333;
    }
    @media (min-width:300px) {
        .tab-item__selected {
            width: 48px;
            height: 4px;
        }
     }
</style>