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
                cutDate: '20',
                dueDate: '15',
                cutPaid: false,
                cutDateBefore: 3,
                credit: 8000
            },
            {
                id:2,
                name: 'Amex',
                number: '3001',
                cutDate: '21',
                dueDate: '24',
                cutPaid: false,
                cutDateBefore: 3,
                credit: 10000
            },
            {
                id: 3,
                name: 'Discover',
                number: '1095',
                cutDate: '22',
                dueDate: '30',
                cutPaid: false,
                cutDateBefore: 3,
                credit: 5000
            },
            {
                id: 4,
                name: 'Wells Fargo',
                number: '5198',
                cutDate: '26',
                dueDate: '25',
                cutPaid: false,
                cutDateBefore: 3,
                credit: 1000
            },
        ]
    }
  }
})
