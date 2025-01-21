const ProfilePage = () => import('@/Modules/User/ProfilePage.vue')
const MyStays = () => import('@/Modules/User/MyStays.vue')
const PersonalInfo = () => import('@/Modules/User/PersonalInfo.vue')
const ReservationStay = () => import('@/Modules/User/ReservationStay.vue')
const SelectLanguage = () => import('@/Modules/User/SelectLanguage.vue') 
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
        name: 'SelectLanguage',
        path: 'seleccionar-idioma',
        component: SelectLanguage
      },
      //reservation
      {
        name: 'ReservationStay',
        path: 'reservar-estancia',
        component : ReservationStay
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
