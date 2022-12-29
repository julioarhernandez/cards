<template>
    <div class="home">
        <h1>home</h1>
        <CardList
            :list="filterRewardsFunction"
            :maxPercentage="maxPercentage"
            :minPercentage="minPercentage"
            :cutPaidChanged="cutPaidChanged"
            :filterRewardCategory="filterRewardCategory"
            :filterBy="filterBy"
            @resetFilterBy="resetFilterBy"
        />
    </div>
</template>

<script>
    import { defineComponent } from "vue";
    import CardList from "@/components/CardList/CardList.vue";

    export default defineComponent({
        name: 'Home',
        props:['filterRewardsFunction','maxPercentage', 'minPercentage','cutPaidChanged', 'filterBy','filterRewardCategory','resetFilterBy'],
        components: {
            CardList
        }
    });
</script>