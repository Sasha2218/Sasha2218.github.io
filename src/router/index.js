import { createRouter, createWebHistory } from 
'vue-router';
import homeView from '@/views/homeView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import jobsVue from '@/views/jobsVue.vue';
import JobVue from '@/views/JobVue.vue';
import addJobView from '@/views/addJobView.vue';
import EditJobView from '@/views/EditJobView.vue';
import logInView from '@/views/logInView.vue';
import logOutView from '@/views/logOutView.vue';
import registerView from '@/views/registerView.vue';
import settingView from '@/views/settingView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homeView
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: jobsVue
    },
    {
        path: '/jobs/:id',
        name : 'job',
        component: JobVue
    },
    {
        path: '/jobs/add',
        name: 'add-job',
        component: addJobView
    },
     {
        path: '/jobs/edit/:id',
        name : 'edit-job',
        component: EditJobView
    },
     {
        path: '/login',
        name : 'login-account',
        component: logInView
    },
    {
        path: '/register',
        name : 'register-account',
        component: registerView
    },
    {
        path: '/logout',
        name : 'logOut-account',
        component: logOutView
    },
     {
        path: '/setting',
        name : 'settings-account',
        component: settingView
    },
    {
        path: '/:catchAll(.*)',
        name: 'not-found',
        component: NotFoundView
    },
  ],
});

export default router;