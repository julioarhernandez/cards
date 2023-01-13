import { defineComponent } from "vue";
import { VSwatches } from 'vue3-swatches'
import 'vue3-swatches/dist/style.css'

export default defineComponent({
    name: 'NewCard',
    props: ['addNewCard', 'userEmail'],
    components: { VSwatches },
    emits: [],
    data(){
        return {
            showReward: false,
            form: {},
            rewardForm: {},
            rewards: [],
            color: '#ccc',
        }
    },
    methods: {
        async addCard(){
            // add rewards object to form
            this.form.rewards = this.rewards;
            const formVal = {...this.form, "user": this.userEmail, "color": this.color}
            await this.addNewCard(formVal);
            this.form = {};
            this.rewards = [];
        },
        addReward() {
            this.rewards.push(this.rewardForm);
            this.rewardForm = {};
        },
        removeReward(rewName) {
            this.rewards = this.rewards.filter( obj => obj.name !== rewName);
        }
    },
});  