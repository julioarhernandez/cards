import { defineComponent } from "vue";

export default defineComponent({
    name: 'Nav',
    props: ['userAvatar'],
    data(){
        return {
            showMenu: false,
        }
    },
});  