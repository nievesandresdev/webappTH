<template>
    <ScheduleModal  ref="scheduleModal"/>
    <div ref="myDiv" 
        class="relative flex flex-col hbg-gray-200 height-chat"
    >
    <!-- :class="{
            'height-chat' : showMenuMobile,
            'height-chat-open-keyboard': !showMenuMobile
        }" -->
        <!-- header -->
        <div class="sticky top-0 left-0 py-4 text-center shadow-hoster hbg-white-100">
            <img 
                @click="goBack"
                class="absolute top-8 left-4" src="/assets/icons/1.TH.BACK.svg" alt="BACK icon"
            >
            <img @click="closeChat" class="absolute hidden w-6 h-6 cursor-pointer top-4 left-4 lg:block" src="/assets/icons/back-arrow-on-circle.svg">
            <h1 class="text-base font-medium xs:text-xs">{{settings.name}}</h1>
            <div class="text-center xs:mt-0 mt-1.5">
                <p class="xs:text-[10px] text-xs inline mr-2" :class="isAvailable?'htext-green-600':'htext-alert-negative'">
                    {{isAvailable ? $t('chat.availabilty') : $t('chat.notAvailabilty')}}
                </p>
                <a 
                    href="javascript:void(0)" 
                    class="inline mr-2 text-xs font-medium black-link lg:text-sm"
                    @click="openHorary"
                >{{$utils.capitalize($t('chat.horary'))}}</a>
            </div>
        </div>
        <!-- body chat -->
        <div class="body-chat flex-grow flex flex-col xs:p-2 p-3.5 overflow-y-auto lg:py-6 lg:px-4">
            <!-- info chat -->
            <div class="hbg-white-100 rounded-[10px] xs:p-2 p-3.5 lg:mx-auto lg:w-[277px] mb-4">
                <p class="xs:text-[0.53rem] sm:text-sm text-center leading-[150%]">
                    {{$utils.capitalize($t('chat.languages'))}}
                </p>
                <div class="flex flex-wrap justify-center" style="margin-left:-8px;margin-right:-8px;">
                    <img class="w-7 lg:w-5 mt-3.5 mx-2" v-for="lg in settings.languages" :key="lg" :src="'/assets/icons/'+lg.abbreviation+'.svg'" alt="">
                </div>
            </div>
            <div v-for="msg in messages" :key="msg" class="min-w-[156px] lg:min-w-[125px] max-w-[246px] lg:max-w-[336px] mb-3.5 lg:mb-6" :class="{'ml-auto':msg.by == 'Guest','mr-auto':msg.by == 'Hoster'}">
                <p class="break-words text-sm xs:p-1 p-2  rounded-[6px] mt-2" :class="{'hbg-gray-100':msg.by == 'Guest','hbg-white-100':msg.by !== 'Guest'}">
                    {{ msg.text }}
                </p>
                <p class="text-xs mt-2.5 text-right">
                    {{Moment(msg.created_at).format('DD/MM/YY')}} - {{Moment(msg.created_at).format('HH:mm')}}
                </p>
            </div>
        </div>
        <!-- input chat -->
        <div class="sticky bottom-0 left-0 flex px-6 py-2 input-chat xs:px-3 hbg-white-100" style="border-top: 1px solid var(--h-gray-400);">
            <textarea 
                id="text-auto" 
                class="flex-grow border-0 rounded-[10px] hbg-gray-100 h-full px-3 py-2" :placeholder="$t('chat.inputChat')"
                @input="autoGrow"
                v-model="msg"
                @focus="disableScroll"
                @blur="enableScroll"
                @keyup.enter="e => { sendMsg(e); }"
                @keydown.enter="e => handleEnter(e)"
            ></textarea>

            <div class="my-auto ml-2" >
                <IconHover 
                    @click="sendMsg"
                    @touchend.prevent.stop="sendMsg"
                    :src="'/assets/icons/2.TH.Sendicon.svg'"
                    :height_icon="'24px'"
                    :width_icon="'24px'"
                    :padding_container="'8px'"
                    style="--background-color: #f3f3f3;"
                />
            </div>
        </div>


    </div>
</template>
        
<script setup>
    //import libraries
    import { onMounted, ref, computed, nextTick, watch, onUnmounted } from 'vue';
    import { getPusherInstance, isChannelSubscribed } from '@/utils/pusherSingleton.js'

    import IconHover from '@/components/IconHover.vue'
    import ScheduleModal from './ScheduleModal.vue';
    
    import Moment from 'moment'
    import { useRouter } from 'vue-router';

    import { useStayStore } from '@/stores/modules/stay'
    import { useChatStore } from '@/stores/modules/chat'
    import { useHotelStore } from '@/stores/modules/hotel';
    //store
    const stayStore = useStayStore();
    const { stayData } = stayStore;
    const chatStore = useChatStore();
    const hotelStore = useHotelStore();
    const { hotelData, chatHours } = hotelStore;
    //imports components
    const emit = defineEmits(['closechat'])
    const langPage = 'es';
    const router = useRouter();
    //PROPS
    const props = defineProps({
        settings: {
            type: Array,
            default: () => ([]),
        }
    })

    //DATA
    const messages = ref(null)
    const msg = ref(null);
    const isAvailable = ref(false);
    const timeouts = ref([]);
    const scheduleModal = ref(null);
    //pusher
    const isSubscribed = ref(false);
    const channel_chat = ref(null);
    const pusher = ref(null);   

    //mounted
    onMounted( async () => {
        window.addEventListener('resize', setVH);
        setVH();


        messages.value =  await chatStore.loadMessages();
        setTimeout(scrollToBottom, 50);
        clearTimeouts();
        watchAvailability();
        connect_pusher();
    });

    onUnmounted(() => {
        if (channel_chat.value) {
            channel_chat.value.unbind('App\\Events\\UpdateChatEvent');
            pusher.value.unsubscribe(channel_chat.value);
        }
    });

    const myDiv = ref(null); // ref para tu div

    //functions
    let originalBodyOverflow; // Almacenamos la configuración original del overflow del body

