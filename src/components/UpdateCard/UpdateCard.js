import { defineComponent } from "vue";
import { getCard, updateCard } from "@/helpers/firebase";



export default defineComponent({
    name: 'UpdateCard',
    props:['id'],
    data(){
        return {
            form: {},
            updated: false
        }
    },
    methods: {
        async updCard(){
            try {
                await updateCard(this.id, this.form);
                this.updated = true;
            }catch (error) {
                alert(error)
            }
        },
        removeReward(rewName) {
            this.form.rewards = this.form.rewards.filter( obj => obj.name !== rewName);
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