import { defineComponent } from "vue";
import { deleteCard, updateCard } from "@/helpers/firebase";
import { format, getDate, addMonths, parse } from "date-fns";
import ship from "@/assets/ship.png";

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
    data(){
        return {
            ship
        }
    },
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
            let month = format(today,'MM');
            // console.log('date',today,'-todaysDay',todaysDay,'-month',  month);
            if (cutDay <= todaysDay){
                month = format(addMonths(today, 1), 'MM');
            }
            return `${month}/${cutDay.toString().padStart(2, '0')}`;
        },
        paidDate(paidDay){
            return format(parse(paidDay, 'yyyy-MM-dd', new Date()),'MM/dd');
        },
        getCardLogo(type){
            const typeFileName = type.toLowerCase().replaceAll(' ', '-');
            return new URL(`/src/assets/card-logos/${typeFileName}.svg`, import.meta.url).href;
        }
    },
    computed: {
        dynamicColor(){
            return {
                '--mainColor': '#ccc'
            }
        },
    }

});  