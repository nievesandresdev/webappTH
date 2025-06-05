<template >
    <BottomModal :isOpen="(isOpen && !$utils.isMockup()) || showWifiModal" @update:isOpen="updateIsOpen($event)" :scrollContentOnly="scrollContentOnly">
        <!-- Encabezado fijo -->
        <template #header>
            <div class="flex items-center gap-1 lato">
            <img src="/assets/icons/WA.wifi.svg" class="w-4 sp:w-8 h-4 sp:h-8 text-[#333333]" alt="WiFi Icon" />
            <p class="text-base sp:text-[20px] font-bold text-[#333333] lato">{{ $t('home.wifi.title') }}</p>
            </div>
        </template>

        <!-- Contenido scrolleable -->
        <div 
            v-for="data in getDataWifi" :key="data.id" 
            v-show="data.visible == 1" 
            class="flex-1 p-2 sp:p-4 gap-1 sp:gap-2 rounded-[6px] sp:rounded-[10px] border border-[#E9E9E9] bg-gradient-h h-full mb-2 sp:mb-4"
        >
            <p class="text-[16px] text-[#333333] flex flex-col gap-1 sp:gap-2">
            <div class="flex">
                <span class="font-bold lato text-[10px] sp:text-[14px]">{{ $t('home.wifi.red') }}</span>
                <span class="font-normal lato text-[10px] sp:text-[14px] ml-1"> {{ data?.name ?? '' }}</span>
            </div>
            <hr>
            <div class="flex">
                <span class="font-bold lato text-[10px] sp:text-[14px]">{{ $t('home.wifi.password') }}: </span>
                <div class="flex justify-between w-full" v-if="data?.password">
                <span class="font-normal lato text-[10px] sp:text-[14px] ml-1" > {{ data?.password }}</span>
                <div class="flex gap-1 sp:gap-2 items-center cursor-pointer justify-end w-1/2" @click="copyText(data?.password)">
                    <img src="/assets/icons/WA.copy.svg" class="h-4 w-5" alt="Copy Icon" />
                </div>
                </div>
                <span class="font-normal lato text-[10px] sp:text-[14px] italic ml-1" v-else-if="data?.name?.trim()">  {{ $t('home.wifi.noPassword') }}</span>
            </div>
            </p>
        </div>
    </BottomModal>
</template>
<script setup>
import BottomModal from '@/components/Modal/GeneralBottomSheet.vue';
import { ref, computed, onMounted } from 'vue';
import { getUrlParam } from '@/utils/utils.js';
//
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore()
import { handleToast } from '@/composables/useToast';
const { toastSuccess } = handleToast();
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const emit = defineEmits(['update:isOpen','update:count'])

const dataWifi = ref([])

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
    const r = await hotelStore.$getAllWifiByHotelAndVisible()
    dataWifi.value = r.data
    emit('update:count', dataWifi.value.length)
})

const showWifiModal = computed(() => {
  return Boolean(getUrlParam('showWifiModal'))
});

const wifiIdMockup = computed(() => {
  return Number(getUrlParam('wifiIdMockup'))
});

const getDataWifi = computed(() => {
  let newWifi = [{name:'',password:'',visible:true,id:0}]
  // let oneWifi = dataWifi.value.filter(item=> item.id == wifiIdMockup.value)
  return showWifiModal.value && wifiIdMockup.value == 0 ? newWifi : dataWifi.value;
});

const updateIsOpen = (value) => {
    emit('update:isOpen', value)
}

const copyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toastSuccess(t('messageRequest.copiedClipboard'));
    }).catch(err => {
      console.error("Error al copiar el texto: ", err);
    });
  };
</script>