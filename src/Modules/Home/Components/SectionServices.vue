<template>
    <section class="section-services">
        <div class="flex space-x-2 mb-2">
            <img src="/assets/icons/WA.MENU.DEFAULT.SERVICE.svg" alt="services" class="size-[24px]">
            <h2 class="font-[20px] font-bold lato">Servicios</h2>
        </div>
        <div class="flex space-x-2 items-center px-[8px] pt-[8px] pb-[16px]">
            <div class="flex-1">
                <p class="text-[16px] font-bold lato mb-[8px] leading-[20px]">Tu experiencia, al siguiente nivel</p>
                <p class="text-[14px] lato mb-[16px] text-[#777777] mb-[16px] leading-[14px]">
                    Relájate y aprovecha al máximo cada servicio pensado para ti.
                </p>
                <button class="space-x-2 flex items-center font-bold lato">
                    <span>
                        Descubrir servicios
                    </span>
                    <img src="/assets/icons/arrow-right-long.svg" alt="arrow" class="size-[16px]">
                </button>
            </div>
            <div class="w-[115px]">
                <img src="/assets/img/card-services.png" alt="card-services" class="w-full">
            </div>
        </div>
    </section>
    
    <section class="section-services">
        <div class="flex space-x-2 mb-2">
            <img src="/assets/icons/WA.MENU.DEFAULT.SERVICE.svg" alt="services" class="size-[24px]">
            <h2 class="font-[20px] font-bold lato">Servicios</h2>
        </div>
        <div class="pt-[8px] pb-[16px]">
            <div class="grid gap-x-2" :class="`grid-cols-${services.length}`">
                <div
                    v-for="(service, index) in services"
                    :key="service.name"
                    class="h-[120px] bg-[#000000] flex items-end justify-center pb-[8px]"
                    :class="`rounded-${getDirectionRounded(index)}-[10px]`"
                    :style="{ backgroundImage: `url(${service.pathImg})`, backgroundSize: 'cover', backgroundPosition: 'center', background: `linear-gradient(0deg, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%), url(${service.pathImg}) lightgray ${calDimentionImg()}` }"
                    @click="goToService(service.to)"
                >
                    <div class="flex flex-col items-center">
                        <img :src="service.icon" :alt="service.name" class="size-[48px] z-10">
                        <span class="text-[18px] font-bold lato text-white mt-[8px]">{{ service.name }}</span>
                    </div>
                </div>
            </div>
            <div class="px-[16px] mt-[16px]">
                <p class="text-[16px] font-bold lato mb-[8px] leading-[20px]">Tu experiencia, al siguiente nivel</p>
                <p class="text-[14px] lato mb-[16px] text-[#777777] mb-[16px] leading-[14px]">
                    Relájate y aprovecha al máximo cada servicio pensado para ti.
                </p>
            </div>
            <div class="px-[16px] flex justify-end">
                <button
                    class="space-x-2 flex items-center font-bold lato"
                    @click="goToService('servicios/confort')"
                >
                    <span>
                        Descubrir servicios
                    </span>
                    <img src="/assets/icons/arrow-right-long.svg" alt="arrow" class="size-[16px]">
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const services = ref([
    {
        name: 'Confort',
        image: 'card-services.png',
        icon: '/assets/icons/WA.CONFORT.WHITE.svg',
        pathImg: '/assets/img/CONFORT.WALLPAPER.jpg',
        to: 'servicios/confort'
    },
    {
        name: 'Transporte',
        image: 'card-services.png',
        icon: '/assets/icons/WA.TRANSPORT.WHITE.svg',
        pathImg: '/assets/img/TRANSPORT.WALLPAPER.jpg',
        to: 'servicios/transport'
    },
    {
        name: 'Actividades',
        image: 'card-services.png',
        icon: '/assets/icons/WA.ACTIVITY.WHITE.svg',
        pathImg: '/assets/img/ACTIVITY.WALLPAPER.jpg',
        to: 'servicios/activity'
    },
]);

const numbersServices = computed(() => {
    return services.value.length;
});

const getDirectionRounded = (index) => {
    if (services.value.length === 1) {
        return 't';
    } else if (index === 0) {
        return 'tl';
    } else if (index === services.value.length - 1) {
        return 'tr';
    }
}

const calDimentionImg = () => {
    if (numbersServices.value === 1) {
        return '50% / cover no-repeat';
    } else if (numbersServices.value === 2) {
        return '-68.734px 0px / 161.174% 100% no-repeat';
    } else if (numbersServices.value === 3) {
        return '2.833px 0px / 143.284% 100% no-repeat';
    }
}

const goToService = (to) => {
    // console.log(router.currentRoute.value.params.hotelSlug);
    router.push(`/${router.currentRoute.value.params.hotelSlug}/${to}`);
}

</script>

<style lang="scss" scoped>

.section-services {
    background: #FAFAFA;
    border-radius: 10px;
    box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.12), 0px 3px 1px 0px rgba(0, 0, 0, 0.04);
    margin: 0 16px;
}
    
</style>