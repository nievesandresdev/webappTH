const AppLayout = () => import('@/layout/AppLayout')
const InboxIndex = () => import('@/Modules/Queries/InboxIndex.vue')
// const FakeQueriesIndex = () => import('@/Modules/Queries/FakeQueriesIndex.vue')
// const FakeLinksOtas = () => import('@/Modules/Queries/FakeLinksOtas.vue')

import isMobile from '@/middlewares/isMobile'

const chatRoutes = [
  {
    path: 'inbox',
    component: AppLayout,
    meta: {
      verifyHotel: true,
      middleware: [
        isMobile
     ]
    },
    children: [
      {
        name: 'Inbox',
        path: '',
        component: InboxIndex,
        // meta: { skipMobileCheck: true }
      },
      // {
      //   name: 'FakeQueriesIndex',
      //   path: 'fake',
      //   component: FakeQueriesIndex,
      //   props: (route) => ({ paramsRouter: {...route.query} })
      // },
      // {
      //   name: 'FakeLinksOtas',
      //   path: 'fakeLinkOtas',
      //   component: FakeLinksOtas,
      //   props: (route) => ({ paramsRouter: {...route.query} })
      // },
    ],
  },
];

export default chatRoutes;
