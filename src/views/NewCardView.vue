<template>
    <NewCard :addNewCard="addNewCard"/>
</template>

<script>
    import { defineComponent } from "vue";
    import NewCard from '@/components/NewCard/NewCard.vue';

    export default defineComponent({
        name: 'NewCardView',
        props:['addNewCard'],
        components: {
            NewCard
        }
    });
</script>

