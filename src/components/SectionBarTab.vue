<template>
    <div 
        class="w-full flex flex-col items-start gap-3 pt-6 px-4  rounded-b-xl border border-white bg-gradient shadow-custom fixed top-0 left-0 z-[30001]"
        :class="{
            'pb-0': hotel?.show_facilities == 1 && hotel?.show_profile == 1,
            'pb-4': hotel?.show_facilities == 0 || hotel?.show_profile == 0
        }"
    >
        <!-- Navbar -->
        <div class="w-full flex items-center justify-between">
            <span class="text-[20px] font-bold lato">{{ title }}</span>
            

            <!-- <div 
                @click="goToProfile"
                class="flex items-center gap-2 p-2 rounded-full border border-white bg-gray-800 shadow-icon cursor-pointer"
            >
                <img src="/assets/icons/WA.user-white.svg" alt="User Icon" class="h-6 w-6 text-white" />
            </div> -->
            <div class="header-avatar">
                <slot name="avatar">
                    <AvatarButton size="40"/>
                </slot>
            </div>
            
        </div>

        <!-- Tabs Section -->
        <div class="w-full flex justify-around bg-transparent mt-3" v-show=" hotel?.show_facilities == 1 && hotel?.show_profile == 1">
            <div 
                v-for="(tab, index) in tabs" 
                :key="index"
                class="flex flex-col items-center cursor-pointer group"
                @click="navigateTo(tab.routeName)"
                :class="isActiveTab(tab.routeName) ? 'opacity-100' : 'opacity-50'"
            >
                <img 
                    :src="tab.icon" 
                    alt="Tab Icon" 
                    class="h-6 w-6"
                />

                <span class="text-[16px] font-bold lato">
                    {{ tab.name }}
                </span>
                
                <div 
                    v-if="isActiveTab(tab.routeName)" 
                    class="w-12 h-1 rounded-t-md bg-[#333333]"
                ></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import AvatarButton from '@/components/Buttons/AvatarButton.vue';
import { useGuestStore } from '@/stores/modules/guest'
const guestStore = useGuestStore();

const router = useRouter();
const route = useRoute();

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    tabs: {
        type: Array,
        required: true,
        default: () => []
    },
    showTabs: {
        type: Boolean,
        default: true
    },
    hotel: {
        type: Object,
    }
});


const navigateTo = (routeName) => {
    router.push({ name: routeName });
};

const isActiveTab = (routeName) => {
    return route.name === routeName;
};

const goToProfile = () => {
    router.push({ name: 'Profile' });
};
</script>

<style scoped>
.bg-gradient {
    background: linear-gradient(105deg, #F3F3F3 0%, #FAFAFA 100%);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
}

.shadow-icon {
    box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.12), 0px 3px 1px 0px rgba(0, 0, 0, 0.04);
}
</style>
