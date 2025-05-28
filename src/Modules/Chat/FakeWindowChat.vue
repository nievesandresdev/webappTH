<template>
    
    <div ref="myDiv" 
        :class="[
            'flex flex-col hbg-gray-200 w-full h-screen']"
    >
        <AppHeader 
            title="Chat"
        />
        <!-- body chat -->
        <PageTransitionGlobal module="chat">
        </PageTransitionGlobal>
        <div v-if="!loading" class="body-chat flex-grow flex flex-col overflow-y-auto px-2 sp:px-4 no-scrollbar">
            <!-- availabilty tag-->
            <div 
                class="fixed top-[65px] sp:top-[142px] left-2 sp:left-4 bg-gradient-100 rounded-[7px] sp:rounded-[10px] p-1.5 sp:p-3 shadow-guest"
                @click="isScheduleModalOpen = true"
            >
                <div class="flex items-center gap-1 sp:gap-2 justify-center">
                    <p class="lato text-[10px] sp:text-sm font-bold underline leading-[16px]" :class="{'text-[#34A98F]':isAvailable,'text-[#F66]':!isAvailable}">
                        {{ isAvailable ? $t('chat.availabilty') : $t('chat.not-availabilty') }}
                    </p>
                    <IconCustomColor 
                        name="WA.Clock" 
                        :class="'mt-[1px]'"
                        :color="isAvailable ? '#34A98F' : '#F66'" 
                        only-change-background 
                        height="10"
                        width="10"
                    />
                </div>
            </div>
            <!-- info chat -->
            <div class="bg-gradient-100 border border-color-secondary rounded-[7px] sp:rounded-[10px] p-3 sp:p-4 mb-3 sp:mb-4 mt-[42px] sp:mt-[64px]">
                <p class="lato text-[10px] sp:text-sm font-medium leading-[12px] sp:leading-[16px] text-center" v-html="$t('chat.languages-text')">
                </p>
                <div class="flex flex-wrap justify-center mt-3 sp:mt-4 gap-2 sp:gap-4">
                    <img class="w-[14px] sp:w-5 h-[14px] sp:h-5" v-for="lg in settings?.languages" :key="lg" :src="'/assets/icons/languages/'+lg.abbreviation+'.svg'" alt="">
                </div>
            </div>
            <!-- msgs -->
            <div 
                v-for="msg in chatMessages" 
                :key="msg" 
                class="min-w-[104px] sp:min-w-[156px] max-w-[164px] sp:max-w-[246px] mb-[14px] sp:mb-5" 
                :class="{'ml-auto':msg.by == 'Guest','mr-auto':msg.by == 'Hoster'}"
            >
                <p 
                    v-if="msg.automatic"
                    class="lato text-[8px] sp:text-[10px] font-bold leading-[12px] mb-1"
                >
                    {{$t('chat.automatic-response')}}
                </p>
                <p 
                    class="break-words lato text-[10px] sp:text-sm font-medium leading-[12px] sp:leading-[16px] p-2.5 sp:p-4" 
                    :class="{'bg-msg-guest':msg.by == 'Guest','bg-msg-hoster':msg.by !== 'Guest'}"
                >
                    {{ msg.text }}
                </p>
                <p 
                    class="lato text-[8px] sp:text-xs font-medium leading-[12px] sp:leading-[16px] mt-1"
                    :class="{'text-right':msg.by == 'Guest'}"
                >
                {{ msg.date }} - {{ msg.hour }}
                </p>
            </div>
        </div>
        <!-- input chat -->
        <div class="bg-white rounded-t-[10px] shadow-guest-2">
            <div class="px-3 sp:px-6 pt-2 sp:pt-3 pb-3 sp:pb-4 flex items-center gap-1.5 sp:gap-3">
                <textarea  
                    id="text-auto" 
                    class="flex-grow border border-color-secondary rounded-[5px] sp:rounded-[8px] hbg-gray-100 px-2 sp:px-3 py-1.5 sp:py-2 text-[10px] sp:text-sm lato font-medium" 
                    :placeholder="$t('chat.input')"
                ></textarea>
                <div 
                    class="flex items-center justify-center rounded-full w-7 sp:w-10 h-7 sp:h-10 bg-[#333] shadow-guest border border-white" 
                    @click="sendMsg"
                    @touchend.prevent.stop="sendMsg"
                >
                    <img class="w-3 sp:w-4 h-3 sp:h-4" src="/assets/icons/paper-plane.svg">
                </div>
            </div>
            <div
                v-if="!hideAppMenu" 
                class="h-[55px] sp:h-[89px] bg-white"
            ></div>
        </div>

    </div>
    <ScheduleModal />

    <!-- evitar click mockup -->
    <div class="fixed top-0 left-0 h-[128px] w-screen z-[5200]"></div>
    <div class="fixed bottom-0 left-0 h-[128px] w-screen z-[5200]"></div>
    <div v-if="$route.query.showAvailability" class="fixed top-0 left-0 h-screen w-screen z-[6200]"></div>
