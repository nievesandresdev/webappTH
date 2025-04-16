const PrivacyPolicies = () => import(/* webpackChunkName: "home" */ '../Modules/Policies/PrivacyPolicies.vue');

const policiesRoutes = [
  {
    name: 'PrivacyPolicies',
    path: 'privacidad', // <- SIN la barra '/'
    component: PrivacyPolicies
  },
];

export default policiesRoutes;
