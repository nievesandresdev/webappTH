
// helpers.js
import { i18n } from '@/i18n'
import { DateTime } from 'luxon';
import { useHotelStore } from '@/stores/modules/hotel'
import { useStayStore } from '@/stores/modules/stay'
import { useShare } from "@/composables/useShare";

export function  $formatTypeLodging (){ 
    const hotelStore = useHotelStore()
    const type = hotelStore.hotelData?.type;
    //claves de traducciones
    const typeLodging = {
        hotel: 'layout.header.hotel',
        at: 'hotel.apartment',
        vft: 'hotel.apartment',
      }
    let defaultLetter = 'hotel.lodging';
    // return t(typeLodging?.[type] ?? defaultLetter);
    return i18n.global.t(typeLodging?.[type] ?? defaultLetter)

};

export function $currentPeriod() {

    const hotelStore = useHotelStore();
    const stayStore = useStayStore();
    if(!stayStore.stayData) return null;

    // Obtén las fechas y horas de check-in y check-out
    const { check_in, check_out } = stayStore.stayData;
    const { checkin, checkout } = hotelStore.hotelData;

    // Combina las fechas y horas en objetos DateTime de Luxon
    const checkInDateTime = DateTime.fromISO(check_in + 'T' + checkin);
    const checkOutDateTime = DateTime.fromISO(check_out + 'T' + checkout);

    // Obtiene el momento actual como un objeto DateTime
    const now = DateTime.local();

    // Compara el momento actual con los momentos de check-in y check-out
    if (now < checkInDateTime) {
        return 'pre-stay';
    } else if (now > checkOutDateTime) {
        return 'post-stay';
    } else {
        return 'in-stay';
    }
}

export async function  $openShareMenu (concept = 'invitetToWebapp', params = {}){ 

    const { shareContent } = useShare();
    const hotelStore = useHotelStore()
    const stayStore = useStayStore();

    let shareUrl;
    switch (concept) {
        case 'inviteToCheckin':
            shareUrl = await hotelStore.$buildUrlWebApp(hotelStore.hotelData?.subdomain,'mi-estancia/huespedes',`e=${stayStore.stayData?.id}&g=${params.guestId}`);
            break;
        default:
            shareUrl = await hotelStore.$buildUrlWebApp(hotelStore.hotelData?.subdomain,null,`e=${stayStore.stayData?.id}&guestPerStay=true`);
            break;
    }
    let data = {
        title: i18n.global.t('stay.share.title', { hotel: hotelStore.hotelData.name }),
        text: i18n.global.t('stay.share.text'),
        url: shareUrl,
    }
    shareContent(data);
};