function disableScroll() {
    originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Agregar listener a la ventana para bloquear el scroll en dispositivos táctiles
    window.addEventListener('touchmove', preventScroll, { passive: false });
}

function enableScroll() {
    document.body.style.overflow = originalBodyOverflow;
    window.removeEventListener('touchmove', preventScroll);
}

function preventScroll(e) {
  e.preventDefault();
}




    const setVH = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    const openHorary = async () =>{
        await hotelStore.$loadChatHours(); 
        scheduleModal.value.open();
    }
    
    const goBack = () => {
        if (window.history.length > 1) {
            router.go(-1);
        } else {
            router.push({ name: 'Home'})
        }
    }


    const sendMsg = (e)=>{
        if (!e.shiftKey && msg.value) {
            //servicio para enviar mensaje
            let text = msg.value;
            msg.value = null;
            // console.log('isAvailable.value',isAvailable.value)
            let params = {
                text,
                guestId : localStorage.getItem('guestId'),
                stayId : localStorage.getItem('stayId'),
                langWeb : localStorage.getItem('locale') || 'es',
                isAvailable : isAvailable.value
            };
            chatStore.sendMsgToHoster(params);
            // Desenfocar el campo de entrada para cerrar el teclado
            const inputElement = document.getElementById('text-auto');
            if (inputElement) {
            inputElement.blur();
            }
            document.getElementById('text-auto').style.height = '40px';
        }
    }

    const watchAvailability = async () =>{
        let loadChatHours = await hotelStore.$loadChatHours(); 
        // console.log('chatHourswatchAvailability',loadChatHours)
        const currentDay = Moment().format('dddd'); 
        const currentTime = Moment().format('HH:mm');
        const todaysAvailability = loadChatHours.find(item => item.day.toUpperCase() == currentDay.toUpperCase());
        if (!todaysAvailability || !todaysAvailability.active) {
            return false;
        }
        
        isAvailable.value = todaysAvailability.horary.some(timeSlot => {
            const startMoment = Moment(timeSlot.start, 'HH:mm');
            const endMoment = Moment(timeSlot.end, 'HH:mm');
            const currentMoment = Moment(currentTime, 'HH:mm');
            return currentMoment.isBetween(startMoment, endMoment, null, '[]');
        });
        // console.log('isAvailable.value',isAvailable.value)
    }
    
    const closeChat = () => {
        emit('closechat');
    }

    const handleEnter = (e) => {
        // Si la tecla Shift NO está presionada, entonces preventDefault para evitar el salto de línea
        if (!e.shiftKey) {
            e.preventDefault();
        }
    }

    const autoGrow =(event) => {
        event.target.style.height = '40px';
        event.target.style.height = event.target.scrollHeight + 'px';
    }
    
    const scrollToBottom = () => {
        var chatContainer = document.querySelector('.body-chat');
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    const clearTimeouts = () => {
        if(timeouts.value.length > 0){
            timeouts.value.forEach(timeout => clearTimeout(timeout));
            timeouts.value = [];
        }
    };

    const connect_pusher = () => {
        if (!isSubscribed.value) {
            const channelName = 'private-update-chat.' + stayStore.stayData.id;
            if (!isChannelSubscribed(channelName)) {
                channel_chat.value = channelName;
                pusher.value = getPusherInstance();
                channel_chat.value = pusher.value.subscribe(channel_chat.value);
                channel_chat.value.bind('App\\Events\\UpdateChatEvent', async (data) => {
                    chatStore.addMessage(data.message);
                    await chatStore.markMsgsAsRead();
                });
            isSubscribed.value = true; // Marcar como suscrito
            }
        } else if (!stayStore.stayData && isSubscribed.value) {
            // Lógica para desuscribirse del canal si stayStore.stayData es null o undefined
            if (channel_chat.value) {
            pusher.value.unsubscribe(channel_chat.value);
            isSubscribed.value = false; // Marcar como no suscrito
            }
        }
    };

    // Suponiendo que messages es una ref() y se actualiza correctamente en otra parte del código
    watch(messages, (newMessages) => {
        nextTick(() => {
            scrollToBottom();
        });
    }, { deep: true });
</script>
    
<style>
/* .height-chat {
  height: calc((var(--vh, 1vh) * 100) - 72px);
}
.height-chat-open-keyboard {
  height: calc(var(--vh, 1vh) * 100); 
} */
.height-chat {
  height: calc(var(--vh, 1vh) * 100); 
}
textarea:hover::placeholder {
    color: var(--h-green-600);
}
#text-auto {
    height: 40px; 
    min-height: 40px; 
    overflow-y: hidden;
    resize: none; 
}
/* @media (min-width:1020px){
    .height-chat{
        height: 100%;
    }
}
@media (max-width:1020px){
    .height-chat {
        height: calc(100vh - 64px);
    } 
}*/

</style>
        