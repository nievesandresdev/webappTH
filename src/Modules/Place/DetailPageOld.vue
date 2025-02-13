<template>
    <div>
        <div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[2000]"></div>
        <!-- Migas de pan places -->
        <DetailBreadcrumb :placeData="placeData"/>

        <!-- Carousel Imagenes Places -->
        <CarouselDetail :place="placeData"/>

        <!-- Info de la pagina -->
        <section id="place-info" class="container-fluid-landing px-[8px] lg:mb-10">
            <div class="flex flex-col lg:flex-row pt-[8px] sp:pt-4 lg:pt-6">

                <DetailInfoSection :placeData="placeData"/>

                <DetailReviewsSection :placeData="placeData"/>
            </div>
        </section>
    </div>
</template>
<script setup>
    import CarouselDetail from './components/CarouselDetail.vue';
    import DetailBreadcrumb from './components/DetailBreadcrumb.vue'
    import DetailInfoSection from './components/DetailInfoSection.vue'
    import DetailReviewsSection from './components/DetailReviewsSection.vue';
    import { onMounted, toRefs, ref } from 'vue';
    import { usePlaceStore } from '@/stores/modules/place';
    const placeStore = usePlaceStore();

    

    const props = defineProps({
        paramsRouter: {
            type: Object,
            default: () => ({})
        }
    })
    const { paramsRouter } = toRefs(props)

    const placeData = ref(null);

    onMounted(() => {
        getDataPlace()
    })



    //functions 
    const getDataPlace = async () => {
        let response = await placeStore.$findById({id:paramsRouter.value.id})
        placeData.value = null;
        if(response.ok) placeData.value = response.data;
        // console.log('placeData.value',placeData.value)

    }

</script>
