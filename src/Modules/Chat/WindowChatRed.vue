<template>
    <div ref="myDiv" 
        class="relative flex flex-col hbg-gray-200 height-chat"
    >
        <div class="sticky top-0 left-0">
            <AppHeader title="Chat" :tabs="tabsMenu"/>
        </div>
        <!-- body chat -->
        <div class="body-chat flex-grow flex flex-col overflow-y-auto px-4">
            <!-- availabilty tag-->
            <div class="fixed top-[142px] left-4 bg-gradient-100 rounded-[10px] p-3 shadow-guest">
                <div class="flex items-center gap-2">
                    <p class="lato text-sm font-bold underline leading-[16px]" :class="{'text-[#34A98F]':isAvailable,'text-[#F66]':!isAvailable}">
                        {{ isAvailable ? 'Disponible' : 'No disponible' }}
                    </p>
                    <IconCustomColor 
                        name="WA.Clock" 
                        :color="isAvailable ? '#34A98F' : '#F66'" 
                        only-change-background 
                        height="14"
                        width="14"
                    />
                </div>
            </div>
            <!-- info chat -->
            <div class="bg-gradient-100 border border-color-secondary rounded-[10px] p-4 mb-4 mt-[64px]">
                <p class="lato text-sm font-medium leading-[16px] text-center w-[311px] mx-auto">
                    <!-- {{$utils.capitalize($t('chat.languages'))}} -->
                    Te damos la bienvenida al chat!<br>
                    Puedes comunicarte con nuestro personal en estos idiomas:
                </p>
                <div class="flex flex-wrap justify-center mt-4 gap-4">
                    <img class="w-5 h-5" v-for="lg in settings.languages" :key="lg" :src="'/assets/icons/languages/'+lg.abbreviation+'.svg'" alt="">
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
        <div class="bg-white rounded-t-[10px] shadow-guest-2">
            <div class="px-6 pt-3 pb-4 flex items-center gap-3">
                <textarea 
                    id="text-auto" 
                    class="flex-grow border border-color-secondary rounded-[8px] hbg-gray-100 h-full px-3 py-2" :placeholder="$t('chat.inputChat')"
                    @input="autoGrow"
                    v-model="msg"
                    @focus="disableScroll"
                    @blur="enableScroll"
                    @keyup.enter="e => { sendMsg(e); }"
                    @keydown.enter="e => handleEnter(e)"
                ></textarea>
                <div 
                    class="flex items-center justify-center rounded-full w-10 h-10 bg-[#333] shadow-guest border border-white" 
                    @click="sendMsg"
                    @touchend.prevent.stop="sendMsg"
                >
                    <img class="w-4 h-4" src="/assets/icons/paper-plane.svg">
                </div>
            </div>
            <div class="h-[89px]"></div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getPusherInstance, isChannelSubscribed } from '@/utils/pusherSingleton.js'
import AppHeader from '@/layout/Components/AppHeader.vue';
import IconCustomColor from '@/components/IconCustomColor.vue';
import { DateTime, Interval, Settings } from 'luxon';
// Configurar la localización global a español
Settings.defaultLocale = 'es';
//stores
import { useHotelStore } from '@/stores/modules/hotel';
const hotelStore = useHotelStore()
import { useChatStore } from '@/stores/modules/chat'
const chatStore = useChatStore();
import { useGuestStore } from '@/stores/modules/guest'
const guestStore = useGuestStore();
//DATA
const messages = ref(null)
const settings = ref(hotelStore?.hotelData?.chatSettings ?? {});
const msg = ref(null);
const isAvailable = ref(false);
const timeouts = ref([]);
//pusher
const isSubscribed = ref(false);
const channel_chat = ref(null);
const pusher = ref(null);   
const screenOff = ref(null);   

//mounted
onMounted( async () => {
    messages.value =  await chatStore.loadMessages();
    setTimeout(scrollToBottom, 50);
    clearTimeouts();
    watchAvailability();
    connectPusher();
});

const autoGrow = (event) => {
    event.target.style.height = '40px';
    event.target.style.height = event.target.scrollHeight + 'px';
}

const disableScroll = () => {
    originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Agregar listener a la ventana para bloquear el scroll en dispositivos táctiles
    window.addEventListener('touchmove', preventScroll, { passive: false });
}

