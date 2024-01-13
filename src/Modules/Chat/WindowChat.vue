<template>
    <!-- <div class="height-chat hbg-gray-200 flex flex-col relative"> -->
    <div ref="myDiv" class="hbg-gray-200 flex flex-col relative">
        <!-- header -->
        <div class="py-4 text-center shadow-hoster hbg-white-100 sticky top-0 left-0">
            <img @click="closeChat" class="absolute top-4 left-4 w-6 h-6 hidden lg:block cursor-pointer" src="/assets/icons/back-arrow-on-circle.svg">
            <h1 class="xs:text-xs text-base font-medium">{{settings.name}}</h1>
            <div class="text-center xs:mt-0 mt-1.5">
                <p v-if="isAvailable" class="htext-green-600 xs:text-[10px] text-xs inline mr-2">
                    {{$utils.capitalize($t('chat.availabilty'))}}
                </p>
                <p v-else class="htext-alert-negative xs:text-[10px] text-xs inline mr-2">
                    {{$utils.capitalize($t('chat.notAvailabilty'))}}
                </p>
                <a 
                    href="javascript:void(0)" 
                    class="black-link text-xs lg:text-sm font-medium inline mr-2"
                    data-toggle="modal" data-target="#horarios"
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
        <div class="input-chat xs:px-3 px-6 py-2 flex hbg-white-100" style="border-top: 1px solid var(--h-gray-400);">
            <textarea 
                id="text-auto" 
                class="flex-grow border-0 rounded-[10px] hbg-gray-100 h-full px-3 py-2" :placeholder="$t('chat.inputChat')"
                @input="autoGrow"
                v-model="msg"
                @focus="hideMenu"
                @blur="showMenu"
                @keyup.enter="e => { sendMsg(e); showMenu(); }"
                @keydown.enter="e => handleEnter(e)"
            ></textarea>
            <div class="ml-2 my-auto" >
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
    import { onMounted, ref, inject, computed, nextTick, watch, onBeforeUnmount } from 'vue';
    import IconHover from '@/components/IconHover.vue'
    import Moment from 'moment'
    import { useStayStore } from '@/stores/modules/stay'
    import { useChatStore } from '@/stores/modules/chat'
    //store
    const stayStore = useStayStore();
    const { stayData } = stayStore;
    const chatStore = useChatStore();
    //imports components
    const emit = defineEmits(['closechat'])
    const langPage = 'es';
    //PROPS
    const props = defineProps({
        settings: {
            type: Array,
            default: () => ([]),
        },
        chat_hours: {
            type: Array,
            default: () => ([]),
        }
    })

    //DATA
    const messages = ref(null)
    const msg = ref(null);
    const isAvailable = ref(false);
    const timeouts = ref([]);

    //mounted
    onMounted( async () => {
        watch_availability();
        nextTick(() => {
            const textarea = document.getElementById('text-auto');
            autoGrow({ target: textarea });  
        })
        setInterval(watch_availability, 180000);
        // Establecer la altura inicial
        setDivHeight();
        
        // Actualizar la altura cuando cambie el tamaño de la ventana
        window.addEventListener('resize', setDivHeight);
        messages.value =  await chatStore.loadMessages();
        setTimeout(scrollToBottom, 50);
        clearTimeouts();
        console.log('chatmounted',messages.value)
    });

    onBeforeUnmount(() => {
        // Limpiar el evento al salir
        window.removeEventListener('resize', setDivHeight);
    });

    const myDiv = ref(null); // ref para tu div

    const setDivHeight = () => {
        if(showMenuMobile.value){
            if (window.innerWidth <= 1020) {
            myDiv.value.style.height = `${window.innerHeight - 74}px`;
            } else {
            myDiv.value.style.height = '100%';
            }
        }else{
            myDiv.value.style.height = `100vh`;
        }
    };

    watch(() => props.chat_hours, (newValue, oldValue) => {
        setTimeout(watch_availability, 100);
    })

    // Suponiendo que messages es una ref() y se actualiza correctamente en otra parte del código
    watch(messages, (newMessages) => {
    nextTick(() => {
        console.log('Messages updated, scrolling to bottom');
        scrollToBottom();
    });
    }, { deep: true });


    //functions

    const showMenuMobile = inject('showMenuMobile');

    const hideMenu = () => {
    showMenuMobile.value = false;
    setDivHeight()
    };

    const showMenu = () => {
    showMenuMobile.value = true;
    setDivHeight()
};
    const sendMsg = (e)=>{
        showMenuMobile.value = true;
        if (!e.shiftKey && msg.value) {
            //servicio para enviar mensaje
            let text = msg.value;
            msg.value = null;
            let params = {
                text,
                guestId : localStorage.getItem('guestId'),
                stayId : localStorage.getItem('stayId'),
                langWeb : localStorage.getItem('locale') || 'es',
                isAvailable : true
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

    const watch_availability = () =>{
        // console.log('watch_availability',props.chat_hours)
        // const currentDay = Moment().format('dddd'); 
        // const currentTime = Moment().format('HH:mm');
        // const todaysAvailability = props.chat_hours.find(item => item.day.toUpperCase() == currentDay.toUpperCase());
        // if (!todaysAvailability || !todaysAvailability.active) {
        //     return false;
        // }
        
        // isAvailable.value = todaysAvailability.horary.some(timeSlot => {
        //     const startMoment = Moment(timeSlot.start, 'HH:mm');
        //     const endMoment = Moment(timeSlot.end, 'HH:mm');
        //     const currentMoment = Moment(currentTime, 'HH:mm');
        //     return currentMoment.isBetween(startMoment, endMoment, null, '[]');
        // });
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
</script>
    
<style scoped>
textarea:hover::placeholder {
    color: var(--h-green-600);
}
#text-auto {
    height: 40px; 
    min-height: 40px; 
    overflow-y: hidden;
    resize: none; 
}
@media (min-width:1020px){
    .height-chat{
        height: 100%;
    }
}
@media (max-width:1020px){
    .height-chat {
        height: calc(100vh - 64px);
    }
/* 
    .height-chat-keyboard {
        height: calc(100vh - 40vh); 
    } */


}

</style>
        