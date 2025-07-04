<template>
    <section
        v-if="orderSections?.servicesSection?.style == 1"
        class="section-services"
        @click="goToService('servicios/confort')"
    >
        <div class="flex items-center space-x-[6px] sp:space-x-[8px] mb-[6px] sp:mb-[8px]">
            <img src="/assets/icons/WA.MENU.DEFAULT.SERVICE.svg" alt="services" class="size-[16px] sp:size-[24px]">
            <h2 class="text-[11px] sp:text-[20px] font-bold lato">{{ $t('service.title') }}</h2>
        </div>
        <div class="flex space-x-[6px] sp:space-x-[8px] items-center px-[6px] sp:px-[8px] pt-[6px] sp:pt-[8px] pb-[12px] sp:pb-[16px]">
            <div class="flex-1">
                <p class="text-[10px] sp:text-[16px] font-bold lato mb-[6px] sp:mb-[8px] leading-[12px] sp:leading-[20px]">{{ $t('home.section-services.text-on') }}</p>
                <p class="text-[8px] sp:text-[12px] lato mb-[12px] sp:mb-[16px] text-[#777777] leading-[7px] sp:leading-[14px]">
                    {{ $t('home.section-services.text-off') }}
                </p>
                <button
                    class="space-x-[6px] sp:space-x-[8px] flex items-center"
                    @click="goToService('servicios/confort')"
                >
                    <span class="text-[10px] sp:text-[14px] font-bold lato">
                        {{ $t('home.section-services.btn-discover') }}
                    </span>
                    <img src="/assets/icons/arrow-right-long.svg" alt="arrow" class="size-[12px] sp:size-[16px]">
                </button>
            </div>
            <div class="w-[60px] sp:w-[115px]">
                <img src="/assets/img/card-services.png" alt="card-services" class="w-full">
            </div>
        </div>
    </section> 

    <section
        v-else-if="orderSections?.servicesSection?.style == 2"
        class="section-services"
    >
        <div class="flex items-center space-x-[6px] sp:space-x-[8px] mb-[6px] sp:mb-[8px]">
            <img src="/assets/icons/WA.MENU.DEFAULT.SERVICE.svg" alt="services" class="size-[16px] sp:size-[24px]">
            <h2 class="text-[11px] sp:text-[20px] font-bold lato">{{ $t('service.title') }}</h2>
        </div>
        <div class="pt-[6px] sp:pt-[8px] pb-[12px] sp:pb-[16px]">
            <div class="grid gap-x-[5px] sp:gap-x-[8px]" :class="`grid-cols-${services.length}`">
                <div
                    v-for="(service, index) in services"
                    :key="service.name"
                    class="h-[70px] sp:h-[140px] bg-[#000000] flex items-end justify-center pb-[6px] sp:pb-[8px]"
                    :class="`${getDirectionRounded(index)}`"
                    :style="{ backgroundImage: `url(${service.pathImg})`, backgroundSize: 'cover', backgroundPosition: 'center', background: `linear-gradient(0deg, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%), url(${service.pathImg}) lightgray ${calDimentionImg()}` }"
                    @click="goToService(service.to)"
                >
                    <div class="flex flex-col items-center">
                        <img :src="service.icon" :alt="service.name" class="size-[32px] sp:size-[48px] z-10">
                        <span class="text-[11px] sp:text-[18px] font-bold lato text-white mt-[6px] sp:mt-[8px]">{{ service.name }}</span>
                    </div>
                </div>
            </div>
            <div class="px-[10px] sp:px-[16px] mt-[10px] sp:mt-[16px]">
                <p class="text-[12px] sp:text-[16px] font-bold lato mb-[6px] sp:mb-[8px] leading-[12px] sp:leading-[20px]">{{ $t('home.section-services.text-on') }}</p>
                <p class="text-[10px] sp:text-[14px] lato mb-[12px] sp:mb-[16px] text-[#777777] leading-[10px] sp:leading-[14px]">
                    {{ $t('home.section-services.text-off') }}
                </p>
            </div>
            <div class="px-[10px] sp:px-[16px] flex justify-end">
                <button
                    class="space-x-[6px] sp:space-x-[8px] flex items-center"
                    @click="goToService('servicios/confort')"
                >
                    <span class="text-[10px] sp:text-[14px] font-bold lato">
                        {{ $t('home.section-services.btn-discover') }}
                    </span>
                    <img src="/assets/icons/arrow-right-long.svg" alt="arrow" class="size-[12px] sp:size-[16px]">
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
        return 'rounded-t';
    } else if (index === 0) {
        return 'rounded-tl';
    } else if (index === services.value.length - 1) {
        return 'rounded-tr';
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
    border-radius: 7px;
    box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.12), 0px 3px 1px 0px rgba(0, 0, 0, 0.04);
    margin: 0 10px;
}

.rounded-t {
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
}
.rounded-tl {
    border-top-left-radius: 7px;
}
.rounded-tr {
    border-top-right-radius: 7px;
}

@media (min-width: 300px) {
    .section-services {
        border-radius: 10px;
        margin: 0 16px;
    }
    .rounded-t {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    .rounded-tl {
        border-top-left-radius: 10px;
    }
    .rounded-tr {
        border-top-right-radius: 10px;
    }
}
</style>