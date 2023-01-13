import { defineComponent } from "vue";
import { getCard, updateCard } from "@/helpers/firebase";
import { VSwatches } from 'vue3-swatches'
import 'vue3-swatches/dist/style.css'

export default defineComponent({
    name: 'UpdateCard',
    props:['id'],
    components: { VSwatches },
    data(){
        return {
            form: {},
            updated: false,
            color: '#ccc'
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