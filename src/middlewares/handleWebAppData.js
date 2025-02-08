// src/middleware/handleWebAppData.js
import { useHotelStore } from '@/stores/modules/hotel'
import { useGuestStore } from '@/stores/modules/guest'
import { useStayStore } from '@/stores/modules/stay'
import { useLocaleStore } from '@/stores/modules/locale'
import { useChainStore } from '@/stores/modules/chain'
import { useHistoryStore } from '@/stores/modules/history'
import { useAuthStore } from '@/stores/modules/auth'

import utils from '@/utils/utils.js';
import { i18n } from '@/i18n'

export default async function handleWebAppData({ to, from, next }) {
    
    const stayStore = useStayStore();
    const guestStore = useGuestStore();
    const historyStore = useHistoryStore();
    const authStore = useAuthStore();
    //
    const stayId = utils.getUrlParam('e');
    const guestId = utils.getUrlParam('g');
    sessionStorage.setItem('guestPerStay', utils.getUrlParam('guestPerStay'))
    //evitar multiples redirecciones
    
    if (to.name === 'NotFound') return next();
    
    ////////////////////////////////////////////////////////
    //
    //cargar data de la cadena
    const chainStore = useChainStore();
    await chainStore.$loadChainSubdomain();
    const chainSubdomain = localStorage.getItem('chainSubdomain');//http://localhost:81/?chainsubdomain=nobusevillatex
    
    if (!chainSubdomain) {
        return next({ name: 'NotFound' }); // Redirige a la ruta NotFound
    }else{
        if(chainStore.chainData?.subdomain !== chainSubdomain || !chainStore.chainData){
            await chainStore.$loadChainData();
        }
        if(!chainStore.chainData) return next({ name: 'NotFound' }); // Redirige a la ruta NotFound
    }
    ////////////////////////////////////////////////////////
    //
    //
    //cargar data del hotel
    const hotelStore = useHotelStore();
    //se guarda el subdominio en localstorage en caso de existir
    // if(!stayId || !guestId){
    //     localStorage.removeItem('subdomain');
    // }
    if(chainStore.chainData?.type == 'INDEPENDENT'){
        utils.saveHotelSlug(chainStore.chainData?.independentSubdomain);    
    }else{
        utils.saveHotelSlug(to.params.hotelSlug);
    }
    await hotelStore.$load();
    let hotel = hotelStore.hotelData;
    // Añade la verificación de que no estás ya en 'Home'
    if (hotel && to.name == 'ChainLanding') {
        return next({ name: 'Home', params :{ hotelSlug: hotel.subdomain }, query: to.query });
    }

    ////////////////////////////////////////////////////////
    //
    //
    //cargar data huesped
    if(guestId){
        console.log('test middle guestId',guestId)
        await guestStore.findByIdInSetLocalGuest(guestId)
    }
    ////////////////////////////////////////////////////////
    //
    //
    //cargar data stay
    if(stayId){
        console.log('test middle stayId',stayId)
        await stayStore.findByIdInSetLocalStay(stayId)
    }
    ////////////////////////////////////////////////////////
    //
    //
    //data extra
    const localeStore = useLocaleStore();
    if (utils.isMockup() || !localStorage.getItem('guestId')) {
        let lang = hotel?.language_default_webapp ?? localeStore.localeCurrent;
        if(localeStore.localeCurrent !== 'es'){
            lang = localeStore.localeCurrent;
        }
        localeStore.$loadByURL(lang);
    } else if (!utils.isMockup()) {
        let lang = localeStore.localeCurrent !== i18n.global.locale.value ? localeStore.localeCurrent : null;
        localeStore.$loadByURL(lang);
    }

    if (to.meta.verifyHotel && !hotel) {
        return next({ name: 'NotFound' });
    }

    //validar sesion 
    authStore.$validateSession(to, next);
    authStore.$goLoginBySocialNetwork();
    //
    // Agrega la nueva ruta al historial
    if(authStore.sessionActive){
        historyStore.$addRoute({
            name: to.name,
            params: to.params,
            query: to.query
        })
    }
    next();
}
