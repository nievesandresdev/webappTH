const AppLayout = () => import(/* webpackChunkName: "layout" */ '@/layout/AppLayout');
const ListPage = () => import(/* webpackChunkName: "service" */ '@/Modules/Service/ListPage.vue');
const ListPageContenConfort = () => import(/* webpackChunkName: "service" */ '@/Modules/Service/ListPageContenConfort.vue');
const ListPageContenTransport = () => import(/* webpackChunkName: "service" */ '@/Modules/Service/ListPageContenTransport.vue');
const ListPageContentActivity = () => import(/* webpackChunkName: "service" */ '@/Modules/Service/ListPageContentActivity.vue');

import isMobile from '@/middlewares/isMobile';

const serviceRoutes = [
  {
    path: 'servicios',
    component: ListPage,
    meta: {
      // verifyHotel: true,
    //   middleware: [
    //     isMobile
    //  ],
     title: 'experience.list-page.title',
    },
    props: (route) => ({ queryRouter: {...route.query} }),
    children: [
        {
          name: 'Confort',
          path: 'confort',
          component: ListPageContenConfort,
        },
        {
          name: 'Transport',
          path: 'transport',
          component: ListPageContenTransport,
        },
        {
          name: 'Activity',
          path: 'activity',
          component: ListPageContentActivity,
        },
    ]
  },
];

export default serviceRoutes;
