const AppLayout = () => import(/* webpackChunkName: "layout" */ '@/layout/AppLayout');
const ListPage = () => import(/* webpackChunkName: "service" */ '@/Modules/Service/ListPage.vue');
const ListPageContenConfort = () => import(/* webpackChunkName: "service" */ '@/Modules/Service/ListPageContenConfort.vue');
const ListPageContenTransport = () => import(/* webpackChunkName: "service" */ '@/Modules/Service/ListPageContenTransport.vue');
const ListPageContentActivity = () => import(/* webpackChunkName: "service" */ '@/Modules/Service/ListPageContentActivity.vue');

import isMobile from '@/middlewares/isMobile';

const serviceRoutes = [
  {
    component: AppLayout,
    path: 'servicios',
    
    children: [
      {
        path: '',
        component: ListPage,
        // meta: {
          // verifyHotel: true,
        //   middleware: [
        //     isMobile
        //  ],
        // },
        children: [
          {
            name: 'Confort',
            path: 'confort',
            component: ListPageContenConfort,
            props: (route) => ({ queryRouter: {...route.query} }),
          },
          {
            name: 'Transport',
            path: 'transport',
            component: ListPageContenTransport,
            props: (route) => ({ queryRouter: {...route.query} }),
          },
          {
            name: 'Activity',
            path: 'activity',
            component: ListPageContentActivity,
            props: (route) => ({ queryRouter: {...route.query} }),
          },
        ]
      },
    ]
  }
];

export default serviceRoutes;
