const ProfilePage = () => import('@/Modules/User/ProfilePage.vue')
const MyStays = () => import('@/Modules/User/MyStays.vue')
const PersonalInfo = () => import('@/Modules/User/PersonalInfo.vue')
const ReservationStay = () => import('@/Modules/User/ReservationStay.vue')
const SelectLanguage = () => import('@/Modules/User/SelectLanguage.vue') 
// const EditStay = () => import('@/Modules/User/EditStay.vue')
const LogoutPage = () => import('@/Modules/Auth/Logout.vue')
const MyStay = () => import('@/Modules/User/MyStay.vue')
const Guests = () => import('@/Modules/User/Guests.vue')
const CompleteCheckin = () => import('@/Modules/User/CompleteCheckin.vue')
const IsCompleteCheckin = () => import('@/Modules/User/IsCompleteCheckin.vue')

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
      // {
      //   name: 'EditStay',
      //   path: 'editar-estancia/:stayId',
      //   component: EditStay,
      //   props: (route) => ({ paramsRouter: {...route.params} })
      // },
      {
        name: 'LogoutUser',
        path: 'logout',
        component: LogoutPage,
        props: (route) => ({ paramsRouter: {...route.query} })
      },
      {
        name: 'MyStay',
        path: 'mi-estancia/:stayId',
        component: MyStay,
        props: (route) => ({ paramsRouter: {...route.params} })
      },
      {
        name: 'Guests',
        path: 'mi-estancia/huespedes',
        component: Guests
      },
      {
        name: 'CompleteCheckin',
        path: 'mi-estancia/huespedes/completar-checkin/:id',
        component: CompleteCheckin,
        props: (route) => ({ paramsRouter: {...route.params} })
      },
      {
        name: 'IsCompleteCheckin',
        path: 'mi-estancia/huespedes/checkin-completado',
        component: IsCompleteCheckin
      },
    ],
  },
];

export default profileRoutes;
