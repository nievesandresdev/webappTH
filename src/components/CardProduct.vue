<template>
    <button 
        class="w-full card-exp rounded-t-lg text-left" @click="go(data)" :disabled="$utils.isMockup()"
        :class="{'hcursor-mobile no-hover':$utils.isMockup()}"
    >
        <!-- cursor-pointer -->
        <div class="container-image rounded-t-lg w-full" :class="heightImg">
            <img
                v-if="data.place_images?.[0]?.url"
                class="img w-full h-full lg:h-48 2xl:h-52 overflow-hidden rounded-t-lg object-cover"
                :src="placeStore.$loadImage(data.place_images?.[0]?.image)"
                alt="img_act"
                loading="lazy"
            >
            <div v-else class="w-full h-full bg-gray-50 rounded-t-lg"></div>
        </div>
        <div class="pt-1.5 sp:pt-4 mb-2 flex justify-between items-center h-6 sp:h-12">
            <div class="mr-1 overflow-x-auto flex flex-1 h-4 sp:h-6">
                <div>
                    <div v-if="data.recommended || data.place_featured" class="tag py-0.5 sp:py-1 px-2 h-3 sp:h-6 rounded-full bg-[#FFEBCC] mr-2">
                        <p class="text-[6px] sp:text-[10px] font-medium htext-gray-500">
                            <template v-if="data.recommended">
                                {{ $utils.capitalize($t('home.card-product.recommended')) }}
                            </template>
                            <template v-else-if="data.place_featured">
                                {{ $utils.capitalize($t('home.card-product.featured')) }}
                            </template>
                        </p>
                    </div>
                </div>
                <div
                    v-if="place && data.category && $t(`category.${$utils.slufy(data.category)}`)"
                    class="whitespace-nowrap px-1 sp:px-2 h-3 sp:h-full rounded-full bg-blue-100 font-medium text-gray-400 leading-3 sp:leading-6  text-[6px] sp:text-[10px]"
                >
                    {{ $utils.capitalize($t(`category.${$utils.slufy(data.category)}`)) }}
                </div>
            </div>
            <div v-if="place && data?.num_reviews > 0 " class="flex items-center w-[65px] sp:w-[103px]">
                <div class="flex flex-col mr-1 w-full">
                    <span class="flex m-0 p-0 h-max">
                        <img
                            v-for="(value, index) in 5"
                            :key="index"
                            :src="Math.round(converStar(data.num_stars))  >= value ? '/assets/icons/full_star_review.svg' : '/assets/icons/null_star_review.svg'" 

                            class="w-[6px] sp:w-[12px] inline mr-0.5"
                        />
                    </span>
                    <span class="font-medium inline-block text-[6px] sp:text-[10px]">{{data.num_reviews}} reviews</span>
                </div>
                <div class="border-2 border-yellow-400 rounded sp:rounded-lg p-[3px] sp:p-1.5 font-regular text-[8px] sp:text-xs">
                    {{converStar(data.num_stars).toFixed(1)}}
                </div>
            </div>
        </div>
        <h5 class="truncate-2 text-[10px] sp:text-sm font-medium h-6 sp:h-10" v-html="data.title"></h5>
        <h6  v-if="data?.price_discount > 0" class="font-medium line-through mb-2 text-[10px] sp:text-[10px]">Desde {{ data.price }}€</h6>
        <h5 v-if="!place" class="text-[12px] sp:text-base font-medium mb-4" :class="{'text-orangec': data?.price_discount > 0}">Desde {{ data?.price_discount > 0 ? data?.price_discount : data.price }}€</h5>
        <div class="flex items-center mt-2" v-if="distance">
            <img class="w-2.5 sp:w-4 h-2.5 sp:h-4 mr-0.5 sp:mr-1" src="/assets/icons/1.TH.Location.svg" alt="Location">
            <p class="text-[8px] sp:text-xs font-medium">{{ data.cityName }}</p>
        </div>
        <div class="flex items-center mt-2" v-if="distance">
            <img class="w-2.5 sp:w-4 h-2.5 sp:h-4 mr-0.5 sp:mr-1" src="/assets/icons/1.TH.footstep.svg" alt="distance">
            <p class="text-[8px] sp:text-xs font-medium"> a {{ distance }} km</p>
        </div>
    </button>
