import { defineComponent } from "vue";
import { addMonths, differenceInDays, getDate, getMonth, getYear } from 'date-fns'

import Card from "../Card/Card.vue";

export default defineComponent({
    name: 'CardList',
    components: { Card },
    props: [ 'list','maxPercentage', 'minPercentage','cutPaidChanged', 'filterBy', 'sortBy','filterRewardCategory' ],
    emits: ['resetFilterBy'],
    methods: {
        dateDiff(cd){
            const todaysDate = new Date();
            const todaysDay = getDate(todaysDate);
            const todaysMonth = getMonth(todaysDate);
            const todaysYear = getYear(todaysDate);
            const difference = todaysDay - cd;
            let result = 0;
            if (difference >= 0) {
                //substract future date from today
                let cutDate = new Date(todaysYear, todaysMonth, cd);
                let futureCutDate = addMonths( cutDate, 1);
                let differenceAgainstFuture = differenceInDays(futureCutDate, todaysDate);
                result = differenceAgainstFuture;
            } else {
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