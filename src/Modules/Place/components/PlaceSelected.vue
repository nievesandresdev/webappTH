<template>
    <div v-if="placeComputed" class="w-screen absolute px-[16px] top-[-113px] lef-0 z-[3000]">
        <CardList :data="placeComputed" />
    </div>
    
</template>

<script setup>
    import { computed } from 'vue';

      import CardList from './CardList.vue';

      const props = defineProps({
          placeSelected: {
              type: Object,
              default: () => ({}),
          },
      });

    const placeComputed = computed(() => {
        if (!props.placeSelected) return;
        return {
            id: props.placeSelected.id,
            title: props.placeSelected.title,
            place_images: props.placeSelected.place_images,
            place_featured: props.placeSelected.place_featured,
            num_stars: props.placeSelected.num_stars,
            num_reviews: props.placeSelected.num_reviews,
            categori_place: props.placeSelected.categori_place,
            distance: props.placeSelected.distance,
            distance: props.placeSelected.cityName,
        }
    });

</script>