const AppLayout = () => import(/* webpackChunkName: "home" */ '@/layout/AppLayout')
const ListFacility = () => import(/* webpackChunkName: "home" */ '@/Modules/Facility/ListFacility.vue')
const ShowFacility = () => import(/* webpackChunkName: "home" */ '@/Modules/Facility/ShowFacility.vue')
const DetailPageFake = () => import(/* webpackChunkName: "home" */ '@/Modules/Facility/DetailPageFake.vue')

import isMobile from '@/middlewares/isMobile'

const homeRoutes = [
  {
    path: '/',
    // component: AppLayout,
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
        component: ListFacility,
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
      // {
      //   name: 'FacilityList',
      //   path: '',
      //   component: ListFacility,
      // },
      
    ],
  },
  {
    name: 'ShowFacility',
    path: 'instalaciones/ver-instalacion/:id', 
    component: ShowFacility,
    props: true, 
  },
  
];

export default homeRoutes;