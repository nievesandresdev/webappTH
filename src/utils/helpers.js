
import { i18n } from '@/i18n'
import { useHotelStore } from '@/stores/modules/hotel'

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

