import { defineComponent } from "vue";
import Filter from "@/components/Filter/Filter.vue";


export default defineComponent({
    name: 'Nav',
    props: ['userAvatar', 'handleSignOut', 'filterBy','filterRewardCategory','resetFilterBy','isLoggedIn'],
    components: { Filter },
    data(){
        return {
            showMenu: false,
            showFilter: false,
        }
    },
    methods:{
        toggleFilterIcon(){
            if (this.showFilter){
                this.resetFilterBy();
            }
            this.showFilter = !this.showFilter;
        },
        getDynamicUserAvatar(){
            const defaultAvatar = new URL('/src/assets/user.png', import.meta.url).href;
            return this.isLoggedIn ? this.userAvatar : defaultAvatar;
        },
        signOut(){
            this.handleSignOut();
            this.showMenu = false;
        }
    }
});  