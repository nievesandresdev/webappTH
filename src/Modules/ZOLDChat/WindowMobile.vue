<template>
    <MobileChat 
        :settings="chatSettings" 
    />
    <!-- :chat_hours="chat_hours"
        :chat_messages="chat_messages" -->
</template>
    
<script setup>
    //import libraries
    import { onMounted, ref, inject, computed, provide } from 'vue';
    //imports components
    import MobileChat from './WindowChat'
    import { useHotelStore } from '@/stores/modules/hotel';

    //store
    const hotelStore = useHotelStore()
    const chatSettings = ref(hotelStore?.hotelData?.chatSettings ?? {});
    //DATA
    
    //mounted
    onMounted(() => {
    });


      
</script>
<style scoped>

</style>