import { defineComponent } from "vue";
import { getCard, updateCard } from "@/helpers/firebase";
import { VSwatches } from 'vue3-swatches';
import RewardCard from "@/components/RewardCard/RewardCard.vue";
import 'vue3-swatches/dist/style.css';

export default defineComponent({
    name: 'UpdateCard',
    props:['id'],
    components: { VSwatches, RewardCard },
    data(){
        return {
            form: {},
            newReward: {},
            updated: false,
            color: '#ccc'
        }
    },
    methods: {
        addNewReward(){
            // clean all empty rewards
            if (this.newReward.length){
                this.form.rewards.push(this.newReward);
            }
            this.updCard().then(()=>{
                this.newReward = {};
            });

        },
        async updCard(){
            try {
                await updateCard(this.id, this.form);
                this.updated = true;
            }catch (error) {
                alert(error)
            }
        },
        removeRewardByName(rewName) {
            this.form.rewards = this.form.rewards.filter( obj => obj.name !== rewName);
        },
        removeReward(index) {
            this.form.rewards.splice(index,1);
            this.updCard().then(()=>{
                console.log('updated after deletion');
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
        this.getCardData(this.id);
    }
});  