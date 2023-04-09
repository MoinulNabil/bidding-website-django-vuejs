import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';


import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_HOST || 'http://localhost:8000';


createApp(App).use(store).use(router, axios).mount('#app')
