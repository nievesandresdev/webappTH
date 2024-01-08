import { createRouter, createWebHistory } from 'vue-router'
import homeRoutes from './homeRoutes'
import { useHotelStore } from '@/stores/modules/hotel'
import { useLocaleStore } from '@/stores/modules/locale'
import { loadSubdomain } from '@/utils/utils.js'

const routes = [
  ...homeRoutes,
  // otras rutas...
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach( async (to, from, next) => {
  const hotelStore = useHotelStore()
  const localeStore = useLocaleStore()
  localeStore.$load()
  loadSubdomain()
  await hotelStore.$load()
  let hotel = hotelStore.hotelData
  if (to.meta.verifyHotel && !hotel) {
    next({ name: 'login' })
  }
  next()
})

export default router