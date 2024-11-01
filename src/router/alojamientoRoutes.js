
const ShowHotel = () => import(/* webpackChunkName: "home" */ '@/Modules/Hotel/ShowHotel.vue')

import isMobile from '@/middlewares/isMobile'

const alojamientoRoutes = [
  
  {
    path: '/alojamiento',
    name: 'ShowHotel',
    component: ShowHotel,
  },

];

export default alojamientoRoutes;