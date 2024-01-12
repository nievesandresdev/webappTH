<template>
    <div v-if="mockup" class="fixed top-0 left-0 w-screen h-full z-[2000]" />
    <!-- Migas de pan experiencias -->
    <div class=" hidden md:block mt-[10px] mb-8">
            
            <!-- Migas de pan experiencias -->
            <div class=" hidden md:block mt-[10px] mb-8">
                <div class="container-fluid-landing">
                    
                    <!-- desktop-list-breadcrumb -->
                    <router-link to="/" class="text-sm font-medium text-gray-ao inline-block">
                        Home
                    </router-link>
                    <p class="inline text-gray-ao lg:mx-2 inline-block">
                    >
                    </p>
                    <router-link to="/experiencias" class="text-sm font-medium text-gray-ao inline-block">
                        Experiencias
                    </router-link>
                    <p class="inline text-gray-ao lg:mx-2 inline-block">
                    >
                    </p>
                    <p class="text-sm font-medium text-gray-ao inline-block">
                    {{ activity?.activity?.title }}
                    </p>
                    <!-- END desktop-list-breadcrumb -->
                </div>
            </div>

            <!-- Carousel Imagenes Experiencias-->
            <div v-if="experienceData?.images?.length > 0" id="carousel-show-place"  class="hidden lg:block relative">
                <div class="absolute bottom-0 left-0 w-full" style="z-index: 100000 !important;">
                    <div class="container-fluid-landing flex justify-start w-full">     
                        <div
                            class="text-[10px] text-white font-semibold rounded p-1 flex mb-4"
                            style="rgba(206, 206, 206, 0.10); backdrop-filter: blur(40px);"
                        >
                            <template v-if="experienceData?.recomendations">
                                <img
                                    :src="`/assets/icons/1.TH.RECOMMEND.svg`"
                                    class="mr-1"
                                    :alt="`RECOMMEND`"
                                />
                                Recomendado
                            </template>
                            <template v-else-if="experienceData.product_featured">
                                <img
                                    :src="`/assets/icons/1.TH.FEATURED.svg`"
                                    class="mr-1"
                                    :alt="`FEATURED`"
                                />
                                Destacado
                            </template>
                        </div>
                    </div>
                </div>
                <Carousel :items-to-show="3">
                    <Slide v-for="(img, index) in experienceData?.images" :key="index">
                        <div class="carousel__item mx-auto">
                            <img :src="img.url" class="block w-full h-full rounded-10 object-cover"
                                :alt="img.url">
                        </div>
                    </Slide>

                    <template #addons>
                        <Navigation />
                    </template>
                </Carousel>
            </div>
            <!-- END Carousel Imagenes Places -->

            <!-- MOBILE Carousel Imagenes Places -->
            <div v-if="experienceData?.images?.length > 0" id="carousel-show-place-mobile"  class="md:hidden relative">
                <Carousel :items-to-show="1">
                    <Slide v-for="(img, index) in experienceData?.images" :key="index">
                        <button @click="retroceder" class="rounded-full bg-white p-1 sp:p-2 absolute top-2.5 sp:top-4 left-2.5 sp:left-4">
                            <img class="w-2.5 sp:w-4" src="/vendor_asset/img/landing/icons/arrow-back.svg"/>
                        </button>
                        <img 
                            :src="img.url"
                            :alt="img.url"
                            class="block w-full h-32 sp:h-60 object-cover"
                            style="border-radius: 0px 0px 10px 10px;"
                        >
                    </Slide>
                    <template #addons>
                        <Pagination />
                    </template>
                </Carousel>
            </div>
            <!-- END MOBILE Carousel Imagenes Places -->

            <div id="content-detail" class="container-fluid-landing mb-6 lg:mb-0">
                <div class="row mt-4 lg:mt-6  lg:mb-[40px] no-gutters">

                    <!-- Datos Experiencia-->

                    <div class="w-full lg:w-[80%] px-0">
                        <!-- seccion y contenido -->

                        <div class="px-0 content-section pt-0 w-full" style="gap: 8px">

                            <!-- titulo -->
                            <h2 class="text-[14px] sp:text-[22px] font-medium">
                                {{ experienceData?.title }}
                            </h2>
                            <h2 class="lg:hidden text-[12px] sp:text-[22px] mt-[4px] sp:mt-2 font-medium">
                                <span class="text-[10px] sp:text-sm font-normal">desde</span> {{ $utils.formatPrice(experienceData?.from_price) }}€
                            </h2>
                            <p v-if="variantPrice" class="lg:hidden text-[8px] sp:text-xs mt-[4px] sp:mt-2 font-medium">El precio varía dependiendo del tamaño del grupo</p>
                            <!-- Review -->
                            <div class="mt-[8px] sp:mt-4 flex">
                                <div class="flex gap-0.5 sp:gap-1 mr-[4px] sp:mr-2">
                                    <img
                                        v-for="(item, index) in Math.ceil(experienceData?.reviews.combined_average_rating)" :key="index"
                                        :src="`/assets/icons/1.TH.REVIEW.svg`"
                                        :alt="`star_${index}`"
                                        class="w-[10px] sp:w-4"
                                    />
                                </div>
                                <div class="flex item-center">
                                    <span class="text-[10px] sp:text-sm mr-[8px] sp:mr-2 font-semibold">{{ experienceData?.reviews.combined_average_rating.toFixed(1) }}</span>
                                    <span class="text-[10px] sp:text-sm font-medium mr-[8px] sp:mr-2">{{ experienceData?.reviews.total_reviews }} opiniones</span>
                                    <span class="text-[10px] sp:text-sm font-medium hidden md:inline mr-[8px] sp:mr-2">|</span>
                                    <span class="text-[10px] sp:text-sm hidden md:inline font-medium">{{ experienceData?.city_experince }}, España</span>
                                </div>
                            </div>

                            <!-- duracion -->
                            <div class="mt-4 hidden lg:flex">
                                <span class="text-sm flex items-center mr-6">
                                    <img
                                        :src="`/vendor_asset/img/hoster/icons/1.TH.CLOCK.svg`"
                                        alt="1.TH.CLOCK"
                                        class="mr-2 inline w-6"
                                    />
                                    {{ duration }}
                                </span>
                                <THTooltip
                                    size="s"
                                    :top="25"
                                    :right="0"
                                >
                                    <template v-slot:button>
                                        <button
                                            class="underline hbtn-tertiary mr-6"
                                        >
                                            <span class="text-sm flex items-center">
                                                <img
                                                    :src="`/assets/icons/1.TH.IDIOMA.svg`"
                                                    alt="1.TH.IDIOMA"
                                                    class="mr-2 inline w-6"
                                                />
                                                {{ availableLanguages }}
                                            </span>
                                        </button>
                                    </template>
                                    <template v-slot:content>
                                        <p class="text-sm font-medium mb-4">Idiomas disponibles:</p>
                                        <p class="text-sm">{{ experienceData?.language_experince }}</p>
                                    </template>
                                </THTooltip>
                                <span class="text-sm flex items-center mr-6">
                                    <img
                                        :src="`/assets/icons/1.TH.MOBILE.svg`"
                                        alt="1.TH.MOBILE"
                                        class="mr-2 inline w-6"
                                    />
                                    Ticket móvil
                                </span>
                            </div>

                            <!--mobile calendar -->
                            <div class="container-calendar lg:hidden">
                                <!-- <ShowReserveViator /> -->
                            </div>
                            <!--END mobile calendar -->

                            <!-- Bookable items -->
                            <div id="show-options">
                                <!-- <showProductOption /> -->
                            </div>

                            <!-- Hotel -->
                            <div
                                v-if="experienceData?.recomendations"
                                class="mt-[12px] sp:mt-6 md:mt-8 p-[12px] sp:p-6 rounded-xl border-1 border-gray-300"
                            >
                                <H3 class="text-[12px] sp:text-lg font-medium">
                                    {{ experienceData?.recomendations.hotel.name }}
                                </H3>
                                <div class="mt-2">
                                    <span
                                        class="text-[8px] sp:text-sm text-white font-semibold rounded p-0.5 sp:p-1 flex  hbg-green-600 block w-max"
                                    >
                                        <img
                                            :src="`/vendor_asset/img/hoster/icons/1.TH.RECOMMEND.svg`"
                                            class="mr-1 w-2.5 sp:w-5"
                                            :alt="`RECOMMEND`"
                                        />
                                        Recomendación
                                    </span>
                                </div>
                                <p class="mt-[12px] sp:mt-6 text-[8px] sp:text-sm">
                                    {{ experienceData?.recomendations.message }}
                                </p>
                            </div>
                            
                            <!-- descripcion -->

                            <h1 class="mt-[12px] sp:mt-6 md:mt-8 text-[10px] sp:text-base lg:text-lg font-medium hidden lg:block">
                                Descripción
                            </h1>
                            <h1 class="mt-[12px] sp:mt-6 lg:mt-4 text-[10px] sp:text-base lg:text-lg font-medium lg:hidden">
                                Descripción general
                            </h1>

                            <ul class="mt-[8px] sp:mt-4 lg:hidden">
                                <li class="border-b border-gray-300 py-[8px] sp:py-4">
                                    <span class="text-[8px] sp:text-sm flex items-center mr-[12px] sp:mr-6">
                                        <img
                                            :src="`/assetsicons/1.TH.CLOCK.svg`"
                                            alt="1.TH.CLOCK"
                                            class="mr-[4px] sp:mr-2 inline w-[12px] sp:w-6"
                                        />
                                        {{ duration }}
                                    </span>
                                </li>
                                <li class="border-b border-gray-300 py-[8px] sp:py-4">
                                    <span class="text-[8px] sp:text-sm flex items-center mr-[12px] sp:mr-6">
                                        <img
                                            :src="`/vendor_asset/img/hoster/icons/1.TH.IDIOMA.svg`"
                                            alt="1.TH.IDIOMA"
                                            class="mr-[4px] sp:mr-2 inline w-[12px] sp:w-6"
                                        />
                                        {{ availableLanguages }}
                                    </span>
                                </li>
                                <li class="border-b border-gray-300 py-[8px] sp:py-4">
                                    <span class="text-[8px] sp:text-sm flex items-center">
                                        <img
                                            :src="`/assets/icons/1.TH.MOBILE.svg`"
                                            alt="1.TH.MOBILE"
                                            class="mr-[4px] sp:mr-2 inline w-[12px] sp:w-6"
                                        />
                                        Ticket móvil
                                    </span>
                                </li>
                            </ul>

                            <div class="mt-[8px] sp:mt-4 lg:mt-2">
                                <div class="text-[8px] sp:text-sm">
                                    <span v-html="textDescription"></span>
                                    <div v-if="collapseDescriptionEnable" class="text-left pt-[4px] sp:pt-2 pl-0 lg:pr-12">
                                        <a href="javascript:void(0)" @click="collapseDescription = !collapseDescription"
                                            class="text-[8px] sp:text-sm font-medium underline">
                                            Ver {{ collapseDescription ? 'más' : 'menos' }}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <!-- contenido y normas -->
                            <template v-if="includes?.length > 0 || notincludes?.length > 0">
                                <h6 class="mt-[12px] sp:mt-6 md:mt-8 text-[12px] sp:text-base font-medium">
                                    Que incluye
                                </h6>
                                <div class="flex flex-col lg:flex-row mt-[8px] sp:mt-4 gap-x-[12px] sp:gap-x-6 gap-x-[8px] sp:gap-y-4">
                                    <div class="flex-col space-y-[8px] sp:space-y-4 flex-auto lg:w-[45%]">
                                        <div
                                            v-for="include in includes"
                                            :key="include"
                                            class="flex justify-start"
                                        >
                                            <img
                                                src="/assets/icons/checknocircle.svg"
                                                class="w-[8px] sp:w-4 mr-[4px] sp:mr-2"
                                            >
                                            <p class="text-[8px] sp:text-sm">
                                                {{ include }}
                                            </p>
                                        </div>
                                    </div>
                                    <div  class="flex-col space-y-[8px] sp:space-y-4 flex-auto lg:w-[45%] mt-[8px] sp:mt-4 md:mt-0">
                                        <div
                                            v-for="noinclude in notincludes"
                                            :key="noinclude"
                                            class="flex justify-start"
                                        >
                                            <img 
                                                src="/vendor_asset/img/partner/icons/close.svg" 
                                                class="w-[10px] sp:w-5 mr-[2px] sp:mr-1"
                                            >
                                            <p class="text-[8px] sp:text-sm">
                                                {{ noinclude }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            

                            <!-- ubicacion -->
                            <div id="scroll-point" class="mt-[12px] sp:mt-6 md:mt-8">
                                <h1 class="text-[12px] sp:text-base lg:text-lg font-medium">
                                        Ubicación
                                </h1>
                            </div>
                            <div class="mt-[10px] sp:mt-2.5 lg:mt-4 lg:mb-0">
                                <div class="mt-[4px] sp:mt-2">
                                    <div class="flex justify-start items-center">
                                        <img src="/vendor_asset/img/hoster/icons/1.TH.PINPOINT.svg" class="w-[12px] sp:w-5 h-[12px] sp:h-5 mr-[4px] sp:mr-2"
                                            alt="1.TH.PINPOINT">
                                        <div>
                                            <p class="text-[8px] sp:text-sm font-medium">
                                                Punto de encuentro:
                                                <span class="font-normal lg:font-medium">
                                                    {{ startMeet }}
                                                </span>
                                            </p>
                                            <a :href="mapLinkStart" target="_blank" class="text-[8px] sp:text-sm">Ver en Google Maps</a>
                                        </div>
                                    </div>
                                    <div class="flex justify-start items-center mt-[8px] sp:mt-4">
                                        <img src="/assets/icons/1.TH.PINPOINT.svg" class="w-[12px] sp:w-5 h-[12px] sp:h-5 mr-[4px] sp:mr-2"
                                            alt="1.TH.PINPOINT">
                                        <div>
                                            <p class="text-[8px] sp:text-sm font-medium">
                                                Punto de finalización:
                                                <span v-if="!locations?.[1]?.formatted_address" class="font-normal lg:font-medium">
                                                    Esta actividad finaliza en el punto de encuentro inicial.
                                                </span>
                                                <span v-else class="font-normal lg:font-medium">
                                                    {{ endMeet }}
                                                </span>
                                            </p>
                                            <a v-if="locations?.[1]" :href="mapLinkEnd" target="_blank" class="text-[8px] sp:text-sm">Ver en Google Maps</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- detalles -->
                            <h1 class="mt-[10px] sp:mt-6 md:mt-8 text-[12px] sp:text-base lg:text-lg font-medium border-t lg:border-0">
                                Información adicional
                            </h1>
                            <ul class="flex flex-wrap mt-[8px] sp:mt-4 gap-x-[12px] gap-y-[8px] sp:gap-x-6 sp:gap-y-4" style="list-style-type: disc !important;">
                                <li class="flex justify-start items-center lg:w-[45%]"
                                    v-for="include in JSON.parse(experienceData.other_information)"
                                    :key="include"
                                >
                                    <img 
                                        src="/vendor_asset/img/hoster/icons/1.TH.BULLET.LIST.svg"
                                        alt="1.TH.BULLET.LIST"
                                        class="w-[8px] sp:w-4 h-[8px] sp:h-4 mr-[4px] sp:mr-2"
                                    >
                                    <p class="text-[8px] sp:text-sm">
                                        {{ include }}
                                    </p>
                                </li>
                            </ul>

                            <!-- Politicas de cancelacion -->
                            <h1 class="mt-[12px] sp:mt-6 lg:mt-8 text-[12px] sp:text-base lg:text-lg font-medium border-t lg:border-0">
                                Política de cancelación
                            </h1>
                            <div
                                class="mt-[8px] sp:mt-4"
                            >
                                <template v-if="experienceData?.cancellation_policy == 'STANDARD'">
                                    <p class="text-[8px] sp:text-sm">Puede cancelar hasta 24 horas antes de la experiencia para obtener un reembolso completo.</p>
                                    <div class="flex flex-wrap mt-4 gap-x-6 gap-y-4">
                                        
                                        <p class="text-[8px] sp:text-sm lg:w-[45%] flex items-center">
                                            <img 
                                                src="/assets/icons/1.TH.BULLET.LIST.svg"
                                                alt="1.TH.BULLET.LIST"
                                                class="w-[8px] sp:w-4 h-[8px] sp:h-4 mr-[4px] sp:mr-2"
                                            >
                                            <template v-if="language_pag === 'En'">
                                                For a full refund, you must cancel at least 24 hours before the experience start time.
                                            </template>
                                            <template v-if="language_pag === 'Fr'">
                                                Pour un remboursement complet, vous devez annuler au moins 24 heures avant l'heure de début de l'expérience.
                                            </template>
                                            <template v-else-if="language_pag === 'Es'">
                                            Para obtener un reembolso completo, debe cancelar al menos 24horas de antes de la hora de incio de la experiencia.
                                            </template>
                                        </p>
                                        <p class="text-[8px] sp:text-sm lg:w-[45%] flex items-center">
                                            <img 
                                                src="/assets/icons/1.TH.BULLET.LIST.svg"
                                                alt="1.TH.BULLET.LIST"
                                                class="w-[8px] sp:w-4 h-[8px] sp:h-4 mr-[4px] sp:mr-2"
                                            >
                                            Cuaquier cambio realizado menos de 24 horas antes de la hora de inicio de la experiencia no será aceptado.
                                        </p>
                                        <p class="text-[8px] sp:text-sm lg:w-[45%] flex items-center">
                                            <img 
                                                src="/assets/icons/1.TH.BULLET.LIST.svg"
                                                alt="1.TH.BULLET.LIST"
                                                class="w-[8px] sp:w-4 h-[8px] sp:h-4 mr-[4px] sp:mr-2"
                                            >
                                            Si cancela al menos 24 horas antes de la hora de inicio de la experiencia, el monto de pago no será reembolsado.
                                        </p>
                                        <p class="text-[8px] sp:text-sm lg:w-[45%] flex items-center">
                                            <img 
                                                src="/assets/icons/1.TH.BULLET.LIST.svg"
                                                class="w-[8px] sp:w-4 h-[8px] sp:h-4 mr-[4px] sp:mr-2"
                                            >
                                            Los horarios de corte se basan en la hora local de la experiencia.
                                        </p>
                                    </div>
                                </template>
                                <template v-else>
                                    <p class="text-[8px] sp:text-sm">
                                        Esta experiencia no es reembolsable y no se puede cambiar por ningún motivo. Si la cancela o pide una modificación, no se le devolverá el importe abonado.
                                    </p>
                                </template>
                            </div>

                        </div>
                    </div>

                    <!-- Calendario -->
                    <div id="" class="hidden lg:block col-12 col-lg-4 pl-4 pr-2 fixed-calendar relative z-10">
                        <div class="container-calendar h-36 w-full sticky rounded-2xl p-4 z-10" id="container-calendar">
                            <!-- <ShowReserveViator /> -->
                        </div>
                    </div>
                </div>
            </div>

    </div>
</template>


<script setup>
    import { ref, reactive, onMounted, inject, watch, toRefs, computed, provide } from 'vue'
    import { useRouter } from 'vue-router'
    import { Carousel, Pagination, Slide, Navigation } from 'vue3-carousel'
    import 'vue3-carousel/dist/carousel.css'

    // COMPONENTS
    import THTooltip from '@/components/THTooltip' 
    
    const route = useRouter()


    // PROPS
    const props = defineProps({
        paramsRouter: {
            type: Object,
            default: () => ({})
        }
    })
    const { paramsRouter } = toRefs(props)
    
    // STORE
    import { useHotelStore } from '@/stores/modules/hotel'
    const hotelStore = useHotelStore()
    const { hotelData } = hotelStore

    import { useExperienceStore } from '@/stores/modules/experience'
    const experienceStore = useExperienceStore()

    // DATA
    const variantPrice = ref(false)
    const duration = ref(false)
    const availableLanguages = ref(null)
    const textDescription = ref(null)
    const collapseDescriptionEnable = ref(null)
    const collapseDescription = ref(null)
    const includes = ref(null)
    const startMeet = ref(null)
    const endMeet = ref(null)
    const mapLinkStart = ref(null)
    const locations = ref(null)
    const mapLinkEnd = ref(null)


    const experienceData = ref(null)
    const experienceViatorData = ref(null)
    const schedulesData = ref(null)

    onMounted(() => {
        loadExperience()
        loadExperienceInViator()
        loadSchedulesInViator()
    })



    async function loadExperience () {
        let { slug } = paramsRouter.value
        if (!slug) return;
        const response = await experienceStore.$apiFindBySlug({slug})
        if (response.ok) {
            experienceData.value = response.data
        }
    }
    async function loadExperienceInViator () {
        let shortId = getShortId()
        const response = await experienceStore.$apiFindInVIatorByShortId({shortId})
        if (response.ok) {
            experienceViatorData.value = response.data
        }
    }
    async function loadSchedulesInViator () {
        let shortId = getShortId()
        const response = await experienceStore.$apiFindSchedulesInVIator({shortId})
        if (response.ok) {
            schedulesData.value = response.data
        }
    }

    function getShortId () {
        let {slug} = paramsRouter.value
        if (!slug) return;
        const matches = slug.match(/[A-Za-z]*\d+[A-Za-z0-9]*/g);
        if (matches && matches.length > 0) {
            const lastMatch = matches[matches.length - 1]
            return lastMatch
        }
        return;
    }

    function retroceder () {
        ``
    }

</script>

<style lang="scss" scoped>

.text-underline {
    text-decoration: underline;
}

.text-gray-ao{
    color: #a0a0a0;
}

.no-link {
  text-decoration: none;
}

.recomender {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    height: 109px;
    background: #FFFFFF;
    border: 1px solid #FF9C06;
    border-radius: 10px;
}

.recomendation {
    width: 100%;
    background: #FFF6E7;
    border-radius: 10px;
}

.col-1-image {
    -ms-flex: 0 0 4%;
    flex: 0 0 4%;
    max-width: 4%;
}

.exp-card-mobile {
    width: 254px;
    height: 169px;
}

.exp-card-mobile img,
.experience-card img {
    aspect-ratio: 3/2;
    width: 100%;
    object-fit: cover;
}

.experience-card {
    width: 345px;
    height: 230px;
}

.container-experience-card {
    width: 345px;
}



.carousel__prev,
.carousel__next {
    box-sizing: content-box;
    border: 5px solid white;
}

@media(max-width:768px) {

    .mobile-format {
        margin-right: 0px !important;
        margin-left: 0px !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
        margin-bottom: 16px;
    }

    #map {
        margin-left: -16px;
        margin-right: -16px;
        height: 160px;
        width: auto;
    }
}

