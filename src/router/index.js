import { createRouter, createWebHistory } from 'vue-router'
import chainRoutes from './chainRoutes'
import homeRoutes from './homeRoutes'
import profileRoutes from './userRoutes'
import experienceRoutes from './experienceRoutes'
import serviceRoutes from './serviceRoutes'
import placeRoutes from './placeRoutes'
import chatRoutes from './chatRoutes'
import facilityRoutes from './facilityRoutes'
 import hotelRoutes from './hotelRoutes'
import queryRoutes from './queryRoutes'
import policiesRoutes from './policiesRoutes'

import middlewarePipeline from '@/middlewares'
import isDesktop from '@/middlewares/isDesktop'
import isMobile from '@/middlewares/isMobile'
import handleWebAppData from '@/middlewares/handleWebAppData';


import utils from '@/utils/utils.js'

// COMPONENTS
const NotFoundPage = () => import(/* webpackChunkName: "home" */ '@/shared/NotFoundPage.vue')
const ScreenNotAllowed = () => import(/* webpackChunkName: "home" */ '@/shared/ScreenNotAllowed.vue')
const GoogleButton = () => import(/* webpackChunkName: "home" */ '@/Modules/TestButton.vue')
const TestFacebook = () => import(/* webpackChunkName: "home" */ '@/Modules/TestFacebook.vue')
const ResetPassword = () => import(/* webpackChunkName: "home" */ '@/Modules/Auth/ResetPassword.vue')


import GeneralRoutes from './chainRoutes';  // Asegúrate de que esta importación es correcta

function checkHotelSubdomain(to, from, next) {
  const subdomain = localStorage.getItem('subdomain');
  if (!subdomain) {
      return next({ name: 'ChainLanding', query: to.query });
  }
  next();
}

const routes = [
  //
  //
  // Rutas que no requieren el slug del hotel
  ...chainRoutes,
  {
    path: '/compartir',
    name: 'ScreenNotAllowed',
    component: ScreenNotAllowed,
    // beforeEnter: [isDesktop]
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
  {
    name: 'ResetPassword',
    path: '/restablecer-contrasena',
    component: ResetPassword
  },
  //
  //
  // Rutas dinámicas (con slug)
  {
    path: '/:hotelSlug',
    beforeEnter: [checkHotelSubdomain],
    children: [
      // aquí van todas las rutas que dependen del slug del hotel
      ...placeRoutes,
      ...profileRoutes,
      ...homeRoutes,
      ...experienceRoutes,
      ...serviceRoutes,
      ...chatRoutes,
      ...facilityRoutes,
      ...hotelRoutes,
      ...queryRoutes,
      ...policiesRoutes,
    ],
    beforeEnter: [isMobile]
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

router.beforeEach((to, from, next) => {
  const middleware = to.meta.middleware ? [...to.meta.middleware, handleWebAppData] : [handleWebAppData];
  const context = { to, from, next };
  return middleware[0]({
      ...context,
      next: middlewarePipeline(context, middleware, 1)
  });
});


export default router;