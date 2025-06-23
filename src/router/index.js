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
const ProfilePageMockup = () => import(/* webpackChunkName: "home" */ '@/Modules/User/ProfilePageMockup.vue')
const AppLayout = () => import(/* webpackChunkName: "home" */ '@/layout/AppLayout')
const DisabledEmail = () => import('@/Modules/Email/DisabledEmail.vue');
const TestView1 = () => import('@/Modules/TestView1.vue');
const TestView2 = () => import('@/Modules/TestView2.vue');
const TestView3 = () => import('@/Modules/TestView3.vue');
const TestViewMain = () => import('@/Modules/TestCarousel.vue');

import GeneralRoutes from './chainRoutes';  // Asegúrate de que esta importación es correcta

function checkHotelSubdomain(to, from, next) {
  const subdomain = localStorage.getItem('subdomain');
  if (!subdomain) {
      console.log('test checkHotelSubdomain');
      return next({ name: 'ChainLanding', query: to.query });
  }
  next();
}

const routes = [
  //
  //
 
  // Rutas que no requieren el slug del hotel
  ...chainRoutes,
  /* {
    path: '/no-notificacion',
    name: 'DisabledEmail',
    component: DisabledEmail
  }, */
  
  {
    path: '/compartir',
    name: 'ScreenNotAllowed',
    component: ScreenNotAllowed,
    meta: {
      transition: 'fade'
    }
  },
  {
    path: '/test',
    name: 'Test',
    component: GoogleButton,
    meta: {
      transition: 'fade'
    }
  },
  {
    path: '/testFacebook',
    name: 'TestFacebook',
    component: TestFacebook,
    meta: {
      transition: 'fade'
    }
  },
  {
    name: 'ResetPassword',
    path: '/restablecer-contrasena',
    component: ResetPassword,
    meta: {
      transition: 'fade'
    }
  },
  ...policiesRoutes,
  //
  //
  // Rutas dinámicas (con slug)
  
  {
    path: '/:hotelSlug',
    beforeEnter: [
      checkHotelSubdomain,
        //middleware para enviar a la pantalla compartir en caso de esta en pc
        // este middleware debe funcionar solo para todas las urls con slug hotel
        //en middleware principal se maneja para chainlanding
      isMobile
    ],
    meta: {
      transition: 'fade'
    },
    children: [
      // aquí van todas las rutas que dependen del slug del hotel
      {
        path: 'no-notificacion',
        name: 'DisabledEmail',
        component: DisabledEmail,
        meta: {
          transition: 'fade'
        }
      },
      ...placeRoutes,
      ...profileRoutes,
      ...homeRoutes,
      ...experienceRoutes,
      ...serviceRoutes,
      ...chatRoutes,
      ...facilityRoutes,
      ...hotelRoutes,
      ...queryRoutes,
    ],
  },


  // Captura para cualquier URL no reconocida (debe ir al final)
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component: NotFoundPage,
    meta: {
      transition: 'fade'
    }
  },
];



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, behavior: 'smooth' };
  }
})

router.beforeEach(async (to, from, next) => {
  // Si la ruta requiere el slug del hotel y no está presente, redirigir
  if (to.params.hotelSlug === undefined && to.matched.some(record => record.path.includes(':hotelSlug'))) {
    next({ name: 'ChainLanding' });
    return;
  }

  /* if (to.name === 'ProfileMockup' || to.path.includes('/profile-mockup')) {
    return next();
  } */
  const middleware = to.meta.middleware ? [...to.meta.middleware, handleWebAppData] : [handleWebAppData];
  const context = { to, from, next };
  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  });
})

// Navegación global para manejar títulos dinámicos
router.beforeEach((to, from, next) => {
  // Obtener el título de la meta información
  let title
  if (to.meta.getDynamicTitle) {
    // Si hay una función para título dinámico, usarla
    title = to.meta.getDynamicTitle()
  } else {
    // Si no, usar el título estático o el título por defecto
    title = to.meta.title || 'The White Lotus'
  }

  // Establecer el título del documento
  document.title = title

  next()
})

export default router;