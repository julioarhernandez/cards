import { parseISO, getMonth, getYear, isAfter, isBefore, format } from 'date-fns'
import { defineComponent } from 'vue'
import Card from '../Card/Card.vue'
import CardList from '../CardList/CardList.vue'

export default defineComponent({
  name: 'App',
  components: { Card, CardList },
  data(){
    return {
        filteredRewards: false,
        filterRewardCategory: '',
        maxPercentage: 5,
        minPercentage: 3,
        cards: [
            {
                id: 1,
                name: 'capital one',
                number: '3456',
                cutDate: '24',
                dueDate: '15',
                cutPaid: true,
                cutPaidDate: '2022-12-20',
                cutDateBefore: 3,
                credit: 8000,
                rewards:[
                    {
                        "name":"groceries",
                        "interest": 2,
                        "startDate":"2022-01-01",
                        "endDate":"2022-03-31",
                        "details": ""
                    },
                    {
                        "name":"gas",
                        "interest": 1.5,
                        "startDate":"2022-01-01",
                        "endDate":"2022-03-31",
                        "details": ""
                    },
                    {
                        "name":"amazon.com",
                        "interest": 5,
                        "startDate":"2022-01-01",
                        "endDate":"2022-03-31",
                        "details": ""
                    },
                    {
                        "name":"other",
                        "interest": 2,
                        "startDate":"2022-01-01",
                        "endDate":"2022-03-31",
                        "details": ""
                    }
                ]
            },
            {
                id:2,
                name: 'Amex',
                number: '3001',
                cutDate: '21',
                dueDate: '24',
                cutPaid: false,
                cutPaidDate: null,
                cutDateBefore: 3,
                credit: 10000,
                rewards:[
                    {
                        "name":"groceries",
                        "interest": 1,
                        "startDate":"2022-01-01",
                        "endDate":"2022-03-31",
                        "details": ""
                    },
                    {
                        "name":"gas",
                        "interest": 1.5,
                        "startDate":"2022-01-01",
                        "endDate":"2022-03-31",
                        "details": ""
                    },
                    {
                        "name":"amazon.com",
                        "interest": 5,
                        "startDate":"2022-01-01",
                        "endDate":"2022-03-31",
                        "details": ""
                    },
                    {
                        "name":"target",
                        "interest": 2,
                        "startDate":"2022-01-01",
                        "endDate":"2022-03-31",
                        "details": ""
                    }
                ]
            },
            {
                id: 3,
                name: 'Discover',
                number: '1095',
                cutDate: '22',
                dueDate: '30',
                cutPaid: true,
                cutPaidDate: '2022-12-20',
                cutDateBefore: 3,
                credit: 5000,
                rewards:[
                    {
                        "name":"groceries",
                        "interest": 1.5,
                        "startDate":"2022-01-01",
                        "endDate":"2022-03-31",
                        "details": ""
                    },
                    {
                        "name":"gas",
                        "interest": 1.5,
                        "startDate":"2022-01-01",
                        "endDate":"2022-03-31",
                        "details": ""
                    },
                    {
                        "name":"amazon.com",
                        "interest": 5,
                        "startDate":"2022-01-01",
                        "endDate":"2022-03-31",
                        "details": ""
                    },
                    {
                        "name":"other",
                        "interest": 2,
                        "startDate":"2022-01-01",
                        "endDate":"2022-03-31",
                        "details": ""
                    }
                ]
            },
            {
                id: 4,
                name: 'Wells Fargo',
                number: '5198',
                cutDate: '24',
                dueDate: '25',
                cutPaid: false,
                cutPaidDate: null,
                cutDateBefore: 3,
                credit: 1000,
                rewards:[
                    {
                        "name":"groceries",
                        "interest": 3,
                        "startDate":"2022-01-01",
                        "endDate":"2022-03-31",
                        "details": ""
                    },
                    {
                        "name":"walmart.com",
                        "interest": 3,
                        "startDate":"2022-01-01",
                        "endDate":"2022-03-31",
                        "details": ""
                    },
                    {
                        "name":"gas",
                        "interest": 1.5,
                        "startDate":"2022-01-01",
                        "endDate":"2022-03-31",
                        "details": ""
                    },
                    {
                        "name":"amazon.com",
                        "interest": 5,
                        "startDate":"2022-01-01",
                        "endDate":"2022-03-31",
                        "details": ""
                    },
                    {
                        "name":"other",
                        "interest": 2,
                        "startDate":"2022-01-01",
                        "endDate":"2022-03-31",
                        "details": ""
                    }
                ]
            },
        ]
    }
  },
  computed: {
    filterRewardsFunction(){
        return this.filteredRewards 
            ? this.cards.filter((card) => {
                return (card.rewards.find(e => e.name == this.filterRewardCategory));
            })
            : this.cards;
    }
  },
  methods: {
    filterBy(cat){
        this.filterRewardCategory = cat;
        this.filteredRewards = true;
    },
    resetFilterBy(){
        this.filterRewardCategory = '';
        this.filteredRewards = false;
    },
    // Reset paid status: if today's date is after cut date and the cut date paid 
    // date is before cut date then reset to false the cutPaid and cutPaidDate
    checkPaid(){
        const todaysDate = new Date();
        const todaysMonth = getMonth(todaysDate);
        const todaysYear = getYear(todaysDate);
        this.cards.map( el => {
            if (el.cutPaid){     
                let cutDate = new Date(todaysYear, todaysMonth, el.cutDate);   
                if (isAfter(todaysDate, cutDate) && isBefore(parseISO(el.cutPaidDate), cutDate)) {
                    el.cutPaid = false;
                    el.cutPaidDate = null;
                }
            }
        });
    },
    // If cut Paid state changes set/reset cutPaidDate accordingly
    cutPaidChanged(e){
        this.cards.map( el => {
            if (el.id == e.id) {
                if (e.checked){
                    el.cutPaidDate = format(new Date(), 'yyyy-MM-dd');
                } else {
                    el.cutPaidDate = null;
                }
                
            }
        });
    }
  },
  mounted(){
    this.checkPaid();
  }

});

