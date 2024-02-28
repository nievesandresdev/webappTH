const AppLayout = () => import('@/layout/AppLayout')
const QueriesIndex = () => import('@/Modules/Queries/QueriesIndex.vue')

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
    ],
  },
];

export default chatRoutes;
