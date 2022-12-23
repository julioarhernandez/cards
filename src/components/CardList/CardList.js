import { defineComponent } from "vue";
import { getDate } from 'date-fns'

import Card from "../Card/Card.vue";

export default defineComponent({
    name: 'CardList',
    components: { Card },
    props: [ 'list','maxPercentage', 'minPercentage' ],
    methods: {
        dateDiff(cd){
            const todaysDay = getDate(new Date());
            const difference = todaysDay - cd - 1 ;
            let result = difference;
            if (difference == -1) {
                result = 30;
            }
            if (difference < -1) {
                result = cd - todaysDay - 1;
            }
            return result;
        },
        isCardAvailable(cd){
            // if cutDate - today <= 3 or >=0 
            let dateDifference = this.dateDiff(cd);
            return ((dateDifference < 0) || (dateDifference > 3));
        },
        minIdealPercentage(card){
            return (card.credit * this.minPercentage/100);
        },
        maxIdealPercentage(card){
            return (card.credit * this.maxPercentage/100);
        }
    }
})  