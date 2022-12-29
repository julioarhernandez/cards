import {createRouter, createWebHistory} from 'vue-router';
import Home from '@/views/Home.vue';
import EditCard from '@/views/EditCard.vue';
import NewCardView from '@/views/NewCardView.vue';

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/newcard', name: 'New Card', component: NewCardView},
    {path: '/editcard/:id', name: 'Edit Card', component: EditCard},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;