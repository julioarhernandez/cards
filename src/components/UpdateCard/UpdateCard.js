import { defineComponent } from "vue";
import { getCard, updateCard } from "@/helpers/firebase";
import { VSwatches } from 'vue3-swatches';
// import RewardCard from "@/components/RewardCard/RewardCard.vue";
import 'vue3-swatches/dist/style.css';

export default defineComponent({
    name: 'UpdateCard',
    props:['id'],
    components: { VSwatches },
    data(){
        return {
            form: {},
            rewardForm: {},
            rewards: [],
            color: '#ccc',
            updated: false,
        }
    },
    methods: {
        // addNewReward(){
        //     // clean all empty rewards
        //     console.log('new reward', this.newReward);
        //     if (this.newReward){
        //         this.form.rewards.push(this.newReward);
        //     }
        //     this.updCard().then(()=>{
        //         this.newReward = {};
        //     });
        //
        // },
        async updCard(){
            try {
                this.form.rewards = this.rewards;
                await updateCard(this.id, this.form);
                this.updated = true;
            }catch (error) {
                alert(error)
            }
        },
        addReward() {
            if ('name' in this.rewardForm){
                // If there is an index hidden field it means we
                // are updating a reward not adding a new one
                if ('id' in this.rewardForm){
                    this.rewards[this.rewardForm.id] = this.rewardForm;
                } else {
                    this.rewards.push(this.rewardForm);
                }
                this.updCard().then(()=>{
                    console.log('card updated');
                });
                this.rewardForm = {};
            }
        },
        updateReward(index) {
            this.rewardForm = this.rewards[index];
            this.rewardForm.id = index;
        },
        removeReward(rewName) {
            this.rewards = this.rewards.filter( obj => obj.name !== rewName);
            this.updCard().then(()=>{
                console.log('card updated');
            });
        },
        async getCardData(id){
            return this.form = await getCard(id)
        }
    },
    watch: {
        // New id is being watched
        id(newId, oldId) {
          if (newId !== oldId) {
            this.getCardData(newId);
          }
        }
      },
    mounted() {
        this.getCardData(this.id).then(()=>{
            this.rewards = this.form.rewards;
        });

    }
});  