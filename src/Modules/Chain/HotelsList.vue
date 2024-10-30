<template>
    <!-- head -->
    <div class="sticky top-0 left-0 bg-head w-full py-6 px-4">
        <HeadInChain text="Selecciona tu alojamiento"/>
    </div>

    <!-- body -->
    <div class="py-6 px-4">
        <h4 class="lato text-base font-bold leading-[20px]">{{hotels.length ?? 0}} alojamientos de la cadena</h4>
        <div class="mt-4">
            <div class="mb-6" v-for="hotel in hotels" >
                <CardHotel :data="hotel" clickable/>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import HeadInChain from './Components/HeadInChain.vue'
import CardHotel from './Components/CardHotel.vue'
//store
import { useChainStore } from '@/stores/modules/chain';
const chainStore = useChainStore();

const hotels = ref([])
onMounted(async() => {
    hotels.value = await chainStore.$getHotelsList()  
})

</script>
<style scoped> 
.bg-head{
    background: linear-gradient(105deg, #F3F3F3 0%, #FAFAFA 100%);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
}

</style>