<template>
    <div class="home">
        <CardList
            :list="filterRewardsFunction"
            :maxPercentage="maxPercentage"
            :minPercentage="minPercentage"
            :cutPaidChanged="cutPaidChanged"
            :filterRewardCategory="filterRewardCategory"
            :filterBy="filterBy"
            :sortBy="sortBy"
            @resetFilterBy="resetFilterBy"
        />
    </div>
</template>

<script>
    import { defineComponent } from "vue";
    import CardList from "@/components/CardList/CardList.vue";

    export default defineComponent({
        name: 'Home',
        props:['filterRewardsFunction','maxPercentage', 'minPercentage','cutPaidChanged', 'filterBy', 'sortBy','filterRewardCategory','resetFilterBy'],
        components: {
            CardList
        }
    });
</script>