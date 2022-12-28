import { defineComponent } from "vue";

export default defineComponent({
    name: 'NewCard',
    props: ['addNewCard'],
    emits: [],
    data(){
        return {
            showReward: false,
            form: {},
            rewardForm: {},
            rewards: []
        }
    },
    methods: {
        async addCard(){
            // add rewards object to form
            this.form.rewards = this.rewards;
            await this.addNewCard(this.form);
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