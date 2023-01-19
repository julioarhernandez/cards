import { defineComponent } from "vue";
import filters from "@/helpers/filters.js";

export default defineComponent({
    name: 'Filter',
    props: ['filterRewardCategory'],
    emits: [ 'filterBy'],
    data(){
        return {
            show: false,
            showSearch: false,
            searchContent: "",
            filters,
        }
    },
    methods:{
        hideMenu(){
            this.show = false;
        }
    }
});  