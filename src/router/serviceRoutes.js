const AppLayout = () => import(/* webpackChunkName: "layout" */ '@/layout/AppLayout');
const ListPage = () => import(/* webpackChunkName: "service" */ '@/Modules/Service/ListPage.vue');
const DetailPage = () => import(/* webpackChunkName: "service" */ '@/Modules/Service/DetailPage.vue');
const DetailActivityExternalPage = () => import(/* webpackChunkName: "home" */ '@/Modules/Experience/DetailPage.vue')

const ListPageContenConfort = () => import(/* webpackChunkName: "service" */ '@/Modules/Service/ListPageContentConfort.vue');
const ListPageContenTransport = () => import(/* webpackChunkName: "service" */ '@/Modules/Service/ListPageContentTransport.vue');
const ListPageContentActivity = () => import(/* webpackChunkName: "service" */ '@/Modules/Service/ListPageContentActivity.vue');

import isMobile from '@/middlewares/isMobile';

const servicesChildRoutes = ['Confort', 'Transport', 'Activity'].map(name => ({
  name,
  path:`${name.toLowerCase()}`,
  component: () => import(`@/Modules/Service/ListPageContent${name}.vue`),
  props: (route) => ({ queryRouter: { ...route.query } }),
}));

const serviceRoutes = [
  {
    component: AppLayout,
    path: 'servicios',
    children: [
      {
        path: '',
        component: ListPage,
        children: servicesChildRoutes
      },
      {
        path: '',
        children: [
          {
            path: ':service/:slug',
            name: 'DetailService',
            component: DetailPage,
            meta: { hiddenMenu: true },
          },
          {
            path: 'activity-externa/:slug',
            name: 'DetailActivity',
            component: DetailActivityExternalPage,
            meta: { hiddenMenu: true },
            props: (route) => ({ paramsRouter: {...route.params} }),
          },
        ]
      },
    ]
  }
];

export default serviceRoutes;
