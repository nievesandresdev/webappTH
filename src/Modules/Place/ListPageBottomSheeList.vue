<template>
    <div class="w-full gap-4 h-[327px] overflow-y-auto">
        <!-- h-[90px] -->
        <!-- h-[327px] -->
        <template v-for="item in 10">
            <CardList />
        </template>
    </div>
</template>

<script setup>
    import CardList from './components/CardList.vue';
</script>