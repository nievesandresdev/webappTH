const AppLayout = () => import(/* webpackChunkName: "home" */ '@/layout/AppLayout')
const ListPage = () => import(/* webpackChunkName: "home" */ '@/Modules/Place/ListPage.vue')
const DetailPage = () => import(/* webpackChunkName: "home" */ '@/Modules/Place/DetailPage.vue')

import isMobile from '@/middlewares/isMobile'

const placeRoutes = [
  {
    path: 'lugares',
    component: AppLayout,
    // meta: {
    //   verifyHotel: true,
    //   middleware: [
    //     isMobile
    //  ]
    // },
    children: [
      {
        name: 'PlaceList',
        path: '',
        component: ListPage,
        props: (route) => ({ queryRouter: {...route.query} }),
      },
      // {
      //   name: 'PlaceDetail',
      //   path: ':id',
      //   component: DetailPage,
      //   props: (route) => ({ paramsRouter: {...route.params} })
      // },
    ],
  },
];

export default placeRoutes;