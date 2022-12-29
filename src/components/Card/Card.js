import { defineComponent } from "vue";
import { deleteCard, updateCard } from "@/helpers/firebase";
import { format, getDate, addMonths } from "date-fns";

export default defineComponent({
    name: 'Card',
    props: [ 
        'card',
        'daysLeft',
        'available', 
        'minAmount', 
        'maxAmount', 
        'paid'
    ],
    emits: ['cutPaidChanged', 'filterBy'],
    methods: {
        delCard(id){
            if (confirm("Sure?")){
                deleteCard(id);
            }
        },
        updCard(id){
            updateCard(id);
        },
        cutDate(cutDay){
            // if cutDay is lower than today's day cutMonth is month+1 else same month
            const today = new Date();
            const todaysDay = getDate(today);
            let month = format(today,'LLL');
            // console.log('date',today,'-todaysDay',todaysDay,'-month',  month);
            if (cutDay <= todaysDay){
                month = format(addMonths(today, 1), 'LLL');
            }
            return `${month}/${cutDay}`;
        }
    }

});  