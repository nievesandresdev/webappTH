const AppLayout = () => import(/* webpackChunkName: "home" */ '@/layout/AppLayout')
const DesktopPage = () => import(/* webpackChunkName: "home" */ '@/Modules/About/DesktopPage.vue')
const MobilePage = () => import(/* webpackChunkName: "home" */ '@/Modules/About/MobilePage.vue')

import isMobile from '@/middlewares/isMobile'

const homeRoutes = [
  {
    path: '/sobre-nosotros',
    component: AppLayout,
    meta: {
      verifyHotel: true,
      middleware: [
        isMobile
     ]
    },
    children: [
      {
        name: 'HotelAbout',
        path: '',
        component: window.innerWidth < 767 ? MobilePage : DesktopPage,
        props: (route) => ({ paramsRouter: {...route.params} })
      },
    ],
  },
];

export default homeRoutes;