.mbf-3 {
    margin-bottom: 16px !important;
}

input:focus,
select:focus {
    --tw-ring-color: none;
    border: none;
    outline: none;
}

#carousel-show-place-mobile .carousel__pagination {
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
}


.menu-persons-calender {
    z-index: 2000000 !important;
}

.v-enter-active,
.v-leave-active {
    transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    height: 2.5rem;
    top: 0px;
}

.v-enter-from .inner,
.v-leave-to .inner {
    display: none;
}

.img-exp {
    filter: invert(53%) sepia(3%) saturate(10%) hue-rotate(316deg) brightness(92%) contrast(96%);
    margin-top: -4px;
}

.text-exp {
    color: #717171;
}

.icon-blue {
    /* margin-top: -44px; */
}

.section-active {
    color: #ff9c06;
    border-bottom: #ff9c06;
    border-bottom-width: 3px;
    border-bottom-style: solid;
}

.fixed-calendar .container-calendar {
    top: 6%;
    height: auto;
    border-radius: 10px;
    border: 1px solid #BFBFBF;
    max-width: 95%;
}

#slider img {
    height: 30rem;
}

#slider .gradient {
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 95%);
}

#slider .overlay {
    background-color: rgba(0, 0, 0, 0.5);
}

#slider .shape {
    left: -18px;
    top: -49px;
}

