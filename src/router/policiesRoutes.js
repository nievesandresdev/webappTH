const PrivacyPolicies = () => import(/* webpackChunkName: "home" */ '../Modules/Policies/PrivacyPolicies.vue');

const policiesRoutes = [
  {
    name: 'PrivacyPolicies',
    path: '/privacidad', 
    component: PrivacyPolicies
  },
];

export default policiesRoutes;
