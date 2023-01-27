import { defineComponent } from "vue";

export default defineComponent({
    name: 'FilterSelect',
    props: ['label','modelValue', 'items'],
    emits: ['update:modelValue'],
    data() {
        return {
            search: '',
            results: [...this.items],
            isOpen: false,
            isFiltering: false,
            arrowCounter: -1
        }
    },
    methods:{
        filterResults() {
            if (this.search){
                this.isFiltering = true;
            }else{
                this.isFiltering = false;
            }
            this.results = this.items.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
        },
        setResult(result) {
            this.search = result;
            this.isOpen = false;
            this.arrowCounter = -1;
        },
        onArrowDown() {
            if (this.arrowCounter < this.results.length) {
                this.arrowCounter = this.arrowCounter + 1;
            }
        },
        onArrowUp() {
            if (this.arrowCounter > 0) {
                this.arrowCounter = this.arrowCounter - 1;
            }
        },
        onEnter() {
            if (this.results.length) {
                if (this.arrowCounter > -1) {
                    this.setResult(this.results[this.arrowCounter]);
                } else {
                    if (this.results.length === 1){
                        this.setResult(this.results[0]);
                    }
                }

            }
        },
        onChange(e) {
            this.search = e.target.value;
            this.filterResults();
            this.isOpen = true;
        },
        onFocus(){
            this.isOpen = true;
        },
        handleClickOutside(event) {
            if (!this.$el.contains(event.target)) {
                this.arrowCounter = -1;
                this.isOpen = false;
            }
        }
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    destroyed() {
        document.removeEventListener('click', this.handleClickOutside);
    },
    watch:{
        search(newSearch, oldSearch){
            if (newSearch !== oldSearch) {
                this.$emit('update:modelValue', newSearch);
            }
        },
        modelValue(newMV, oldMV){
            if (newMV !== oldMV) {
                this.search = newMV;
                console.log('modelValue', newMV);
            }
        }
    }

});  