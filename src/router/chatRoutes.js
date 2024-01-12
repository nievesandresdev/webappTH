const AppLayout = () => import(/* webpackChunkName: "home" */ '@/layout/AppLayout')
const WindowChatMobile = () => import(/* webpackChunkName: "home" */ '@/Modules/Chat/WindowMobile.vue')

const chatRoutes = [
  {
    path: '/mobile-chat',
    component: AppLayout,
    meta: { verifyHotel: true },
    children: [
      {
        name: 'WindowChatMobile',
        path: '',
        component: WindowChatMobile
      },
    ],
  },
];

export default chatRoutes;
