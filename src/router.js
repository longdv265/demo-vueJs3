import Login from './components/Login.vue'
import Success from './components/Success.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/success',
        component: Success
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})
export default router
