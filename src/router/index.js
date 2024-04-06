import { createRouter, createWebHistory } from 'vue-router'
import homeRoutes from './homeRoutes'
import experienceRoutes from './experienceRoutes'
import placeRoutes from './placeRoutes'
import chatRoutes from './chatRoutes'
import facilityRoutes from './facilityRoutes'
import hotelRoutes from './hotelRoutes'
import queryRoutes from './queryRoutes'
import policiesRoutes from './policiesRoutes'

import { useHotelStore } from '@/stores/modules/hotel'
import { useGuestStore } from '@/stores/modules/guest'
import { useLocaleStore } from '@/stores/modules/locale'
import { loadSubdomain } from '@/utils/utils.js'

import middlewarePipeline from '@/middlewares'
import isDesktop from '@/middlewares/isDesktop'

// COMPONENTS
const NotFoundPage = () => import(/* webpackChunkName: "home" */ '@/shared/NotFoundPage.vue')
const ScreenNotAllowed = () => import(/* webpackChunkName: "home" */ '@/shared/ScreenNotAllowed.vue')

const routes = [
  // { path: '/', redirect: '/webapp' },
  // {
  //   path: '/webapp',
  //   children: [
  //   ]
  // },
  ...homeRoutes,
  ...experienceRoutes,
  ...placeRoutes,
  ...chatRoutes,
  ...facilityRoutes,
  ...hotelRoutes,
  ...queryRoutes,
  ...policiesRoutes,
  {
    path: '/compartir',
    name: 'ScreenNotAllowed',
    component: ScreenNotAllowed,
    beforeEnter: [isDesktop]
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL + 'webapp'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Siempre desplazar a la parte superior cuando cambien las rutas
    return { top: 0 };
  }
})

router.beforeEach( async (to, from, next) => {
  const hotelStore = useHotelStore();
  const guestStore = useGuestStore();
  loadSubdomain();
  await hotelStore.$load();
  let hotel = hotelStore.hotelData;
  if (!guestStore.guestData && !localStorage.getItem('guestId')) {
    const localeStore = useLocaleStore();
    localeStore.$load(hotel?.language_default_webapp);
  }

  if (to.meta.verifyHotel && !hotel) {
    next({ name: 'NotFound' });
  }
  next();
});

router.beforeEach((to, from, next) => {
  /** Navigate to next if middleware is not applied */
  if (!to.meta.middleware) {
      return next();
  }

  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
    //   store  | You can also pass store as an argument
  }
  return middleware[0]({
      ...context,
      next:middlewarePipeline(context, middleware,1)
  });
});

export default router;