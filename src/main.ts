import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from '@/api/Api';

import ElementPlus from 'element-plus';
import "../src/scss/global.scss"
import 'element-plus/lib/theme-chalk/index.css';


const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.config.globalProperties.$api = api
app.mount('#app')
