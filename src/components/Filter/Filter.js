import { defineComponent } from "vue";

export default defineComponent({
    name: 'Filter',
    props: [],
    data(){
        return {
            show: false,
        }
    },
    methods:{
        hideMenu(){
            this.show = false;
        }
    }
});  