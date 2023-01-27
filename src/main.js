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
        newestOnTop: true,
        position: "top-center",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: false,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false
    })
    .mount('#app')
