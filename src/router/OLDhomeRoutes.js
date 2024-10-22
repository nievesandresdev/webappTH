const AppLayout = () => import(/* webpackChunkName: "home" */ '@/layout/AppLayout')
const HomePage = () => import(/* webpackChunkName: "home" */ '@/Modules/Home/HomePage.vue')

import isMobile from '@/middlewares/isMobile'

const homeRoutes = [
  {
    path: '',
    component: AppLayout,
    meta: {
      verifyHotel: true,
      middleware: [
        isMobile
     ]
    },
    children: [
      {
        name: 'Home',
        path: '',
        component: HomePage
      },
    ],
  },
];

export default homeRoutes;
