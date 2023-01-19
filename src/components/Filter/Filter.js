import { defineComponent } from "vue";
import filters from "@/helpers/filters.js";

export default defineComponent({
    name: 'Filter',
    props: ['filterRewardCategory','showFilter'],
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
        handleFilterInput(){
            this.$emit('filterBy', this.searchContent);
        }
    },
    watch: {
        // showFilter is being watched
        // reset filter and hide search form
        showFilter(newState, oldState) {
            if (newState !== oldState && !newState) {
                this.searchContent = "";
                this.showSearch = false;
            }
        }
    },
});  