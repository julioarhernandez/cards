import { defineComponent } from "vue";
import { getCard, updateCard } from "@/helpers/firebase";
import filterSelect from "@/components/FilterSelect/FilterSelect.vue";
import { VSwatches } from 'vue3-swatches';
import { useToast } from "vue-toastification";
import 'vue3-swatches/dist/style.css';

const toast = useToast();

export default defineComponent({
    name: 'UpdateCard',
    props: ['id'],
    components: { VSwatches, filterSelect },
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
        async updCard(showToast = true){
            try {
                this.form.rewards = this.rewards;
                await updateCard(this.id, this.form);
                this.updated = true;
                if (showToast) {
                    toast.success("Card Updated");
                }
            }catch (error) {
                toast.success(error);
            }
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
                // calling update card with false
                // to not show toast on card update
                // show on reward update only
                this.updCard(false).then(()=>{
                    toast.success("Reward Updated and Card saved");
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