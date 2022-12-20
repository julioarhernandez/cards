import { defineComponent } from 'vue'
import Card from '../Card/Card.vue'
import CardList from '../CardList/CardList.vue'

export default defineComponent({
  name: 'App',
  components: { Card, CardList },
  data(){
    return {
        maxPercentage: 5,
        minPercentage: 3,
        cards: [
            {
                id: 1,
                name: 'capital one',
                number: '3456',
                cutDate: '12/21/2022',
                dueDate: '12/15/2022',
                cutPaid: false,
                cutDateBefore: 3,
                credit: 8000
            },
            {
                id:2,
                name: 'Amex',
                number: '3001',
                cutDate: '12/22/2022',
                dueDate: '12/24/2022',
                cutPaid: false,
                cutDateBefore: 3,
                credit: 10000
            },
            {
                id: 3,
                name: 'Discover',
                number: '1095',
                cutDate: '12/26/2022',
                dueDate: '12/30/2022',
                cutPaid: false,
                cutDateBefore: 3,
                credit: 5000
            }
        ]
    }
  }
})