</template>

<script setup>
    import { onMounted, computed } from 'vue'
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const {place, data} = defineProps({
        place: {
            type: Boolean,
            default: false,
        },
        data: {
            type: Object,
            default: () => ({}),
        },
        heightImg: {
            type: String,
            default: '',
        },
        distance: {
            type: String,
            default: null,
        },
    })

        // STORE
    import { usePlaceStore } from '@/stores/modules/place'
    const placeStore = usePlaceStore()

    const url_flag = {
        es: '/vendor_asset/img/admin/icons/espana.png',
        en: '/vendor_asset/img/admin/icons/reino-unido.png',
        fr: '/vendor_asset/img/admin/icons/francia.png',
        'Sin idioma': '/vendor_asset/img/admin/icons/sinidioma.svg'
    }
    const days_exp = {
        '0': 'D',
        '1': 'L',
        '2': 'M',
        '3': 'X',
        '4': 'J',
        '5': 'V',
        '6': 'S',
    }
    const url_icon = '/vendor_asset/img/landing/icons/'
    
    const url_hicitty = ''
    
    onMounted(() => {
    })

    //FUNCTIONS
    function getActImage (images) {
        let store = place ? 'place' : 'activity'
        if (images.length === 0) return null
        if (place)  {
            return `/storage/places/${images[0].image}` 
        }
        return images[0].url
        // var im = images[0].api ? images[0].url : `${url_hicitty}/storage/${store}/${images[0].url}` 
    }
    function go (item) {
        router.push({name: 'PlaceDetail', params:{ id: item.id }})
    }
    function filterTitle (title,chars) {
        if (title) {
            if(title.length > chars){
                title =  title.slice(0, chars)+'...';
            }    
        }
        return title;
    }
    function converStar(value){
        if(!value) return 0
        return parseFloat(value.replace(",", "."))
    }

</script>

<style lang="scss">
    ::-webkit-scrollbar {
    display: none;
    }

    .card-exp{
        //width: 242px;
        .container-image {
            height: 96px;
        }
    }
    @media (min-width:300px) {
        .card-exp{
            //width: 242px;
            .container-image {
                height: 161px;
            }
        }
    }
    @media (min-width:768px) {
        .card-exp{
            //width: 260px;
            .container-image {
                height: 173px;
            }
        }
    }
   
    @media (min-width:1280px) {
        .card-exp{
            //width: 302px;
            .container-image {
                height: 201px;
            }
        }
    }

    .container-image{
        overflow: hidden;
        transition: all 500ms ease;
        /*&__img {
            transition: all 500ms case;
            &:hover{
                transition: scale(1.2);
            }
        }*/
    }

    .container-image img {
        width: 100%;
        height: 100%;
        aspect-ratio: 1.5;
        transition: all 500ms ease;
    }

    .container-image {
        .img:hover {
            transform: scale(1.2);
        }
    }

    .truncate-2 {
        overflow: hidden; /* oculta cualquier contenido que se desborde del contenedor */
        text-overflow: ellipsis; /* agrega tres puntos suspensivos al final del texto */
        display: -webkit-box; /* para mostrar el contenido en varias líneas*/
        -webkit-line-clamp: 2; /* para establecer el número máximo de líneas a 2 */
        -webkit-box-orient: vertical; /* para establecer la dirección de la caja en vertical */
        }

        @media (min-width: 300px){
            .sp\:px-2 {
                padding-left: 0.5rem !important;
                padding-right: 0.5rem !important;
            }
        }
</style>