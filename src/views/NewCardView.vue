<template>
    <NewCard :addNewCard="addNewCard" :userEmail="userEmail"/>
</template>

<script>
    import { defineComponent } from "vue";
    import NewCard from '@/components/NewCard/NewCard.vue';

    export default defineComponent({
        name: 'NewCardView',
        props:['addNewCard','userEmail'],
        components: {
            NewCard
        }
    });
</script>

