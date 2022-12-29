import {initializeApp} from "firebase/app";
import {getFirestore, onSnapshot, collection, addDoc, getDoc, deleteDoc, updateDoc, doc} from "firebase/firestore";
import {ref, onUnmounted} from 'vue';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBefex9AEeT2kdbGlnS0z7Gt_eb6eik-XA",
  authDomain: "vuejs3-d435f.firebaseapp.com",
  projectId: "vuejs3-d435f",
  storageBucket: "vuejs3-d435f.appspot.com",
  messagingSenderId: "504544854572",
  appId: "1:504544854572:web:4e84706967160c9b38c789"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
 
const db = getFirestore(firebaseApp);
const cardsCollection = collection(db, 'cards');

export const createCard = card => {
    return addDoc(cardsCollection, card);
}

export const getCard = async id => {
    const card = await getDoc(doc(cardsCollection, id));
    return card.exists ? card.data() : null;
}

export const updateCard = (id, card) => {
    return updateDoc(doc(cardsCollection, id), card);
}

export const deleteCard = async id => {
    return await deleteDoc(doc(cardsCollection, id));
}

export const useLoadedCards = () => {
    const cards = ref([]);
    const close = onSnapshot(cardsCollection, querySnapshot => {
        cards.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
    });
    onUnmounted(close);
    return cards;
}    