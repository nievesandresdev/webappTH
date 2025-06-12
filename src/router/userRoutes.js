const ProfilePage = () => import('@/Modules/User/ProfilePage.vue')
const ProfilePageMockup = () => import('@/Modules/User/ProfilePageMockup.vue')
const MyStays = () => import('@/Modules/User/MyStays.vue')
const ReservationStay = () => import('@/Modules/User/ReservationStay.vue')
const SelectLanguage = () => import('@/Modules/User/SelectLanguage.vue') 
// const EditStay = () => import('@/Modules/User/EditStay.vue')
const LogoutPage = () => import('@/Modules/Auth/Logout.vue')
const MyStay = () => import('@/Modules/User/MyStay.vue')
const Guests = () => import('@/Modules/User/Guests.vue')
const CompleteCheckin = () => import('@/Modules/User/CompleteCheckin.vue')
const AutoCompleteCheckin = () => import('@/Modules/User/AutoCompleteCheckin.vue')
const IsCompleteCheckin = () => import('@/Modules/User/IsCompleteCheckin.vue')
// MyData
const MyDataLayout = () => import('@/Modules/User/MyData/Layout.vue')
const PersonalInfo = () => import('@/Modules/User/MyData/PersonalInfo.vue')
const UbicationData = () => import('@/Modules/User/MyData/UbicationData.vue')
const ContactData = () => import('@/Modules/User/MyData/ContactData.vue')

const profileRoutes = [
  {
    path: '',
    children: [
      {
        path: 'mis-datos',
        component: MyDataLayout,
        children: [
          {
            path: 'informacion',
            component: PersonalInfo,
            name: 'PersonalInfo'
          },
          {
            path: 'ubicacion',
            component: UbicationData,
            name: 'UbicationData'
          },
          {
            path: 'contacto',
            component: ContactData,
            name: 'ContactData'
          }
        ]
      },
      {
        name: 'Profile',
        path: 'perfil',
        component: ProfilePage
      },
      {
        name: 'ProfileMockup',
        path: 'perfil-mockup',
        component: ProfilePageMockup
      },
      {
        name: 'MyStays',
        path: 'mis-estancias',
        component: MyStays
      },
      {
        name: 'SelectLanguage',
        path: 'seleccionar-idioma',
        component: SelectLanguage
      },
      {
        name: 'ReservationStay',
        path: 'reservar-estancia',
        component : ReservationStay
      },
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
        path: 'mi-estancia/huespedes/completar-checkin/:id?',
        component: CompleteCheckin,
        props: (route) => ({ paramsRouter: {...route.params} })
      },
      {
        name: 'IsCompleteCheckin',
        path: 'mi-estancia/huespedes/checkin-completado',
        component: IsCompleteCheckin
      },
      {
        name: 'AutoCompleteCheckin',
        path: 'mi-estancia/huespedes/autocompletar-checkin/:id',
        component: AutoCompleteCheckin,
        props: (route) => ({ paramsRouter: {...route.params} })
      },
    ],
  },
];

export default profileRoutes;
