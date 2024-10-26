// src/middleware/handleWebAppData.js
import { useHotelStore } from '@/stores/modules/hotel'
import { useGuestStore } from '@/stores/modules/guest'
import { useStayStore } from '@/stores/modules/stay'
import { useLocaleStore } from '@/stores/modules/locale'
import { useChainStore } from '@/stores/modules/chain'
import utils from '@/utils/utils.js';

export default async function handleWebAppData({ to, from, next }) {
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
    }
    // console.log('test chainSubdomain',chainStore.chainSubdomain)
    ////////////////////////////////////////////////////////
    //
    //
    //cargar data del hotel
    const hotelStore = useHotelStore();
    utils.saveHotelSlug(to.params.hotelSlug);
    await hotelStore.$load();
    let hotel = hotelStore.hotelData;
    // console.log('test init load', hotel);
    ////////////////////////////////////////////////////////
    //
    //
    //cargar data huesped
    const guestStore = useGuestStore();
    const guestId = utils.getUrlParam('g');
    if(guestId){
        await guestStore.findByIdInSetLocalGuest(guestId)
        // console.log('test init guest',guestStore.guestData)
    }
    ////////////////////////////////////////////////////////
    //
    //
    //cargar data stay
    const stayStore = useStayStore();
    const stayId = utils.getUrlParam('e');
    if(stayId){
        await stayStore.findByIdInSetLocalStay(stayId)
        // console.log('test init guest',stayStore.stayData)
    }
    ////////////////////////////////////////////////////////
    //
    //
    //data extra
    const localeStore = useLocaleStore();
    if (utils.isMockup() || !localStorage.getItem('guestId')) {
        localeStore.$load(hotel?.language_default_webapp);
    } else if (!utils.isMockup()) {
        localeStore.$load();
    }

    if (to.meta.verifyHotel && !hotel) {
        return next({ name: 'NotFound' });
    }
    next();
}
