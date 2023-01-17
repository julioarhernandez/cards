import { defineComponent } from "vue";
import { VSwatches } from 'vue3-swatches'
import 'vue3-swatches/dist/style.css'

export default defineComponent({
    name: 'RewardCard',
    props: ['index', 'reward', 'value'],
    emits: ['removeReward'],
    components: { VSwatches },
    data(){
        return {
            form: {},
            show: false,
        }
    }
});  