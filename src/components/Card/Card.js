import { defineComponent } from "vue";

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
    emits: ['cutPaidChanged']
});  