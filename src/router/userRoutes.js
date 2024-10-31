const ProfilePage = () => import('@/Modules/User/ProfilePage.vue')
const MyStays = () => import('@/Modules/User/MyStays.vue')
const PersonalInfo = () => import('@/Modules/User/PersonalInfo.vue')
const ResetPassword = () => import('@/Modules/User/ResetPassword.vue')

const profileRoutes = [
  {
    path: '',
    children: [
      {
        name: 'Profile',
        path: 'perfil',
        component: ProfilePage
      },
      {
        name: 'MyStays',
        path: 'mis-estancias',
        component: MyStays
      },
      {
        name: 'PersonalInfo',
        path: 'informacion-personal',
        component: PersonalInfo
      },
      {
        name: 'ResetPassword',
        path: 'restablecer-contrasena',
        component: ResetPassword
      }
      
    ],
  },
];

export default profileRoutes;
