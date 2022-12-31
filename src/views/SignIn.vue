<template>
    <SignInCard 
        @signInWithGoogle="signInWithGoogle" 
        @handleSignOut="handleSignOut"
        :isLoggedIn="isLoggedIn"
    />
</template>

<script>
    import { defineComponent } from "vue";
    import SignInCard from "@/components/SignIn/SignInCard.vue"

    export default defineComponent({
        name: 'SignIn',
        props:['signInWithGoogle','handleSignOut','isLoggedIn'],
        components: {
            SignInCard
        }
    });
</script>

