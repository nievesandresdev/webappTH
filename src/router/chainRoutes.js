//
const ChainLanding = () => import(/* webpackChunkName: "home" */ '@/Modules/Chain/ChainLanding.vue')
// const CompleteRegister = () => import(/* webpackChunkName: "home" */ '@/Modules/Chain/CompleteRegister.vue')
const RegisterLayout = () => import(/* webpackChunkName: "home" */ '@/Modules/Chain/RegisterLayout.vue')
const HotelsList = () => import(/* webpackChunkName: "home" */ '@/Modules/Chain/HotelsList.vue')
const CreateStay = () => import(/* webpackChunkName: "home" */ '@/Modules/Chain/CreateStay.vue')


const chainRoutes = [
  {
    // Ruta independiente sin layout
    path: '',
    name: 'ChainLanding',
    component: ChainLanding,
    props: (route) => ({ acform: route.query.acform })
  },
  {
    // Rutas que usan el layout
    path: '',
    component: RegisterLayout,
    children: [
      {
        name: 'HotelsList',
        path: 'lista-de-alojamientos',
        component: HotelsList,
        meta: { index: 2 },
      },
      {
        name: 'CreateStayFromChain',
        path: ':hotelSlug/crear-estancia-cadena',
        component: CreateStay,
        meta: { index: 1 },
      },
    ],
  },
];

export default chainRoutes;
