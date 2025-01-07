// src/middleware/handleWebAppData.js
import { useHotelStore } from '@/stores/modules/hotel'
import { useGuestStore } from '@/stores/modules/guest'
import { useStayStore } from '@/stores/modules/stay'
import { useLocaleStore } from '@/stores/modules/locale'
import { useChainStore } from '@/stores/modules/chain'
import utils from '@/utils/utils.js';

export default async function handleWebAppData({ to, from, next }) {

    const stayStore = useStayStore();
    const guestStore = useGuestStore();
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
    let chainData;
    if (!chainSubdomain) {
        return next({ name: 'NotFound' }); // Redirige a la ruta NotFound
    }else{
        chainData = await chainStore.$loadChainData();
        if(!chainData) return next({ name: 'NotFound' }); // Redirige a la ruta NotFound
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
    if(chainData?.type == 'INDEPENDENT'){
        utils.saveHotelSlug(chainData?.independentSubdomain);    
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
        let lang = hotel?.language_default_webapp ?? 'es'
        localeStore.$load(lang);
    } else if (!utils.isMockup()) {
        localeStore.$load();
    }

    if (to.meta.verifyHotel && !hotel) {
        return next({ name: 'NotFound' });
    }
    next();
}
