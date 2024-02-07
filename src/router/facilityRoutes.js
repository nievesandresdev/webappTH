const AppLayout = () => import(/* webpackChunkName: "home" */ '@/layout/AppLayout')
const ListPage = () => import(/* webpackChunkName: "home" */ '@/Modules/Facility/ListPage.vue')
const DetailPage = () => import(/* webpackChunkName: "home" */ '@/Modules/Facility/DetailPage.vue')

const homeRoutes = [
  {
    path: '/instalaciones',
    component: AppLayout,
    meta: { verifyHotel: true },
    children: [
      {
        name: 'FacilityList',
        path: '',
        component: ListPage,
        props: (route) => ({ queryRouter: {...route.query} })
      },
      {
        name: 'FacilityDetail',
        path: ':id',
        component: DetailPage,
        props: (route) => ({ paramsRouter: {...route.params} })
      },
    ],
  },
];

export default homeRoutes;