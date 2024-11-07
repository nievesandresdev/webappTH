const AppLayout = () => import(/* webpackChunkName: "home" */ '@/layout/AppLayout')
const ListPage = () => import(/* webpackChunkName: "home" */ '@/Modules/Facility/ListPage.vue')
const DetailPage = () => import(/* webpackChunkName: "home" */ '@/Modules/Facility/DetailPage.vue')
const DetailPageFake = () => import(/* webpackChunkName: "home" */ '@/Modules/Facility/DetailPageFake.vue')

import isMobile from '@/middlewares/isMobile'

const homeRoutes = [
  {
    path: 'instalaciones',
    component: AppLayout,
    /* meta: {
      verifyHotel: true,
      middleware: [
        isMobile
     ]
    }, */
    children: [
      /* {
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
      {
        name: 'FacilityDetailFake',
        path: 'fakedetail',
        component: DetailPageFake
      }, */
      {
        name: 'FacilityList',
        path: '',
        component: ListPage,
      },
    ],
  },
];

export default homeRoutes;