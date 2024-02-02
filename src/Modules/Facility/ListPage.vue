<template>
    <div v-if="$utils.isMockup()" class="fixed top-0 left-0 w-screen h-full z-[2000]" />
    <section class="container-fluid-landing pr-mobile-0 mb-10 lg:mb-[33px]">
        <!-- desktop-list-breadcrumb -->
        <div class="desktop-list-breadcrumb mt-6 hidden md:block">
            <router-link :to="{name:'Home'}" class="text-sm font-medium htext-gray-500">Home</router-link>
            <img src="/assets/icons/stroke.svg" class="inline mx-1">
            <span class="text-sm font-medium htext-gray-500">
                {{ $t('facility.facilitiesWord') }}
            </span>
        </div>
        <!-- END desktop-list-breadcrumb -->
        <div class="flex justify-between items-center mt-[16px] sp:mt-6 mb-2.5 sp:mb-3.5 lg:mb-6">
            <h2 class="text-xs sp:text-[22px] font-medium">
                {{ $t('facility.facilitiesWord') }}
            </h2>
        </div>
        <!-- space-y-2.5 sp:space-y-3.5 lg:space-y-6 -->
        <div v-if="dataList?.length > 0" class="w-full flex lg:flex-row flex-wrap lg:mb-6 gap-2.5 sp:gap-3.5 lg:gap-6">
            <router-link
                v-for="item in dataList"
                :to="{ name: 'FacilityDetail', params: { id: item.id } }"
                class="cursor-pointer card-facility-content  relative rounded-[10px]"
            >
                <img
                    :src="getImg(item)" alt="img"
                    class="w-full h-full object-cover rounded-[10px]"
                >
                <div class="overlay rounded-[10px] absolute h-full z-10 w-full top-0 left-0 card-facility" >
                    <span class="absolute top-0 bottom-0 left-0 right-0 m-auto text-center text-white font-medium text-xs sp:text-[22px] z-30 h-6" >
                        {{ $utils.capitalize(item.title) }}
                    </span>
                </div>
            </router-link>
        </div>
    </section>
</template>

<script setup>
    import { ref,onMounted } from 'vue';
    import { useFacilityStore } from '@/stores/modules/facility.js'
    
    const facilityStore = useFacilityStore();
    const dataList = ref([]);
    const urlStorage = process.env.VUE_APP_STORAGE_URL;
    onMounted(() => {
        getData();
    })

    const getData = async () => {
        let response = await facilityStore.$getAll();
        console.log('getData',response)
        dataList.value = response;
    }
    const getImg = (payload) => {
        if (payload?.images.length > 0) return `${urlStorage}/storage/facility${payload.images[0].url}`
        return null
    }
            
</script>

<style lang="scss" scoped>
.gap-y-ins{
    row-gap: 1.375rem;
}

.card-facility{
    background: rgba(0, 0, 0, 0.3);
}

.card-facility:hover{
    background: rgba(0, 0, 0, 0.7);
}

.card-facility-content{
    width: 100%;
    height: 100px;
}


@media (min-width: 250px){
    .card-facility-content{
        width: 100%;
        height: 187px;
    }
}
@media (min-width: 1020px){
    .card-facility-content{
        width: 256px;
        height: 149px;
    }
}
@media (min-width: 1440px){
    .card-facility-content{
        width: 296px;
        height: 172px;
    }
}

</style>
