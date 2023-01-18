import { defineComponent } from "vue";
import Filter from "@/components/Filter/Filter.vue";


export default defineComponent({
    name: 'Nav',
    props: ['userAvatar', 'handleSignOut'],
    components: { Filter },
    data(){
        return {
            showMenu: false,
            showFilter: false,
        }
    },
    methods:{
        signOut(){
            this.handleSignOut();
            this.showMenu = false;
        }
    }
});  