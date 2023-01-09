import { parseISO, getMonth, getYear, isAfter, isBefore, format } from 'date-fns';
import { defineComponent } from 'vue';
import { useLoadedCards, createCard, updateCard } from '@/helpers/firebase';
import { getAuth, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import router from '@/router';
import Card from '../Card/Card.vue';
import CardList from '../CardList/CardList.vue';

let auth;

export default defineComponent({
  name: 'App',
  components: { Card, CardList },
  data(){
    return {
        isLoggedIn: false,
        userEmail: null,
        filteredRewards: false,
        filterRewardCategory: '',
        sortedFilteredData: [],
        maxPercentage: 5,
        minPercentage: 3,
        cards: []
    }
  },
  computed: {
    filterRewardsFunction(){
        this.sortFilterRewards();
        return this.filteredRewards 
            ? this.sortedFilteredData
            : this.cards;
    }
  },
  methods: {
    signInWithGoogle(){
        const provider = new GoogleAuthProvider();
        signInWithPopup(getAuth(), provider).then((result => {
            console.log(result.user);
            router.push("/");
        })).catch((error => {
            alert(error);
        }))
        
    },
    handleSignOut(){
        signOut(auth).then(()=>{
            this.userEmail = null;
            router.push("/signin");
        })
    },
    sortFilterRewards(){
        // Filter first
        let tempSortedFilteredData = this.cards.filter((card) => {
            return (card.rewards && card.rewards.find(e => e.name == this.filterRewardCategory));
        });
        // Sort array
        this.sortedFilteredData = [...tempSortedFilteredData].sort((a, b) => {
            let rew1 = a.rewards.find(e => e.name == this.filterRewardCategory);
            let rew2 = b.rewards.find(e => e.name == this.filterRewardCategory);
            return rew2.interest - rew1.interest;
        });
    },
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
                // Update card cutPaid
                updateCard(e.id, {
                    ...el, 
                    cutPaidDate: e.checked ? format(new Date(), 'yyyy-MM-dd') : null,
                    cutPaid: e.checked,
                });
            }
        });
    },
    //addNewCard
    addNewCard(card){
        createCard(card);
        // console.log('add', card);
    }
  },
  mounted(){
    this.checkPaid();
    auth = getAuth();
    onAuthStateChanged( auth, (user) => {
        if (user){
            this.isLoggedIn = true;
            this.userEmail = user.email;
            this.cards = useLoadedCards(this.userEmail);
            console.log(user);
        }else {
            this.isLoggedIn = false;
        }
    });
  }

});