#slide-show-experience .h-slider {
    height: 28rem;
}

#information .hr {
    border-color: #86bcd9;
}

.reserve-enter-active,
.reserve-leave-active {
    transition: all 0.4s ease;
}

.reserve-enter-from,
.reserve-leave-to {
    bottom: -500px;
}

@media (max-width:1024px) {
    .text-mobile {
        color: #505050;
    }

    #slider img {
        height: 13rem;
    }

    .img-mobile {
        height: 13rem;
    }

    #slider .gradient {
        background-image: none;
    }

    #slider .shape {
        top: -38px;
    }

    #slider .slider {
        height: 12rem;
    }

    .carousel-indicators {
        justify-content: left;
    }
}

.page-content-return {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 8px;
    color: #7b7b7b;
}

.carousel-indicators li {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    flex-grow: 0;
    opacity: 1;
    background-color: #fff;
}

.carousel-indicators .active {
    background-color: #ff9c06;
    opacity: 1;
}

html {
    scroll-behavior: smooth;
}

.w-help {
    width: 100%;
}

@media(min-width:1024px) {
    .w-help {
        width: 25rem;
    }
    .carousel__item {
        height: 400px;
        width: 100%;
        justify-content: center;
        align-items: center;
    }
    .carousel__slide {
        padding: 18px;
        height: 400px;
    }
}

@media(max-width:300px) {
    #carousel-show-place-mobile .carousel__pagination {
        /* display: none !important; */
        transform: scale(0.6);
    }
    #content-detail {
        
    }
    .vc-container {
        transform: scale(2);
    }
}



</style>