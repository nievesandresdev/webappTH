const ProfilePage = () => import('@/Modules/User/ProfilePage.vue')
const MyStays = () => import('@/Modules/User/MyStays.vue')
const PersonalInfo = () => import('@/Modules/User/PersonalInfo.vue')
const EditStay = () => import('@/Modules/User/EditStay.vue')

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
        name: 'EditStay',
        path: 'editar-estancia/:stayId',
        component: EditStay,
        props: (route) => ({ paramsRouter: {...route.params} })
      }
      
    ],
  },
];

export default profileRoutes;
