import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/indext'
import axios from "axios";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)
app.use(router)
    .use(store)
    .use(VueSweetalert2);

function initialize(store, router) {
    router.beforeEach((to, from, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const currentUser = store?.state?.Auth?.currentUser;
        if (requiresAuth && !currentUser) {
            next('/login');
        } else if (to.path === '/login' && currentUser) {
            next('/');
        } else {
            next();
        }
    });

    axios.interceptors.response.use(null, (error) => {
        if (error.response.status === 401) {
            store.commit('LOGOUT');
            router.push('/login');
        }

        return Promise.reject(error);
    });

    if (store?.getters?.currentUser) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters.CURRENT_USER.token}`;
    }
}
initialize(store, router)
app.mount('#app')


