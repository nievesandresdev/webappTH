const AppLayout = () => import(/* webpackChunkName: "home" */ '@/layout/AppLayout')
const LegalWarning = () => import(/* webpackChunkName: "home" */ '../Modules/Policies/LegalWarning.vue')
const PrivacyPolicies = () => import(/* webpackChunkName: "home" */ '../Modules/Policies/PrivacyPolicies.vue')
const CookiePolicies = () => import(/* webpackChunkName: "home" */ '../Modules/Policies/CookiePolicies.vue')
const TermsConditions = () => import(/* webpackChunkName: "home" */ '../Modules/Policies/TermsConditions.vue')

import isMobile from '@/middlewares/isMobile'

const homeRoutes = [
    {
        path: '/politicas',
        component: AppLayout,
        meta: {
            verifyHotel: true,
            middleware: [
              isMobile
           ]
          },
        children: [
        {
            name: 'LegalWarning',
            path: '/aviso-legal',
            component: LegalWarning
        },
        {
            name: 'PrivacyPolicies',
            path: '/privacidad',
            component: PrivacyPolicies
        },
        {
            name: 'CookiePolicies',
            path: '/cookies',
            component: CookiePolicies
        },
        {
            name: 'TermsConditions',
            path: '/cookies',
            component: TermsConditions
        },
        ],
    },
];

export default homeRoutes;
