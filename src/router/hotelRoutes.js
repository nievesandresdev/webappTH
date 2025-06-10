const AppLayout = () => import(/* webpackChunkName: "home" */ '@/layout/AppLayout')

// hotel
const AdminPage = () => import(/* webpackChunkName: "home" */ '@/Modules/Hotel/AdminPage.vue');
const ShowHotel = () => import(/* webpackChunkName: "home" */ '@/Modules/Hotel/ShowHotel.vue');

// facility
const ListFacility = () => import(/* webpackChunkName: "home" */ '@/Modules/Facility/ListFacility.vue');

// import isMobile from '@/middlewares/isMobile'

const homeRoutes = [
  {
    path: 'alojamiento',
    component: AppLayout,
    children: [
      {
        path: '',
        component: AdminPage,
        children: [
          {
            path: '',
            name: 'ShowHotel',
            component: ShowHotel,
            meta: { 
              index: 1,
            },
          },
          {
            path: 'instalaciones',
            name: 'FacilityList',
            component: ListFacility,
            meta: { 
              index: 2,
            },
          },
        ]
      }
    ],
  },
  
  

];

export default homeRoutes;