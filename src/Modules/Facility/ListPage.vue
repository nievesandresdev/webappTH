<template>
    <SectionBarTab 
    title="Hotel" 
    :tabs="[
      { name: 'Información', routeName: 'ShowHotel', icon: '/assets/icons/WA.alojamiento.svg' },
      { name: 'Instalaciones', routeName: 'FacilityList', icon: '/assets/icons/WA.Instalaciones.svg' }
    ]"
  />
    <pre>{{ facilities }}</pre>
</template>
<script setup>

import { ref, onMounted } from 'vue';
import SectionBarTab from '@/components/SectionBarTab.vue';
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()

const facilities = ref([]);

onMounted(async() => {
  const r = await hotelStore.$getCrossellings()

  facilities.value =  r.crosselling_facilities;
})

</script>