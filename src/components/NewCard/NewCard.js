import { defineComponent } from "vue";
import filterSelect from "@/components/FilterSelect/FilterSelect.vue";
import PageHeader from "@/components/PageHeader/PageHeader.vue";
import { VSwatches } from 'vue3-swatches';
import { useToast } from "vue-toastification";
import 'vue3-swatches/dist/style.css';

const toast = useToast();

export default defineComponent({
    name: 'NewCard',
    props: ['addNewCard', 'userEmail'],
    components: { VSwatches, filterSelect, PageHeader },
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
                toast.success("Card Added");
                // redirect to home
                setTimeout(()=> {
                    this.$router.push('/');
                }, 1000);
            }catch (error) {
                toast.error(error);
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