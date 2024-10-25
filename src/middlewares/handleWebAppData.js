// src/middleware/handleWebAppData.js
import { useHotelStore } from '@/stores/modules/hotel'
import { useGuestStore } from '@/stores/modules/guest'
import { useStayStore } from '@/stores/modules/stay'
import { useLocaleStore } from '@/stores/modules/locale'
import { saveHotelSlug } from '@/utils/utils.js'
import utils from '@/utils/utils.js';

export default async function handleWebAppData({ to, from, next }) {
    
    //cargar data del hotel
    const hotelStore = useHotelStore();
    saveHotelSlug(to.params.hotelSlug);
    await hotelStore.$load();
    let hotel = hotelStore.hotelData;
    console.log('test init load', hotel);
    //
    //cargar data huesped
    const guestStore = useGuestStore();
    const guestId = utils.getUrlParam('g');
    if(guestId){
        await guestStore.findByIdInSetLocalGuest(guestId)
        console.log('test init guest',guestStore.guestData)
    }
    //
    //cargar data stay
    const stayStore = useStayStore();
    const stayId = utils.getUrlParam('e');
    if(stayId){
        await stayStore.findByIdInSetLocalStay(stayId)
        console.log('test init guest',stayStore.stayData)
    }
    
    
    
    
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
