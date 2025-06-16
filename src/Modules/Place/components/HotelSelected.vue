<template>
    <div v-if="!laoding && hotelComputed"  class="w-screen absolute px-[16px] top-[-113px] lef-0 z-[3000]">
        <CardHotel :data="hotelComputed" />
    </div>
    <div v-else-if="loading" class="w-screen absolute px-[16px] top-[-113px] lef-0 z-[3000]">
        <SkeletonCard />
    </div>
</template>

<script setup>
    import { computed, inject } from 'vue';

    import CardHotel from './CardHotel.vue';
    import SkeletonCard from './SkeletonCard.vue';

    // const hotelData = inject('hotelData');

      const props = defineProps({
          loading: {
              type: Boolean,
              default: false,
          },
          hotelData: {
              type: Object,
              default: () => ({}),
          }
      });

    const hotelComputed = computed(() => {
        if (!props.hotelData) return;
        // console.log(props.hotelData);
        return {
            id: props.hotelData.id,
            name: props.hotelData.name,
            image: {url: props.hotelData.image},
        }
    });
    

</script>