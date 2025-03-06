import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '@/pages/HomePage.vue';
import JobsPage from '@/pages/JobsPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import AddJobPage from '@/pages/AddJobPage.vue';
import JobDetailsPage from '@/pages/JobDetailsPage.vue';
import EditJobPage from '@/pages/EditJobPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: JobsPage
    },
    {
      path: '/job/add',
      name: 'add-job',
      component: AddJobPage
    },
    {
      path: '/job/:id', // id is a dynamic parameter and accepts only numbers
      name: 'job-details',
      component: JobDetailsPage,
      props: true
    },
    {
      path: '/job/:id/edit',
      name: 'edit-job',
      component: EditJobPage
    },
    {
      path: '/:pathMatch(.*)*', // Matches any unknown route
      name: 'NotFound',
      component: NotFoundPage
    }
  ]
});

export default router;
