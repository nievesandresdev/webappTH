const AppLayout = () => import('@/layout/AppLayout')
const WindowChatMobile = () => import('@/Modules/Chat/WindowMobile.vue')
const WindowChatRed = () => import('@/Modules/Chat/WindowChatRed.vue')
const FakeChatMobile = () => import('@/Modules/Chat/FakeWindowChat.vue')

const chatRoutes = [
  {
    path: 'chat',
    component: AppLayout,
    meta: {
      verifyHotel: true
    },
    children: [
      {
        name: 'Chat',
        path: '',
        component: WindowChatRed
      },
      {
        name: 'FakeChat',
        path: 'fake',
        component: FakeChatMobile,
        props: (route) => ({ paramsRouter: {...route.params} })
      },
    ],
  },
];

export default chatRoutes;
