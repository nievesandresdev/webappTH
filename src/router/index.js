import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomePage.vue';
import AboutUs from '@/views/AboutUs.vue';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: Home
    },
    {
      path: '/about-us',
      name: 'aboutUs',
      component: AboutUs
    }
  ]
});

export default router;
