<template>
    <SignInCard />
</template>

<script>
    import { defineComponent } from "vue";
    import SignInCard from "@/components/SignIn/SignInCard.vue"

    export default defineComponent({
        name: 'SignIn',
        props:['addNewCard'],
        components: {
            SignInCard
        }
    });
</script>

