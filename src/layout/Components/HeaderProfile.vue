<template>
    <div 
        class="w-full top-0 left-0 z-[2000] bg-head bg-gradient-100"
        :class="{'fixed':fixed,'sticky':!fixed,'rounded-b-[10px] border border-white':tabs}"
    >
        <div 
            class="sp:h-[76px] h-[36px] flex items-center justify-between px-4 p-3"
            :class="{'sp:py-6':!tabs, 'sp:pt-6 sp:pb-4':tabs}"
            tabs
        >
            <div class="flex items-center justify-center">
                <button @click="goBack" class="sp:w-6 sp:h-6 w-5 h-5 text-[#333333] mr-2">
                    <img src="/assets/icons/WA.chevron.svg" alt="Chevron Icon" />
                </button>
                <span class="sp:text-[20px] text-[13px] font-bold lato">{{ title }}</span>
            </div>
            
            <button
                v-if="showButton"
                @click="onClickButton"
                class="lato flex items-center h-10 px-4 py-2 gap-2 rounded-[10px] border border-white bg-[#333333] text-white text-sm font-bold hshadow-button"
            >
                {{ buttonText }}
            </button>
        </div>
        <!-- Subheader con tabs (pestañas) -->
        <div class="px-[12px] sp:px-[16px]">
            <div class="flex justify-around">
                <div
                    v-for="(tab, index) in tabsActives"
                    :key="index" class="tab space-y-[3px] sp:space-y-1 relative  w-[70px] sp:w-[100px]"
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
                            :height="innerWidth <= 300 ? '16' : '24'"
                            :width="innerWidth <= 300 ? '16' : '24'"
                        />
                        <span
                            class="text-[12px] sp:text-base font-bold leading-none lato"
                            :class="{'text-[#777]':!tab.isActive}"
                        >{{ $t(tab.title) }}</span>
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
    </div>
</template>

<script setup>
import { computed } from 'vue';
import IconCustomColor from '@/components/IconCustomColor.vue';
// import BaseBadge from '@/components/BaseBadge.vue';
//
import { useRouter } from 'vue-router';
const router = useRouter();
//
import { useHistoryStore } from '@/stores/modules/history';
const historyStore = useHistoryStore()

const innerWidth = window.innerWidth;

const props = defineProps({
    title: {
        type: String,
        default: 'Mi cuenta'
    },
    showButton: {
        type: Boolean,
        default: false
    },
    buttonText: {
        type: String,
        default: 'Crear estancia'
    },
    routeName: {
        type: String,
        default: null
    },
    viewNameBack: {
        type: String,
        default: null
    },
    tabs: {
      type: Array,
      default: null,
    },
    fixed: {
      type: Array,
      default: true,
    },
});

const tabsActives = computed(() => {
    return props.tabs.filter(item => !item.exclude);
});

const navigateTo = (routeName) => {
    router.push({ name: routeName });
};

const emit = defineEmits(['onClickButton'])


const goBack = () => {
    if(props.viewNameBack){
        router.push({ name:props.viewNameBack })
    }else{
        // window.history.back();
        historyStore.$goBack(router);
    }
};



const onClickButton = () => {
    emit('onClickButton')
    // if (props.routeName) {
    //     console.log(`Navigating to route: ${props.routeName}`);
    //     // router.push({ name: props.routeName });
    // } else {
    //     console.log("Route not specified");
    // }
};
</script>
<style scoped>
.bg-head{
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
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