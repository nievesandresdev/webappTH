const ChainLanding = () => import(/* webpackChunkName: "home" */ '@/Modules/Chain/ChainLanding.vue')
const CompleteRegister = () => import(/* webpackChunkName: "home" */ '@/Modules/Chain/CompleteRegister.vue')
const HotelsList = () => import(/* webpackChunkName: "home" */ '@/Modules/Chain/HotelsList.vue')
const CreateStay = () => import(/* webpackChunkName: "home" */ '@/Modules/Chain/CreateStay.vue')
const chainRoutes = [
  {
    path: '',
    children: [
      {
        name: 'ChainLanding',
        path: '',
        component: ChainLanding
      },
      {
        name: 'CompleteRegister',
        path: 'completar-registro',
        component: CompleteRegister
      },
    ],
  },
];

export default chainRoutes;
