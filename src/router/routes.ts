import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', redirect: '/dashboard' },
            { path: 'demo', component: () => import('pages/DemoPage.vue') },
            { path: 'dashboard', component: () => import('pages/DashboardPage.vue') },
            { path: 'settings', component: () => import('pages/SettingsPage.vue') },
            { path: 'profile/:profileId(\\d+)', props: true, component: () => import('pages/ProfilePage.vue') }
        ],
    },

    {
        path: '/login',
        component: () => import('pages/LoginPage.vue'),
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
