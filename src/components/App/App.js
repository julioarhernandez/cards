import { parseISO, getMonth, getYear, isAfter, isBefore, format, getDate } from 'date-fns';
import { defineComponent } from 'vue';
import { useLoadedCards, createCard, updateCard } from '@/helpers/firebase';
import { getAuth, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import router from '@/router';
import Card from '../Card/Card.vue';
import Nav from '../Nav/Nav.vue';
import CardList from '../CardList/CardList.vue';

let auth;

export default defineComponent({
    name: 'App',
    components: { Card, CardList, Nav },
    data(){
        return {
            isLoggedIn: false,
            userEmail: null,
            userAvatar: "",
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
                return (card.rewards && card.rewards.find(e => {
                    const nameFound = e.name.toLowerCase() == this.filterRewardCategory.toLowerCase();
                    const detailsFound = e.details
                        ? e.details.toLowerCase().includes(this.filterRewardCategory.toLowerCase())
                        : false;
                    return (nameFound || detailsFound);
                }));
            });
            // Sort array
            if (tempSortedFilteredData.length){
                this.sortedFilteredData = [...tempSortedFilteredData].sort((a, b) => {
                    let rew1 = a.rewards.find(e => e.name.toLowerCase() == this.filterRewardCategory.toLowerCase());
                    let rew2 = b.rewards.find(e => e.name.toLowerCase() == this.filterRewardCategory.toLowerCase());
                    if (rew1 && rew2){
                        return rew2.interest - rew1.interest;
                    }

                });
            }else {
                this.sortedFilteredData = [];
            }
        },
        sortListByCutDate(cardList){
            if (this.filteredRewards) {
                return cardList;
            } else {
                return [...cardList].sort((a,b) => {
                    const todayDay = getDate(new Date());
                    // if today's day is equals or less than cut date add
                    // 31 days for the comparison for a shifted sorting
                    const first = (todayDay >= a.cutDate ? a.cutDate + 31 : a.cutDate);
                    const second = (todayDay >= b.cutDate ? b.cutDate + 31 : b.cutDate);
                    return first-second;
                });
            }
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
                        updateCard(el.id, {
                            ...el,
                            cutPaidDate: null,
                            cutPaid: false,
                        });
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
        }
    },
    mounted(){
        auth = getAuth();
        onAuthStateChanged( auth, (user) => {
            if (user){
                this.isLoggedIn = true;
                this.userEmail = user.email;
                this.userAvatar = user.photoURL;
                this.cards = useLoadedCards(this.userEmail);
            }else {
                this.isLoggedIn = false;
            }
        });
    },
    watch: {
        cards(newCard, oldCard){
            if (!oldCard.length && newCard.length){
                // When cards gets loaded for the first time
                // check paid status
                this.checkPaid();
            }

        },
        '$route' (to, from) {
            document.title = to.meta.title || 'Credit Card'
        }
    },
});

