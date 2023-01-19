import { createApp } from 'vue';
import './style.css';
import App from './components/App/App.vue';
import router from '@/router';
import VueTippy from 'vue-tippy';
import 'tippy.js/dist/tippy.css';

createApp(App)
    .use(router)
    .use(VueTippy,{
        defaultProps: {
            maxWidth: 250
        }
    })
    .mount('#app')
