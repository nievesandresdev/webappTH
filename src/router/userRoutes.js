const ProfilePage = () => import('@/Modules/User/ProfilePage.vue')

const profileRoutes = [
  {
    path: '',
    children: [
      {
        name: 'Profile',
        path: 'perfil',
        component: ProfilePage
      },
    ],
  },
];

export default profileRoutes;
