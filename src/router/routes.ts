import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/demo',
        component: () => import('layouts/MainLayout.vue'),
        children: [{ path: '', component: () => import('pages/DemoPage.vue') }],
    },

    {
        path: '/',
        redirect: '/dashboard'
    },

    {
        path: '/login',
        component: () => import('pages/LoginPage.vue'),
    },

    {
        path: '/settings',
        component: () => import('layouts/MainLayout.vue'),
        children: [{ path: '', component: () => import('pages/SettingsPage.vue') }],
    },

    {
        path: '/dashboard',
        component: () => import('layouts/MainLayout.vue'),
        children: [{ path: '', component: () => import('pages/DashboardPage.vue') }],
    },

    {
        path: '/profile/:profileId(\\d+)',
        component: () => import('layouts/MainLayout.vue'),
        children: [{ path: '', props: true, component: () => import('pages/ProfilePage.vue') }],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
