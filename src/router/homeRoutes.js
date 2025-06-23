const AppLayout = () => import(/* webpackChunkName: "home" */ '@/layout/AppLayout');
const HomePage = () => import(/* webpackChunkName: "home" */ '@/Modules/Home/HomePageRed.vue');

const homeRoutes = [
  {
    path: '',
    component: AppLayout,
    meta: {
      verifyHotel: true,
    },
    children: [
      {
        name: 'Home',
        path: '',
        component: HomePage,
        props: (route) => ({ acform: route.query.acform })
      },
    ],
  },
];

export default homeRoutes;
