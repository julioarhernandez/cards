import { defineComponent } from "vue";
import { formatDistanceToNowStrict, differenceInDays } from 'date-fns'

import Card from "../Card/Card.vue";

export default defineComponent({
    name: 'CardList',
    components: { Card },
    props: [ 'list','maxPercentage', 'minPercentage' ],
    methods: {
        dateDiff(cd){
            let cutDate = new Date(cd);
            return formatDistanceToNowStrict(cutDate, { addSuffix: true });
        },
        isCardAvailable(cd){
            // if cutDate - today <= 3 or >=0 
            const today = new Date();
            const cutDate = new Date(cd);
            const diffInDays = differenceInDays(cutDate, today);
            console.log(diffInDays);
            return ((diffInDays < 0) || (diffInDays > 3));
        },
        minIdealPercentage(card){
            return (card.credit * this.minPercentage/100);
        },
        maxIdealPercentage(card){
            return (card.credit * this.maxPercentage/100);
        }
    }
})  