const AppLayout = () => import('@/layout/AppLayout')
const QueriesIndex = () => import('@/Modules/Queries/QueriesIndex.vue')
const FakeQueriesIndex = () => import('@/Modules/Queries/FakeQueriesIndex.vue')

const chatRoutes = [
  {
    path: '/consultas',
    component: AppLayout,
    meta: { verifyHotel: true },
    children: [
      {
        name: 'QueriesIndex',
        path: '',
        component: QueriesIndex
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
