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
            form: {},
            rewardForm: {},
            rewards: [],
            color: '#ccc',
            showReward: false,
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
        updateReward(index) {
            this.rewardForm = this.rewards[index];
            this.rewardForm.id = index;
        },
        addReward() {
            if ('name' in this.rewardForm && 'interest' in this.rewardForm ){
                // If there is an index hidden field it means we
                // are updating a reward not adding a new one
                if ('id' in this.rewardForm){
                    this.rewards[this.rewardForm.id] = this.rewardForm;
                } else {
                    this.rewards.push(this.rewardForm);
                }
                this.rewardForm = {};
            }
        },
        removeReward(rewName) {
            this.rewards = this.rewards.filter( obj => obj.name !== rewName);
        }
    },
});  