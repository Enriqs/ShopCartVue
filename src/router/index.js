import { createWebHistory, createRouter } from "vue-router";
import Login from '../components/Login.vue';
import HomePage from '../components/Home.vue';
import About from '../components/About.vue';
import Detail from '../components/Detail.vue';
import Billing from '../components/Billing.vue';
import Notfound from '../components/Notfound.vue';

const routes = [
    {
        path:"/",
        alias:"/home",
        name:'home',
        component: HomePage
    },
    {
        path:'/about',
        name:'about',
        component: About
    },
    {
        path:'/login',
        name:'login',
        component: Login
    },
    {
        path:'/detail',
        name:'detail',
        component: Detail
    },
    {
        path:'/billing',
        name:'billing',
        component: Billing
    },
    {
        path:'/notfound', //exceptions 
        name:'notfound',
        component: Notfound
    },
    {
        path: "/:catchAll(.*)", // Unrecognized path automatically matches 404 (not found)
        redirect: '/notfound',
    },
];
const router = createRouter({
    history:createWebHistory(),
    routes
});

export default router;