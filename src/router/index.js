import {createRouter, createWebHistory} from 'vue-router';
import Home from '@/views/Home.vue';
import EditCard from '@/views/EditCard.vue';
import NewCardView from '@/views/NewCardView.vue';
import SignIn from '@/views/SignIn.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const routes = [
    {path: '/', name: 'Home', component: Home, meta: { auth: true }},
    {path: '/signin', name: 'Signin', component: SignIn, meta: { auth: false }},
    {path: '/newcard', name: 'New Card', component: NewCardView, meta: { auth: true }},
    {path: '/editcard/:id', name: 'Edit Card', component: EditCard, meta: { auth: true }},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        )
    });
}
router.beforeEach(async (to, from, next)=>{
    if (to.matched.some(record => record.meta.auth)){
        if (await getCurrentUser()){
            next();
        }else {
            // alert('you dont have access');
            next('/signin');
        }
    }else{
        next();
    }
});

export default router;