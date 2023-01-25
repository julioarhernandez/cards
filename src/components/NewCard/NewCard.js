import { defineComponent } from "vue";
import { VSwatches } from 'vue3-swatches'
import 'vue3-swatches/dist/style.css'
import {useToast} from "vue-toastification";

const toast = useToast();

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
            try {
                // add rewards object to form
                this.form.rewards = this.rewards;
                if (!this.form.color){
                    this.form.color = "#ccc";
                }
                const formVal = {...this.form, "user": this.userEmail}
                await this.addNewCard(formVal);
                this.form = {};
                this.rewards = [];
                toast.success("Card Added", {
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
                // redirect to home
                setTimeout(()=> {
                    this.$router.push('/');
                }, 1000);
            }catch (error) {
                toast.error(error, {
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