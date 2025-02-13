// src/utils/navigation.js
import router from '@/router'
import { useHotelStore } from '@/stores/modules/hotel'
import { useChainStore } from '@/stores/modules/chain'

export function navigateTo(routeName, params = {}, query = {}) {
  const hotelStore = useHotelStore()
  const slug = hotelStore.subdomain ?? localStorage.getItem('subdomain');

  const chainStore = useChainStore();
  if (slug && chainStore?.chainData?.type !== "INDEPENDENT") {
    params.hotelSlug = slug
  }
  router.push({ name: routeName, params, query })
}
