import { defineComponent } from "vue";

export default defineComponent({
    name: 'NewCard',
    props: ['addNewCard'],
    emits: [],
    data(){
        return {
            form: {}
        }
    },
    methods: {
        async addCard(){
            await this.addNewCard(this.form);
        }
    },
});  