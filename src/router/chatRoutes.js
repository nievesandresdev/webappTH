const AppLayout = () => import('@/layout/AppLayout')
const WindowChatMobile = () => import('@/Modules/Chat/WindowMobile.vue')
const WindowChatRed = () => import('@/Modules/Chat/WindowChatRed.vue')
const ChatTest = () => import('@/Modules/Chat/ChatTest.vue')
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
        name: 'ChatTest',
        path: 'test',
        component: ChatTest
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
