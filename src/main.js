import { createApp } from 'vue';
import './style.css';
import App from './components/App/App.vue';
import router from '@/router';
import VueTippy from 'vue-tippy';
import Toast from "vue-toastification";
import 'tippy.js/dist/tippy.css';
import "vue-toastification/dist/index.css";

createApp(App)
    .use(router)
    .use(VueTippy,{
        defaultProps: {
            maxWidth: 250
        }
    })
    .use(Toast, {
        transition: "Vue-Toastification__bounce",
        maxToasts: 10,
        newestOnTop: true
    })
    .mount('#app')
