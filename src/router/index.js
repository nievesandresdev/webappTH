import { createRouter, createWebHistory } from 'vue-router'
import chainRoutes from './chainRoutes'
import homeRoutes from './homeRoutes'
// import experienceRoutes from './experienceRoutes'
// import placeRoutes from './placeRoutes'
// import chatRoutes from './chatRoutes'
// import facilityRoutes from './facilityRoutes'
// import hotelRoutes from './hotelRoutes'
// import queryRoutes from './queryRoutes'
// import policiesRoutes from './policiesRoutes'

import { useHotelStore } from '@/stores/modules/hotel'
import { useGuestStore } from '@/stores/modules/guest'
import { useLocaleStore } from '@/stores/modules/locale'
import { saveHotelSlug } from '@/utils/utils.js'

import middlewarePipeline from '@/middlewares'
import isDesktop from '@/middlewares/isDesktop'

import utils from '@/utils/utils.js'

// COMPONENTS
const NotFoundPage = () => import(/* webpackChunkName: "home" */ '@/shared/NotFoundPage.vue')
const ScreenNotAllowed = () => import(/* webpackChunkName: "home" */ '@/shared/ScreenNotAllowed.vue')
const GoogleButton = () => import(/* webpackChunkName: "home" */ '@/Modules/TestButton.vue')
const TestFacebook = () => import(/* webpackChunkName: "home" */ '@/Modules/TestFacebook.vue')


import GeneralRoutes from './chainRoutes';  // Asegúrate de que esta importación es correcta

const routes = [
  //
  //
  // Rutas que no requieren el slug del hotel
  ...chainRoutes,
  {
    path: '/compartir',
    name: 'ScreenNotAllowed',
    component: ScreenNotAllowed,
    beforeEnter: [isDesktop]
  },
  {
    path: '/test',
    name: 'Test',
    component: GoogleButton
  },
  {
    path: '/testFacebook',
    name: 'TestFacebook',
    component: TestFacebook
  },
  //
  //
  // Rutas dinámicas (con slug)
  {
    path: '/:hotelSlug',
    children: [
      // aquí van todas las rutas que dependen del slug del hotel
      ...homeRoutes,
      // ...experienceRoutes,
      // ...placeRoutes,
      // ...chatRoutes,
      // ...facilityRoutes,
      // ...hotelRoutes,
      // ...queryRoutes,
      // ...policiesRoutes,
    ]
  },

  // Captura para cualquier URL no reconocida (debe ir al final)
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage },
];



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Siempre desplazar a la parte superior cuando cambien las rutas
    return { top: 0 };
  }
})

router.beforeEach( async (to, from, next) => {
  const hotelStore = useHotelStore();
  const guestStore = useGuestStore();
  const localeStore = useLocaleStore();
  saveHotelSlug(to.params.hotelSlug);
  await hotelStore.$load();
  let hotel = hotelStore.hotelData;
  console.log('test hotelStore.load', hotel)
  
  if (utils.isMockup() || !localStorage.getItem('guestId')) {
    localeStore.$load(hotel?.language_default_webapp);
  } else if (!utils.isMockup()) {
    localeStore.$load();
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