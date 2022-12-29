import { defineComponent } from "vue";
import { deleteCard } from "@/helpers/firebase";
import { updateCard } from "@/helpers/firebase";

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
        }
    }

});  