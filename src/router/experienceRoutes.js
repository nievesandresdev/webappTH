const AppLayout = () => import(/* webpackChunkName: "home" */ '@/layout/AppLayout')
const ListPage = () => import(/* webpackChunkName: "home" */ '@/Modules/Experience/ListPage.vue')
const DetailPage = () => import(/* webpackChunkName: "home" */ '@/Modules/Experience/DetailPage.vue')

import isMobile from '@/middlewares/isMobile'

const homeRoutes = [
  {
    path: 'experiencias',
    component: AppLayout,
    meta: {
      // verifyHotel: true,
    //   middleware: [
    //     isMobile
    //  ],
    },
    children: [
      {
        name: 'ExperienceList',
        path: '',
        component: ListPage,
        meta: {
          title: 'experience.list-page.title',
        },
        props: (route) => ({ queryRouter: {...route.query} })
      },
      {
        name: 'ExperienceDetail',
        path: ':slug',
        component: DetailPage,
        props: (route) => ({ paramsRouter: {...route.params} }),
        meta: { hiddenMenu: true },
      },
    ],
  },
];

export default homeRoutes;
