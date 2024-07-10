import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'jquery';


const app = createApp(App)
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')
