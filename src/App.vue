<template>
  <div id="app">
    <!-- Preloader -->
      <!-- <LoadPage v-if="activeRequests > 0" /> -->
    <!-- Resto de la aplicación -->
    <router-view />
    <MetaTags />
  </div>
</template>

<script setup>
import { defineComponent } from 'vue';
defineComponent({ name: 'App' });

//
import { getPusherInstance, isChannelSubscribed } from '@/utils/pusherSingleton.js'
import { isMockup } from '@/utils/utils.js'
import { computed, onMounted, watch, ref } from 'vue';
import useHotelMetadata from '@/composables/useHotelMetadata'
import LoadPage from '@/shared/LoadPage.vue'; // Asegúrate de que la ruta sea correcta
//
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const { setMetadata } = useHotelMetadata()

//stores
import { useStayStore } from '@/stores/modules/stay';
const stayStore = useStayStore();
import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();
import { usePreloaderStore } from '@/stores/modules/preloader';
const preloaderStore = usePreloaderStore();
import { useHotelStore } from '@/stores/modules/hotel'
import MetaTags from '@/components/MetaTags.vue'

onMounted(()=>{
  // console.log('test hola')
  /* updateOpenGraphMeta({
    title: 'Título Hoteles',
    description: 'Descripción Hoteles',
    image: 'https://miapp.com/nueva-imagen.jpg',
    url: window.location.href,  // Usando la URL actual
  }); */
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

const getSubdomain = () => {
  const host = window.location.hostname
  if (host.includes('thehoster.app')) {
    return host.split('.')[0]
  }
  return null
}

watch(
    () => route.path,
    (newPath) => {
        const subdomain = getSubdomain()
        if (subdomain) {
            setMetadata(subdomain)
        }
    }
)

watch(() => stayStore.stayData, async (newStayData) => {
    if (!isMockup()) {
        if(newStayData){
          //aqio?
            unSubscribePusher();
            connectPusher();
        }
    }
}, { immediate: true });

const hotelStore = useHotelStore()

</script>


