import { defineComponent } from "vue";

export default defineComponent({
    name: 'SignInCard',
    props: ['isLoggedIn'],
    emits: ['signInWithGoogle','handleSignOut']
});  