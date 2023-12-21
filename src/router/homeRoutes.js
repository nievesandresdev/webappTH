const HomePage = () => import(/* webpackChunkName: "home" */ '../Modules/Home/Pages/HomePage.vue');

const homeRoutes = [
  { path: '/', component: HomePage },
];

export default homeRoutes;