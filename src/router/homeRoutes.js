const AppLayout = () => import(/* webpackChunkName: "home" */ '@/layout/AppLayout')
const HomePage = () => import(/* webpackChunkName: "home" */ '../Modules/Home/HomePage.vue')

const homeRoutes = [
  {
    path: '/',
    component: AppLayout,
    meta: { verifyHotel: true },
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
