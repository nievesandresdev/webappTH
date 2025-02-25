<template>
    <div 
      class="flex flex-col p-4 gap-2 w-full rounded-[20px] border border-color-secondary bg-gradient-to-r from-[#F3F3F3] to-[#FAFAFA] relative shadow-guest"
      :style="{ borderColor: colorBorder }"
      :class="{' hshadow-button' : shadowContainer}"
      @click="handleStayClick()"
    >
        <!-- Skeleton Loader -->
        <template v-if="isLoading">
            <div class="animate-pulse">
                <div class="bg-gray-300 h-6 w-3/4 rounded mb-3"></div>
                <div class="flex gap-2 items-center mb-2">
                    <div class="bg-gray-300 h-4 w-5 rounded"></div>
                    <div class="bg-gray-300 h-4 w-1/2 rounded"></div>
                </div>
                <div class="flex gap-2 items-center">
                    <div class="bg-gray-300 h-4 w-1/4 rounded"></div>
                    <div class="bg-gray-300 h-4 w-1/4 rounded"></div>
                    <div class="bg-gray-300 h-4 w-1/4 rounded"></div>
                </div>
            </div>
        </template>

        <!-- Datos Reales -->
        <template v-else>
            <div>
                <div class="flex justify-between">
                    <!-- Nombre del hotel -->
                    <p class="text-base font-bold lato leading-[20px] text-[#333333]">{{ hotelName ? stay.hotel_name : hotel?.name }}</p>
                    <!-- Badge "Activo" -->
                    <span v-if="isActive" class="flex h-[20px] px-2 py-1 justify-center items-center gap-[4px] rounded-[18px] border border-white bg-[#34A98F]">
                        <span class="text-[12px] font-bold text-white roboto uppercase tracking-[0.6px]">{{ $t('stay.edit.active') }}</span>
                    </span>
                </div>
                <div class="flex mt-3">
                    <div>
                        <div class="flex items-center text-[14px] font-bold text-[#333333]">
                            <img src="/assets/icons/WA.pointer.svg" class="w-4 h-4 mr-1" alt="Location Icon" />
                            <span class="lato text-sm font-bold leading-[16px]">{{ hotelName ? stay.hotel_zone : hotel?.zone ?? '-'}}</span>
                        </div>
                        <div class="flex items-center mt-2">
                            <img src="/assets/icons/WA.calendar.svg" class="w-4 h-4 mr-1" alt="Calendar Icon" />
                            <span class="lato text-sm font-bold leading-[16px]">{{ formattedDates }}</span>
                        </div>
                        <div class="flex items-center text-[14px] font-bold text-[#333333] space-x-2 mt-2">
                            <div class="flex items-center">
                                <img src="/assets/icons/WA.bed.svg" class="w-4 h-4 mr-1" alt="Bed Icon" />
                                <span class="lato text-sm font-bold leading-[16px]">{{ stay?.room ?? '-' }}</span>
                            </div>
                            <div class="flex items-center">
                                <img src="/assets/icons/WA.huespedes.svg" class="w-4 h-4 mr-1" alt="Guests Icon" />
                                <span class="lato text-sm font-bold leading-[16px]">{{ stay?.number_guests }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-auto flex gap-4 ml-auto">
                        <RoundedButton
                            id="open-query-modal"
                            v-if="showQueryButton && (period == 'in-stay' || period == 'post-stay')"
                            @click="queryModalisOpen = true"
                            iconUrl="/assets/icons/WA.STAR.BLACK.svg"
                            sizeIcons="w-6 h-6"
                            @closeModal="queryModalisOpen = false"
                        />
                        <RoundedButton
                            v-if="showButtonShared" @click.stop="isModalOpen()"
                            id="open-shared-stay-modal"
                            iconUrl="/assets/icons/arrow-up-from-bracket.svg"
                            sizeIcons="w-6 h-6"
                        />
                    </div>
                </div>
            </div>
        </template>
    </div>
    <QueryModal 
        v-if="period"
        :period="period"
        :settings="settings"
    />
</template>

<script setup>
import { computed, defineEmits, onMounted, ref, provide  } from 'vue';
import RoundedButton from '@/components/Buttons/RoundedButton.vue';
import QueryModal from './QueryModal.vue';
//
import { useQueryStore } from '@/stores/modules/query';
const queryStore = useQueryStore();
import { useStayStore } from '@/stores/modules/stay';
const stayStore = useStayStore();
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore();
import { useQuerySettingsStore } from '@/stores/modules/querySettings';
const querySettingsStore = useQuerySettingsStore();

import { useShare } from "@/composables/useShare";
const { shareContent } = useShare();

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const emit = defineEmits(['sharedStay', 'stayClick']);

const props = defineProps({
    guest: Object,
    hotel: Object,
    stay: Object,
    colorBorder: {
        type: String,
        default: false
    },
    showButtonShared: {
        type: Boolean,
        default: false
    },
    shadowContainer: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isLoading: {
        type: Boolean,
        default: true 
    },
    hotelName  : {
        type: Boolean,
        default: false
    },
    showQueryButton  : {
        type: Boolean,
        default: false
    }
});

const period = ref(null);
const settings = ref([]);
const currentQuery = ref(null);
const queryModalisOpen = ref(false);
//
const EditId = ref(null);
const EditPeriod = ref(null);
const EditComment = ref(null);
const EditQualification = ref(null);
const shareUrl = ref(null);

provide('EditId',EditId);
provide('EditPeriod',EditPeriod);
provide('EditComment',EditComment);
provide('EditQualification',EditQualification);
provide('queryModalisOpen',queryModalisOpen);

onMounted(async () => {
    // solo se carga cuando se vaya a mostrar la query en modal
    if(props.showQueryButton){
        let params = {
            stayId : localStorage.getItem('stayId')
        }
        period.value = await queryStore.$getCurrentPeriod(params);
        await getQuerySettings();
        if(period.value){
            await getCurrentQuery();
            if(currentQuery.value.answered){
                EditPeriod.value = currentQuery.value.period;
                EditComment.value = currentQuery.value.comment ? currentQuery.value.comment[currentQuery.value.response_lang] : '';
                EditQualification.value = currentQuery.value.qualification;
                EditId.value = currentQuery.value.id;
            }
        }
    }
    shareUrl.value = await hotelStore.$buildUrlWebApp(hotelStore.hotelData?.subdomain,null,`e=${stayStore.stayData?.id}&guestPerStay=true`);
})

async function getQuerySettings(){
    settings.value = await querySettingsStore.$getAll();
    // console.log('test settings.value',settings.value)
}

async function getCurrentQuery(){
    let params = {
        stayId : localStorage.getItem('stayId'),
        guestId : localStorage.getItem('guestId'),
        period : period.value,
    }
    currentQuery.value = await queryStore.$visited(params);
    // console.log('test currentQuery',currentQuery.value)
}

const formattedDates = computed(() => {
    const checkInDate = formatDate(props.stay?.check_in);
    const checkOutDate = formatDate(props.stay?.check_out);
    return `${checkInDate} - ${checkOutDate}`;
});

const formatDate = (dateString) => {
    const utcDate = new Date(dateString + 'T00:00:00Z');
    const options = { day: '2-digit', month: 'short', timeZone: 'Europe/Madrid' };
    return utcDate.toLocaleDateString('es-ES', options).replace(/\s+/g, ' ');
};



const isModalOpen = () => {
    let data = {
        title: t('stay.share.title', { hotel: hotelStore.hotelData.name }),
        text: t('stay.share.text'),
        url: shareUrl.value,
    }
    shareContent(data);
};

function handleStayClick() {
    const data = {
        hotel_name: props.hotelName ? props.stay?.hotel_name : props.hotel?.name,
        hotel_name: props.hotelName ? props.stay?.hotel_name : props.hotel?.name,
        hotelSubdomain: props.stay?.hotel_subdomain,
        hotelId: props.stay?.hotel_id,
        zone:  props.hotelName ? props.stay?.hotel_zone : props.hotel?.zone ,
        stayId: props.stay?.stayId,
        check_in: props.stay?.check_in,
        check_out: props.stay?.check_out,
        room: props.stay?.room ?? '-',
        guests: props.stay?.number_guests ?? '-',
        formatted_dates: formattedDates.value,
    };
    emit('stayClick', data);
}
provide('period',period)
provide('currentQuery',currentQuery)
</script>

<style scoped>
.animate-pulse .bg-gray-300 {
    background-color: #e0e0e0; /* Color para el skeleton */
}
</style>
