<template>
  <div id="app">
    <!-- Preloader -->
      <!-- <LoadPage v-if="activeRequests > 0" /> -->
    <!-- Resto de la aplicación -->
    <router-view />
  </div>
</template>

<script setup>
import { defineComponent } from 'vue';
defineComponent({ name: 'App' });

//
import { getPusherInstance, isChannelSubscribed } from '@/utils/pusherSingleton.js'
import { isMockup } from '@/utils/utils.js'
import { computed, onMounted, watch, ref } from 'vue';
import LoadPage from '@/shared/LoadPage.vue'; // Asegúrate de que la ruta sea correcta
//
import { useRouter } from 'vue-router';
const router = useRouter();
//stores
import { useStayStore } from '@/stores/modules/stay';
const stayStore = useStayStore();
import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();
import { usePreloaderStore } from '@/stores/modules/preloader';
const preloaderStore = usePreloaderStore();



onMounted(()=>{
  // console.log('test hola')
})

const pusher = ref(null);   
const isSubscribed = ref(false);
const channelLogOutGuest = ref(null);


const activeRequests = computed(() => preloaderStore.activeRequests);


const connectPusher = () => {
    const guestData = guestStore.guestData;
    if (stayStore.stayData && !isSubscribed.value) {
        pusher.value = getPusherInstance();
        //
        //channelLogOutGuest
        const channelName2 = 'private-logout-webapp-guest.' + guestData?.id;
        if (!isChannelSubscribed(channelName2)) {
            channelLogOutGuest.value = channelName2;
            channelLogOutGuest.value = pusher.value.subscribe(channelLogOutGuest.value);
            channelLogOutGuest.value.bind('App\\Events\\LogoutWebappGuest', async (data) => {
                // console.log('test LogoutWebappGuest', data);
                router.push({ name: 'LogoutUser', query:{ id: data.guestId ?? '' }});
            });
        }
    }
};

const unSubscribePusher = () =>{

    if (channelLogOutGuest.value && !isMockup()) {
        channelLogOutGuest.value.unbind('App\\Events\\LogoutWebappGuest');
        pusher.value.unsubscribe(channelLogOutGuest.value);
    }
    
}

watch(() => stayStore.stayData, async (newStayData) => {
    if (!isMockup()) {
        if(newStayData){
          //aqio?
            unSubscribePusher();
            connectPusher();
        }
    }
}, { immediate: true });
</script>


