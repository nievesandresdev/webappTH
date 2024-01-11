const AppLayout = () => import(/* webpackChunkName: "home" */ '@/layout/AppLayout')
const ListPage = () => import(/* webpackChunkName: "home" */ '@/Modules/Experience/ListPage.vue')

const homeRoutes = [
  {
    path: '/experiencias',
    component: AppLayout,
    meta: { verifyHotel: true },
    children: [
      {
        name: 'ExperienceList',
        path: '',
        component: ListPage
      },
    ],
  },
];

export default homeRoutes;
