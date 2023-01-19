import { defineComponent } from "vue";
import { getCard, updateCard } from "@/helpers/firebase";
import { VSwatches } from 'vue3-swatches';
import { useToast } from "vue-toastification";
import 'vue3-swatches/dist/style.css';

const toast = useToast();

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
                toast.success("Card Updated", {
                    position: "top-center",
                    timeout: 5000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: false,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: false,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
            }catch (error) {
                toast.success(error, {
                    position: "top-center",
                    timeout: 5000,
                    closeOnClick: true,
                    pauseOnFocusLoss: true,
                    pauseOnHover: true,
                    draggable: false,
                    draggablePercent: 0.6,
                    showCloseButtonOnHover: false,
                    hideProgressBar: false,
                    closeButton: "button",
                    icon: true,
                    rtl: false
                });
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
                this.updCard().then(()=>{
                    toast.success("Reward Updated", {
                        position: "top-center",
                        timeout: 5000,
                        closeOnClick: true,
                        pauseOnFocusLoss: true,
                        pauseOnHover: true,
                        draggable: false,
                        draggablePercent: 0.6,
                        showCloseButtonOnHover: false,
                        hideProgressBar: false,
                        closeButton: "button",
                        icon: true,
                        rtl: false
                    });
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