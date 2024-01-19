import { createRouter, createWebHistory } from 'vue-router'
import homeRoutes from './homeRoutes'
import experienceRoutes from './experienceRoutes'
import placeRoutes from './placeRoutes'
import chatRoutes from './chatRoutes'
import facilityRoutes from './facilityRoutes'
import hotelRoutes from './hotelRoutes'
import policiesRoutes from './policiesRoutes'

import { useHotelStore } from '@/stores/modules/hotel'
import { useLocaleStore } from '@/stores/modules/locale'
import { loadSubdomain } from '@/utils/utils.js'

// COMPONENTS
const NotFoundPage = () => import(/* webpackChunkName: "home" */ '@/shared/NotFoundPage.vue')

const routes = [
  ...homeRoutes,
  ...experienceRoutes,
  ...placeRoutes,
  ...chatRoutes,
  ...facilityRoutes,
  ...hotelRoutes,
  ...policiesRoutes,
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Siempre desplazar a la parte superior cuando cambien las rutas
    return { top: 0 };
  }
})

router.beforeEach( async (to, from, next) => {
  const hotelStore = useHotelStore()
  const localeStore = useLocaleStore()
  localeStore.$load()
  loadSubdomain()
  await hotelStore.$load()
  let hotel = hotelStore.hotelData
  if (to.meta.verifyHotel && !hotel) {
    next({ name: 'NotFound' })
  }
  next()
})

export default router