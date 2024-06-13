const AppLayout = () => import('@/layout/AppLayout')
const WindowChatMobile = () => import('@/Modules/Chat/WindowMobile.vue')
const FakeChatMobile = () => import('@/Modules/Chat/FakeWindowChat.vue')

import isMobile from '@/middlewares/isMobile'

const chatRoutes = [
  {
    path: '/mobile-chat',
    // component: AppLayout,
    meta: {
      verifyHotel: true,
      middleware: [
        isMobile
     ]
    },
    children: [
      {
        name: 'WindowChatMobile',
        path: '',
        component: WindowChatMobile
      },
      {
        name: 'FakeChatMobile',
        path: 'fake',
        component: FakeChatMobile,
        props: (route) => ({ paramsRouter: {...route.params} })
      },
    ],
  },
];

export default chatRoutes;
