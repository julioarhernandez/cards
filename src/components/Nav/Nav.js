import { defineComponent } from "vue";

export default defineComponent({
    name: 'Nav',
    props: ['userAvatar', 'handleSignOut'],
    data(){
        return {
            showMenu: false,
        }
    },
    methods:{
        signOut(){
            this.handleSignOut();
            this.showMenu = false;
        }
    }
});  