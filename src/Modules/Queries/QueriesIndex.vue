<template>
    <div class="queries-head hshadow p-4 relative">
        <img class="absolute top-4 left-4" src="/assets/icons/1.TH.BACK.svg" alt="BACK icon">
        <h1 class="text-center text-base font-medium">Consultas</h1>
    </div>

    <div class="queries-body h-[81vh] overflow-y-auto px-4 py-6">
        <!-- <TextQuery /> -->
        <!-- <IconsQuery /> -->
        <!-- <ResponseCard /> -->
        <FlashFeedback /> 
    </div>
</template>
<script setup>
// import TextQuery from './Components/TextQuery.vue';
// import IconsQuery from './Components/IconsQuery.vue'
// import ResponseCard from './Components/ResponseCard.vue';
import FlashFeedback from './Components/FlashFeedback.vue'
</script>