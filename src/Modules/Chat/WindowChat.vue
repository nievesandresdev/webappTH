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
            <div v-for="msg in chat_messages" :key="msg" class="min-w-[156px] lg:min-w-[125px] max-w-[246px] lg:max-w-[336px] mb-3.5 lg:mb-6" :class="{'ml-auto':msg.by == 'Guest','mr-auto':msg.by == 'Hoster'}">
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
                @keyup.enter="e => { send_msg(e); showMenu(); }"
                @keydown.enter="e => handleEnter(e)"
            ></textarea>
            <div class="ml-2 my-auto" >
                <IconHover 
                    @click="send_msg"
                    @touchend.prevent.stop="send_msg"
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
    //store
    const stayStore = useStayStore()
    const { stayData } = stayStore;
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
        },
        chat_messages: {
            type: Array,
            default: () => ([]),
        },
    })
    
    // Observa cambios en chat_messages
    watch(() => props.chat_messages, (newValue, oldValue) => {
        setTimeout(scrollToBottom, 100);
        clearTimeouts();
    })
    watch(() => props.chat_hours, (newValue, oldValue) => {
        setTimeout(watch_availability, 100);
    })

    //mounted
    onMounted(() => {
        console.log('chatmounted',props.settings)
        get_messages();
        setTimeout(scrollToBottom, 100);
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

    //DATA
    const msg = ref(null);
    const messages_list = ref(props.chat_messages);
    const isAvailable = ref(false);
    const automatic_msg = ref(false);
    const msg_status = ref('Entregado');
    const by_msg = ref('Guest');
    const timeouts = ref([]);
    const send_not_available_msg = ref(false);
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
    const send_msg = (e)=>{
        showMenuMobile.value = true;
        send_not_available_msg.value = false;
        automatic_msg.value = false;
        // e.stopPropagation();
        if (!e.shiftKey && msg.value) {
            let text = msg.value;
            msg.value = null;
            by_msg.value = 'Guest';
            msg_status.value = 'Entregado';
            send_axios(text);
            // Desenfocar el campo de entrada para cerrar el teclado
            const inputElement = document.getElementById('text-auto');
            if (inputElement) {
            inputElement.blur();
            }

            document.getElementById('text-auto').style.height = '40px';
        }
    }

    const send_automatic_msg = (text)=>{
        automatic_msg.value = true;
        msg_status.value = 'Leído';
        by_msg.value = 'Hoster';
        send_axios(text);
    }

    const send_axios = (text) => {
        // if(stayData){
        //     axios({
        //         url: route('chat.send.msg',{
        //             hoster:slug_hoster,
        //             stay_id:stayData?.id,
        //             text,
        //             automatic:automatic_msg.value,
        //             status:msg_status.value,
        //             by:by_msg.value,
        //             isAvailable:isAvailable.value
        //         }),
        //         method: 'POST',
        //     })
        //     .then((res) => {
        //         startAutomaticsMsgs();
        //     })
        // }
    }


    const startAutomaticsMsgs = () => {
        //mensaje automatico cuando no hay agente disponible
        // if(!isAvailable.value  && props.settings.not_available_show && !send_not_available_msg.value)
        // {
        //     send_not_available_msg.value = true;
        //     send_automatic_msg(props.settings.not_available_msg[langPage])
        // }
    };

    const get_messages = () =>{
        // axios({
        //     url: route('chat.get_chat_messages',{hoster:slug_hoster,stay_id:stayData.id}),
        //     method: 'POST',
        // })
        // .then((res) => {
        //     console.log('get_messages',res.data)
        //     messages_list.value = res.data
        // })
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
        