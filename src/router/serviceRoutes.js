const AppLayout = () => import(/* webpackChunkName: "layout" */ '@/layout/AppLayout');
const ListPage = () => import(/* webpackChunkName: "service" */ '@/Modules/Service/ListPage.vue');
const ListPageContenConfort = () => import(/* webpackChunkName: "service" */ '@/Modules/Service/ListPageContenConfort.vue');

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
    ]
  },
];

export default serviceRoutes;
