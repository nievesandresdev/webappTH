<template>
    <section
        v-if="orderSections?.servicesSection?.style == 1"
        class="section-services"
        @click="goToService('servicios/confort')"
    >
        <div class="flex space-x-[6px] sp:space-x-[8px] mb-[6px] sp:mb-[8px]">
            <img src="/assets/icons/WA.MENU.DEFAULT.SERVICE.svg" alt="services" class="size-[16px] sp:size-[24px]">
            <h2 class="font-[20px] font-bold lato">{{ $t('service.title') }}</h2>
        </div>
        <div class="flex space-x-[6px] sp:space-x-[8px] items-center px-[6px] sp:px-[8px] pt-[6px] sp:pt-[8px] pb-[12px] sp:pb-[16px]">
            <div class="flex-1">
                <p class="text-[12px] sp:text-[16px] font-bold lato mb-[6px] sp:mb-[8px] leading-[20px]">{{ $t('home.section-services.text-on') }}</p>
                <p class="text-[8px] sp:text-[12px] lato mb-[12px] sp:mb-[16px] text-[#777777] leading-[14px]">
                    {{ $t('home.section-services.text-off') }}
                </p>
                <button
                    class="space-x-[6px] sp:space-x-[8px] flex items-center font-bold lato"
                    @click="goToService('servicios/confort')"
                >
                    <span>
                        {{ $t('home.section-services.btn-discover') }}
                    </span>
                    <img src="/assets/icons/arrow-right-long.svg" alt="arrow" class="size-[12px] sp:size-[16px]">
                </button>
            </div>
            <div class="w-[80px] sp:w-[115px]">
                <img src="/assets/img/card-services.png" alt="card-services" class="w-full">
            </div>
        </div>
    </section> 

    <section
        v-else-if="orderSections?.servicesSection?.style == 2"
        class="section-services"
    >
        <div class="flex space-x-2 mb-2">
            <img src="/assets/icons/WA.MENU.DEFAULT.SERVICE.svg" alt="services" class="size-[24px]">
            <h2 class="font-[20px] font-bold lato">{{ $t('service.title') }}</h2>
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
                <p class="text-[16px] font-bold lato mb-[8px] leading-[20px]">{{ $t('home.section-services.text-on') }}</p>
                <p class="text-[14px] lato mb-[16px] text-[#777777] mb-[16px] leading-[14px]">
                    {{ $t('home.section-services.text-off') }}
                </p>
            </div>
            <div class="px-[16px] flex justify-end">
                <button
                    class="space-x-2 flex items-center font-bold lato"
                    @click="goToService('servicios/confort')"
                >
                    <span>
                        {{ $t('home.section-services.btn-discover') }}
                    </span>
                    <img src="/assets/icons/arrow-right-long.svg" alt="arrow" class="size-[16px]">
                </button>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { t } = useI18n();

const hotelData = inject('hotelData');
const orderSections = inject('orderSections');

const services = computed(() => {
    let services = [
        {
            name: t('service.confort.title'),
            image: 'card-services.png',
            icon: '/assets/icons/WA.CONFORT.WHITE.svg',
            pathImg: '/assets/img/CONFORT.WALLPAPER.jpg',
            to: 'servicios/confort',
            exclude: !hotelData.value?.show_confort
        },
        {
            name: t('service.transport.title'),
            image: 'card-services.png',
            icon: '/assets/icons/WA.TRANSPORT.WHITE.svg',
            pathImg: '/assets/img/TRANSPORT.WALLPAPER.jpg',
            to: 'servicios/transport',
            exclude: !hotelData.value?.show_transport
        },
        {
            name: t('service.activity.title'),
            image: 'card-services.png',
            icon: '/assets/icons/WA.ACTIVITY.WHITE.svg',
            pathImg: '/assets/img/ACTIVITY.WALLPAPER.jpg',
            to: 'servicios/activity',
            exclude: !hotelData.value?.show_experiences
        },
    ];
    services = services.filter(service => !service.exclude);
    return services;
});

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