<template>
	<div class="wrapper flex flex-col xs:hcursor-mobile relative">
        <GuestLog />
        <!-- <Favicon /> -->
		<!-- Sidebar  -->
		<div v-if="!$route.name == 'homePage'" class="hidden md:block">
			<GeneralMenu/>
		</div>
		<div id="content" class="flex-1 lg:mb-0" :class="{'mb-16':showMenuMobile,'mb-0':!showMenuMobile}">
			<slot
                :settings="settings" 
                :chat_hours="chat_hours"
                :chat_messages="messages"
            ></slot>
            <router-view></router-view>
            <!-- <div 
                v-if="stay_session && show_chat_guest" 
                class="bubble-chat hidden lg:block fixed bottom-[30px] right-[30px] cursor-pointer p-4 rounded-full"
                :class="{'hbg-warning':msgs_unread,'hbg-gray-100':!msgs_unread}"
                @click="mark_msgs_as_read()" 
            >
                <img class="w-10 h-10" src="/vendor_asset/img/hoster/icons/estancia/Chatbubblelineoutline.svg" alt="chat">
            </div> -->
		</div>
		<!-- Footer  -->
        
		<div id="NavMobilePartner" class="md:hidden" :class="{'hidden':!showMenuMobile}">
			<MenuMobile :msgs_unread="msgs_unread = false"  @mark_read_msgs="mark_msgs_as_read"/>
		</div>
        <template v-if="footer">
            <TheFooter />
        </template>

		<!-- <Notify v-if="$page.props.flash.id" :key="$page.props.flash.id" /> -->
		<!-- <ModalNotify /> -->

        <!-- <transition name="slide">
            <div v-if="show_chat" class="window-chat hbg-white-100 w-[438px] hidden lg:block fixed right-0 bottom-0 z-[1000]">
                <Chat 
                    @closechat="show_chat = false"
                    :settings="settings" 
                    :chat_hours="chat_hours"
                    :chat_messages="messages"
                />
            </div>
        </transition> -->

        <!-- <ScheduleModal :chat_hours="chat_hours" /> -->
	</div>
</template>

<script setup>
    import { onMounted, ref, onUnmounted } from 'vue';
    // import Notify from '@/Pages/Collaborator/Layouts/Notify.vue'
    import GeneralMenu from './GeneralMenu.vue'
    import TheFooter from './Components/TheFooter.vue'
    import MenuMobile from './Components/MenuMobile.vue'
    import GuestLog from './GuestLog.vue'
    // import ModalNotify from '@/Components/ModalNotify'
    // import { getPusherInstance } from '@/util/pusherSingleton'
    // import Chat from '@/Pages/HosterLanding/Chat/Window.vue'
    // import ScheduleModal from '@/Pages/HosterLanding/ScheduleModal.vue'
    // import Favicon from '../Components/Favicon.vue'
    // import { usePage } from '@inertiajs/inertia-vue3'
    /* eslint-disable */
    const props = defineProps({
       footer:{
        type:Boolean,
        default:'true'
       }
    })


    
    //DATA
    // const stay_session = usePage().props.value.stay_session
    // const slug_hoster = usePage().props.value.user_hoster.slug;
    // const current_route = usePage().props.value.route_name;
    // const show_chat_guest = usePage().props.value.user_hoster.chat_settings?.show_guest;
    const settings = ref({});
    const chat_hours = ref([]);
    // const chat = ref({});
    const messages = ref([]);        
    // const show_chat = ref(false);     
    // const channel_chat = ref(null);
    // const pusher = ref(null);   
    const showMenuMobile = ref(true); 
    // provide('showMenuMobile', showMenuMobile);

    //ONMOUNTED
    onMounted(() => {
    //     const urlParams = new URLSearchParams(window.location.search);
    //     const mockup = urlParams.get('mockup');
    //     if(stay_session){
    //         let data_pending = usePage().props.value.guest_data_pending_init
    //         console.log('data_pending',usePage().props.value.guest_data_pending_init)
    //         chat.value = data_pending?.chat ?? null;
    //         chat_hours.value = data_pending?.chat_hours ?? [];
    //         messages.value = data_pending?.messages ?? [];
    //         settings.value = data_pending?.settings ?? [];
    //     }
    //     if (mockup === 'true') {
    //         // Cambia el cursor para el mockup
    //         document.body.style.cursor = "url('/vendor_asset/img/hoster/2-th-hotspot.cur'), auto";
    //     }
        
    //     connect_pusher()
    })

    onUnmounted(() => {
    //     if (channel_chat.value) {
    //         channel_chat.value.unbind('App\\Events\\UpdateChatEvent');
    //         pusher.value.unsubscribe(channel_chat.value);
    //     }
    });
    

    // const connect_pusher = () =>{
    /*
    //PUSHER
    */
    // if(stay_session){
    //         channel_chat.value = 'private-update-chat.' + stay_session.stay?.id;
    //         pusher.value = getPusherInstance();
    //         //
    //         channel_chat.value = pusher.value.subscribe(channel_chat.value);
    //         channel_chat.value.bind('App\\Events\\UpdateChatEvent', function(data) {
    //             messages.value = [...messages.value, data.message];
    //             // si el chat esta abierto se marca como leido el mensaje
    //             if(data.message.by == 'Hoster' && show_chat.value || data.message.by == 'Hoster' && current_route == 'chat.mobile'){
    //                 mark_msgs_as_read();
    //             }
    //         });
    //         channel_chat.value.bind('App\\Events\\MsgReadChatEvent', function(data) {
    //             const count_msgs = messages.value.length;
    //             const arr = messages.value;
    //             if(msgs_unread.value){
    //                 for (let i = count_msgs - 1; i >= 0; i--) {
    //                     if (arr[i].status == 'Entregado' && arr[i].by == 'Hoster') {
    //                         arr[i].status = 'Leído';
    //                     } else if (arr[i].status == 'Entregado') {
    //                         break;
    //                     }
    //                 }
    //             }
    //              messages.value = arr;
    //         });
    //     }
    // }

    const mark_msgs_as_read = () =>{
    //     show_chat.value = true
    //     if(messages.value.length){
    //         axios({
    //             url: route('chat.mark_msgs_as_read',{hoster:slug_hoster,stay_id:stay_session.stay?.id}),
    //             method: 'POST',
    //         }).then( res => {
    //         });
    //     }
    }

    //COMPUTED
    // const  msgs_unread = computed(() => {
    //     const count_msgs = messages.value.length;
    //     const arr = messages.value;
    //     for (let i = count_msgs - 1; i >= 0; i--) {
    //         if (arr[i].status == 'Entregado' && arr[i].by == 'Hoster') {
    //             return true;
    //         }
    //     }
    //     return false
    // })

    
</script>

<style scoped>
    .wrapper {
        width: 100%;
    }
    .bubble-chat:hover{
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
    }
    #content {
        width: 100%;
        min-height: calc(100vh  - 64px - 48px);
        transition: all 0.3s;
    }
 
    @media (min-width:1020px){
        .modal-dialog-centered{
            max-width: 320px !important;
        }
    }
    @media (min-width:1440px) {
        #content {
            margin-left: auto !important;
            margin-right: auto !important;
        }
    }

    .window-chat{
        height: 100vh;
    }

    .slide-enter-from, .slide-leave-to {
    transform: translateX(100%);
    }
    .slide-enter-to, .slide-leave-from {
    transform: translateX(0);
    }
    .slide-enter-active, .slide-leave-active {
    transition: transform 0.5s;
    }


</style>