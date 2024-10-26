// src/utils/navigation.js
import router from '@/router'
import { useHotelStore } from '@/stores/modules/hotel'

export function navigateTo(routeName, params = {}, options = {}) {
  const hotelStore = useHotelStore()
  const slug = hotelStore.subdomain;

  if (slug) {
    params.hotelSlug = slug
  }
  router.push({ name: routeName, params, ...options })
}
