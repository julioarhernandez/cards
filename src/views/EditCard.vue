<template>
  <UpdateCard :id="cardId"/>
</template>

<script>
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import UpdateCard from "@/components/UpdateCard/UpdateCard.vue";

export default defineComponent({
  name: "EditCard",
  components: {
    UpdateCard,
  },
  computed:{
    cardId(){
        const route = useRoute();
        return route.params.id
     } 
  }
});
</script>