const  enableScroll = () => {
    document.body.style.overflow = originalBodyOverflow;
    window.removeEventListener('touchmove', preventScroll);
}

const sendMsg = (e)=>{
    if (!e.shiftKey && msg.value) {
        //servicio para enviar mensaje
        let text = msg.value;
        msg.value = null;
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

const handleEnter = (e) => {
    // Si la tecla Shift NO está presionada, entonces preventDefault para evitar el salto de línea
    if (!e.shiftKey) {
        e.preventDefault();
    }
}

const watchAvailability = async () => {
    try {
        // Cargar los horarios de chat desde el store
        let loadChatHours = await hotelStore.$loadChatHours(); 
        // Obtener la fecha y hora actual
        const currentDateTime = DateTime.now();
        const currentDay = currentDateTime.toFormat('cccc'); // Nombre completo del día, e.g., 'Monday'
        const currentTime = currentDateTime.toFormat('HH:mm'); // Formato 24 horas, e.g., '14:30'
        // Encontrar la disponibilidad de hoy
        const todaysAvailability = loadChatHours.find(item => item.day.toUpperCase() === currentDay.toUpperCase());
        
        // Si no hay disponibilidad o no está activa, retornar false
        if (!todaysAvailability || !todaysAvailability.active) {
            isAvailable.value = false;
            return false;
        }
        // Verificar si la hora actual está dentro de alguno de los intervalos disponibles
        isAvailable.value = todaysAvailability.horary.some(timeSlot => {
            
            // Crear DateTime para el inicio y fin del intervalo
            const startDateTime = DateTime.fromFormat(timeSlot.start, 'HH:mm').set({
                year: currentDateTime.year,
                month: currentDateTime.month,
                day: currentDateTime.day
            });

            const endDateTime = DateTime.fromFormat(timeSlot.end, 'HH:mm').set({
                year: currentDateTime.year,
                month: currentDateTime.month,
                day: currentDateTime.day
            });

            // Crear DateTime para la hora actual
            const currentDateTimeParsed = DateTime.fromFormat(currentTime, 'HH:mm').set({
                year: currentDateTime.year,
                month: currentDateTime.month,
                day: currentDateTime.day
            });

            // Crear un intervalo de tiempo
            const interval = Interval.fromDateTimes(startDateTime, endDateTime);
            // console.log('test currentDateTimeParsed',currentDateTimeParsed)
            // Verificar si la hora actual está dentro del intervalo (inclusive)
            return interval.contains(currentDateTimeParsed);
        });

        return isAvailable.value;
    } catch (error) {
        console.error('Error al verificar la disponibilidad:', error);
        isAvailable.value = false;
        return false;
    }
};


const clearTimeouts = () => {
    if(timeouts.value.length > 0){
        timeouts.value.forEach(timeout => clearTimeout(timeout));
        timeouts.value = [];
    }
};

const scrollToBottom = () => {
    var chatContainer = document.querySelector('.body-chat');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

const connectPusher = () => {
    if (!isSubscribed.value) {
        let guest = guestStore.getLocalGuest();
        const channelName = 'private-update-chat.' + guest.id;
        if (!isChannelSubscribed(channelName)) {
            channel_chat.value = channelName;
            pusher.value = getPusherInstance();
            channel_chat.value = pusher.value.subscribe(channel_chat.value);
            channel_chat.value.bind('App\\Events\\UpdateChatEvent', async (data) => {
                // console.log('test UpdateChatEvent', data)
                //se marca como leido solo si la pantalla no esta apagada 
                //o si no esta minimizado el navegador
                if(!screenOff.value){
                    await chatStore.markMsgsAsRead('lleno');
                }
                chatStore.addMessage(data.message);
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

const tabsMenu = [
    {    
        title: 'Chat',
        exclude: false,
        iconDefault: `WA.Chat`,
        iconSelected: `WA.Chat`,
        isActive: true,
        onClick: () => {},
    },
    {    
        title: 'Inbox',
        exclude: false,
        iconDefault: `WA.inbox.DISABLED`,
        iconSelected: `WA.inbox`,
        isActive: false,
        onClick: () => {},
    }
];
</script>
<style scoped>
.height-chat {
  height: calc(var(--vh, 1vh) * 100); 
}

#text-auto {
    height: 40px; 
    min-height: 40px; 
    overflow-y: hidden;
    resize: none; 
}

</style>