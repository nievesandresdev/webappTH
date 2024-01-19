const AppLayout = () => import(/* webpackChunkName: "home" */ '@/layout/AppLayout')
const DesktopPage = () => import(/* webpackChunkName: "home" */ '@/Modules/About/DesktopPage.vue')
const MobilePage = () => import(/* webpackChunkName: "home" */ '@/Modules/About/MobilePage.vue')

const homeRoutes = [
  {
    path: '/sobre-nosotros',
    component: AppLayout,
    meta: { verifyHotel: true },
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