</template>
        
<script setup>
    //import libraries
    import { onMounted, ref, toRefs, computed, provide } from 'vue';
    import Moment from 'moment'
    import InboxHead from '@/Modules/Queries/Components/InboxHead.vue'
    import ScheduleModal from './ScheduleModalRed.vue';
    import AppHeader from '@/layout/Components/AppHeader.vue';
    import IconCustomColor from '@/components/IconCustomColor.vue';

    import { useRoute } from 'vue-router'
    const route = useRoute();
    //load
    import PageTransitionGlobal from "@/components/PageTransitionGlobal.vue";
    import { SECTIONS } from "@/constants/sections.js";
    import { useLoadingSections } from "@/composables/useLoadingSections";
    const { startLoading, stopLoading, loading } = useLoadingSections();
    //
    import { useHotelStore } from '@/stores/modules/hotel';
    const hotelStore = useHotelStore()
    import { useChatStore } from '@/stores/modules/chat'
    const chatStore = useChatStore();

    //data
    const isAvailable = ref(false);
    const isScheduleModalOpen = ref(false);
    const chatMessages = ref([]);
    const settings = ref(null);

    startLoading(SECTIONS.CHAT.GLOBAL);
    //mounted
    onMounted(async () => {
        await hotelStore.$loadChatHours(); 
        await watchAvailability();
        settings.value = await chatStore.getAllSettings();
        setTimeout(scrollToBottom, 50);
        createMessages()
        isScheduleModalOpen.value = Boolean(route.query.showAvailability);
        stopLoading(SECTIONS.CHAT.GLOBAL);
    });

    const watchAvailability = () =>{
        const currentDay = Moment().format('dddd'); 
        const currentTime = Moment().format('HH:mm');
        const todaysAvailability = hotelStore?.chatHours.find(item => item.day.toUpperCase() == currentDay.toUpperCase());
        if (!todaysAvailability || !todaysAvailability.active) {
            return false;
        }
        
        isAvailable.value = todaysAvailability.horary.some(timeSlot => {
            const startMoment = Moment(timeSlot.start, 'HH:mm');
            const endMoment = Moment(timeSlot.end, 'HH:mm');
            const currentMoment = Moment(currentTime, 'HH:mm');
            return currentMoment.isBetween(startMoment, endMoment, null, '[]');
        });
    }

    const createMessages = () => {
        chatMessages.value =[
            {
                text: "Buenos días. La ducha ha dejado de echar agua caliente.",
                date: "14/08/23",
                hour: "14:55",
                by: "Guest",
                show: true,
            },
            {
                text: settings.value?.first_available_msg.es,
                date: "14/08/23",
                hour: "14:56",
                by: "Hoster",
                show: settings.value?.first_available_show,
            },
            {
                text: settings.value?.second_available_msg.es,
                date: "14/08/23",
                hour: "15:00",
                by: "Hoster",
                show: settings.value?.second_available_show,
            },
            {
                text: settings.value?.three_available_msg.es,
                date: "14/08/23",
                hour: "15:05",
                by: "Hoster",
                show: settings.value?.three_available_show,
            }
        ];
    }

    const scrollToBottom = () => {
        var chatContainer = document.querySelector('.body-chat');
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    provide('isScheduleModalOpen',isScheduleModalOpen)
</script>
    
<style scoped>
.height-chat-normal {
  /* height: calc(var(--vh, 1vh) * 100);  */
  height: calc(100vh - 158px); 
}
.height-chat-hideMenu {
  height: calc(var(--vh, 1vh) * 89); 
}

#text-auto {
    height: 28px; 
    min-height: 28px; 
    overflow-y: hidden;
    resize: none; 
}

#text-auto:focus {
    border-color: #333;
}

#text-auto::placeholder {
    color: rgba(51, 51, 51, 0.25);
}

.bg-msg-guest {
    border-radius: 10px 10px 0px 10px;
    border: 1px solid #E9E9E9;
    background: linear-gradient(105deg, #E4E4E4 0%, #FAFAFA 100%);
}

.bg-msg-hoster {
    border-radius: 10px 10px 10px 0px;
    border: 1px solid #fff;
    background: linear-gradient(105deg, #F3F3F3 0%, #FAFAFA 100%);
}





</style>
        