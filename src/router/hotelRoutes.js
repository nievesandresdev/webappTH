const AppLayout = () => import(/* webpackChunkName: "home" */ '@/layout/AppLayout')
const DesktopPage = () => import(/* webpackChunkName: "home" */ '@/Modules/About/DesktopPage.vue')
const MobilePage = () => import(/* webpackChunkName: "home" */ '@/Modules/About/MobilePage.vue')
const ShowHotel = () => import(/* webpackChunkName: "home" */ '@/Modules/Hotel/ShowHotel.vue')

import isMobile from '@/middlewares/isMobile'

const homeRoutes = [
  {
    path: 'alojamiento',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'ShowHotel',
        component: ShowHotel,
      },
    ],
  },
  
  

];

export default homeRoutes;