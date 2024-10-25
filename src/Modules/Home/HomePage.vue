<template>
    <div>
        new home page
    </div>
</template>
<script setup>
import { onMounted } from 'vue';

import { useGuestStore } from '@/stores/modules/guest';
const guestStore = useGuestStore();

import { useStayStore } from '@/stores/modules/stay'
const stayStore = useStayStore();

onMounted(() => {
    let guest = guestStore.getLocalGuest();
    console.log('home guest', guest)  

    let stay = stayStore.getLocalStay();
    console.log('home stay', stay)  
})

</script>