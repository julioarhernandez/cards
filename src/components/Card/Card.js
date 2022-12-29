import { defineComponent } from "vue";
import { deleteCard } from "@/helpers/firebase";

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
            deleteCard(id);
        }
    }

});  