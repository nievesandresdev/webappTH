const AppLayout = () => import('@/layout/AppLayout')
const QueriesIndex = () => import('@/Modules/Queries/QueriesIndex.vue')
const FakeQueriesIndex = () => import('@/Modules/Queries/FakeQueriesIndex.vue')

import isMobile from '@/middlewares/isMobile'

const chatRoutes = [
  {
    path: '/consultas',
    component: AppLayout,
    meta: {
      verifyHotel: true,
      middleware: [
        isMobile
     ]
    },
    children: [
      {
        name: 'QueriesIndex',
        path: '',
        component: QueriesIndex,
        meta: { skipMobileCheck: true }
      },
      {
        name: 'FakeQueriesIndex',
        path: 'fake',
        component: FakeQueriesIndex,
        props: (route) => ({ paramsRouter: {...route.query} })
      },
    ],
  },
];

export default chatRoutes;
