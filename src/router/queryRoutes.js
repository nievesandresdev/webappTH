const AppLayout = () => import('@/layout/AppLayout')
const InboxIndex = () => import('@/Modules/Queries/InboxIndex.vue')
const FakeInboxIndex = () => import('@/Modules/Queries/FakeInboxIndex.vue')
const FakeLinksOtas = () => import('@/Modules/Queries/FakeLinksOtasRed.vue')

// import isMobile from '@/middlewares/isMobile'

const chatRoutes = [
  {
    path: 'inbox',
    component: AppLayout,
    meta: {
      verifyHotel: true,
    //   middleware: [
    //     isMobile
    //  ]
    },
    children: [
      {
        name: 'Inbox',
        path: '',
        component: InboxIndex,
        // meta: { skipMobileCheck: true }
      },
      {
        name: 'FakeInboxIndex',
        path: 'fake',
        component: FakeInboxIndex,
        props: (route) => ({ paramsRouter: {...route.query} })
      },
      {
        name: 'FakeLinksOtas',
        path: 'fakeLinkOtas',
        component: FakeLinksOtas,
        props: (route) => ({ paramsRouter: {...route.query} })
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
