const ChainLanding = () => import(/* webpackChunkName: "home" */ '@/Modules/Chain/ChainLanding.vue')

const GeneralRoutes = [
  {
    path: '',
    children: [
      {
        name: 'ChainLanding',
        path: '',
        component: ChainLanding
      },
    ],
  },
];

export default GeneralRoutes;
