<template>
  <div class="app-container">
    <!-- Preloader -->
      <!-- <LoadPage v-if="activeRequests > 0" /> -->
    <!-- Resto de la aplicación -->
    
    <!-- Sin transición para rutas de servicios (Confort, Transport, Activity) -->
    <!-- <div v-if="['Confort', 'Transport', 'Activity','PersonalInfo','UbicationData','ContactData'].includes($route.name)">
      <router-view />
    </div> -->
    
    <!-- Con transición para otras páginas -->
   <!--  <div v-else>
      <router-view v-slot="{ Component, route }">
        <TransitionBookGlobal>
          <component :is="Component" :key="route.name" />
        </TransitionBookGlobal>
      </router-view>
    </div> -->


   <router-view /> 
  </div>
</template>

<script setup>
import { defineComponent } from 'vue';
defineComponent({ name: 'App' });

//
import { getPusherInstance, isChannelSubscribed } from '@/utils/pusherSingleton.js'
import { isMockup } from '@/utils/utils.js'
import { computed, watch, ref, onMounted } from 'vue';
import { useFavicon } from '@/composables/useFavicon'
/*   import LoadPage from '@/shared/LoadPage.vue'; 
  import TransitionBookGlobal from '@/components/Transition/TransitionBookGlobal.vue'; */
//
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

//stores
import { useStayStore } from '@/stores/modules/stay';
const stayStore = useStayStore();
import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();
import { usePreloaderStore } from '@/stores/modules/preloader';
const preloaderStore = usePreloaderStore();
import { useHotelStore } from '@/stores/modules/hotel'

/* onMounted(()=>{
  // console.log('test hola')
  updateOpenGraphMeta({
    title: 'Título Hoteles',
    description: 'Descripción Hoteles',
    image: 'https://miapp.com/nueva-imagen.jpg',
    url: window.location.href,  // Usando la URL actual
  });
})

// Función para actualizar dinámicamente los metadatos de Open Graph
function updateOpenGraphMeta(data) {
  const titleMeta = document.querySelector('meta[property="og:title"]');
  const descriptionMeta = document.querySelector('meta[property="og:description"]');
  const imageMeta = document.querySelector('meta[property="og:image"]');
  const urlMeta = document.querySelector('meta[property="og:url"]');

  if (titleMeta) titleMeta.setAttribute('content', data.title);
  if (descriptionMeta) descriptionMeta.setAttribute('content', data.description);
  if (imageMeta) imageMeta.setAttribute('content', data.image);
  if (urlMeta) urlMeta.setAttribute('content', data.url);
}
 */
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

/* watch(() => route.path, () => {
  const subdomain = getSubdomain()
  if (subdomain) {
    setMetadata(subdomain)
  }
}, { immediate: true }) */

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
const URL_STORAGE = process.env.VUE_APP_STORAGE_URL

const formatImage = (payload) => {
  let { url, type } = payload
  
  if (url && url.startsWith("blob:")) return url
  if (!url || !URL_STORAGE) return '/assets/icons/1.TH.RECOMMEND.svg'
  
  let type_d = url.includes('https://') ? 'CDN' : 'STORAGE'
  type = type ?? type_d
  
  return type === 'CDN' || type === 'image-hotel-scraper' ? url : URL_STORAGE + url
}

// Observar cambios en hotelData para actualizar el favicon
/* watch(() => hotelStore.hotelData, (hotelData) => {
  if (!hotelData) return;

  const faviconUrl = hotelData.favicon 
    ? formatImage({ url: hotelData.favicon }) 
    : '/assets/icons/1.TH.RECOMMEND.svg';

  useFavicon(faviconUrl);
}, { immediate: true }); */

// Transition handlers
const beforeLeave = (el) => {
  el.style.position = 'absolute';
  el.style.width = '100%';
};

const enter = (el) => {
  el.style.position = 'absolute';
  el.style.width = '100%';
};

const afterEnter = (el) => {
  el.style.position = '';
  el.style.width = '';
};

/* // Usar watchEffect para manejar la actualización del título
watchEffect(() => {
  // Usar hotelDataStorage que viene del localStorage
  const hotelName = hotelStore.hotelDataStorage?.name
  const routeName = route.name
  
  if (hotelName) {
    if (routeName === 'Home') {
      document.title = `${hotelName} | Inicio`
    } else if (routeName) {
      // Formatear el nombre de la ruta para el título
      const routeTitle = routeName
        .replace(/([A-Z])/g, ' $1') // Agrega espacio antes de mayúsculas
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
      document.title = `${hotelName} | ${routeTitle}`
    }
  }
})

// También observamos los cambios de ruta
watch(
  () => route.name,
  (newRouteName) => {
    console.log('Route Changed:', newRouteName)
    if (newRouteName === 'Home' && hotelStore.hotelData?.name) {
      document.title = `${hotelStore.hotelData?.name} | Inicio`
    }else{
      document.title = `${hotelStore.hotelData?.name} | ${newRouteName}`
    }
  },
  { immediate: true }
) */

</script>

<style>
.app-container {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Transición fade por defecto */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Asegurarse que el contenedor principal mantenga el espacio */
#app {
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
}
</style>


