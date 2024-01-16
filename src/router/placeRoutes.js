const AppLayout = () => import(/* webpackChunkName: "home" */ '@/layout/AppLayout')
const ListDesktopPage = () => import(/* webpackChunkName: "home" */ '@/Modules/Place/ListDesktopPage.vue')
const ListMobilePage = () => import(/* webpackChunkName: "home" */ '@/Modules/Place/ListMobilePage.vue')
// const DetailPage = () => import(/* webpackChunkName: "home" */ '@/Modules/Experience/DetailPage.vue')

const homeRoutes = [
  {
    path: '/places',
    component: AppLayout,
    meta: { verifyHotel: true },
    children: [
      {
        name: 'PlaceList',
        path: '',
        component: window.innerWidth < 700 ? ListMobilePage : ListDesktopPage,
        props: (route) => ({ queryRouter: {...route.query} })
      },
    //   {
    //     name: 'ExperienceDetail',
    //     path: ':slug',
    //     component: DetailPage,
    //     props: (route) => ({ paramsRouter: {...route.params} })
    //   },
    ],
  },
];

export default homeRoutes;