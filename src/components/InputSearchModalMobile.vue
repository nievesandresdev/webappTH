<template>
    <div
        v-if="showDropdownMobile"
        class="bg-black opacity-75 w-screen z-40 fixed top-0 left-0 lg:hidden"
        style="height: 100vh"
        @click="showDropdownMobile = false"
    />
    <div v-if="showDropdownMobile" class="bg-white w-screen z-50 fixed bottom-0 left-0 rounded-t-xl lg:hidden" style="height: 90vh;">
        <div class="pt-7 px-4 mb-3.5">
        <div class="relative text-center">
            <button class="mb-6 absolute top-1.5 left-0" @click="closeModal">
                <img 
                    src="/assets/icons/1.TH.CLOSE.svg" alt="icon_close" 
                    class="w-5 h-5"
                >
            </button>
            <h4 class="text-lg medium inline-block text-black">{{ $t('layout.input-search.search') }}</h4>
        </div>
        </div>
        <div class="px-4 mb-4">
            <div class="relative">
                <img 
                    class="w-5 h-5 absolute top-3 left-4"
                    :src="`/assets/icons/search.svg`"
                    alt="menu_explora"
                >
                <input
                    v-model="formSearch.search"
                    type="text"
                    class="border-2 rounded-lg w-full py-2 border-gray-300 pl-12"
                    :placeholder="$route.name == 'PlaceList' ? $t('place.cityPlaceholder') : $t('layout.input-search.placeholder')"
                    @input="inputSearch()"
                >
            </div>
        </div>
        <div class="border-b-2 border-gray-300 w-full mb-4"></div>
        <div class="px-5 pb-5">
            <div class=" h-52 overflow -y-auto">
                <div
                    v-for="(item, index) in data"
                    class="flex items-center hover:bg-gray-200 w-full cursor-pointer"
                    @click="selectSearch(item)"
                >
                    <img class="rounded-lg w-10 h-10 mr-2 object-cover" :src="placeStore.$loadImage(item.image)">
                    <div class="border-b border-gray-300 w-full truncate-1 h-full" :class="item.type == 'city' ? 'py-3.5' : 'py-2'">
                        <p class="text-sm font-medium truncate-1" :class="{'mb-1': item.type == 'city'}" v-html="item.title"></p>
                        <p
                            v-if="item.type != 'city'"
                            class="text-xs font-light mt-1"
                        >
                            {{ item.city }} <span v-if="item.type == 'experience'">- {{ $t('layout.input-search.from') }} {{ item.price }}€</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, inject } from 'vue'
    import { useRouter   } from 'vue-router'

    const router = useRouter();

    // STORE
    import { useExperienceStore } from '@/stores/modules/experience'
    const experienceStore = useExperienceStore()
    import { usePlaceStore } from '@/stores/modules/place'
    const placeStore = usePlaceStore()
    // EMIT
    const emit = defineEmits(['inputSearch'])

    //DATA STATIC
    const urlStorage = process.env.VUE_APP_STORAGE_URL;
    const translate = {
        btn_search: {
            es: 'Buscar',
            en: 'Search',
            fr: 'Chercher',
        },
        dropdown_city: {
            title: {
                es: 'Ciudades destacadas',
                en: 'Featured cities',
                fr: 'Villes en vedette',
            },
            from: {
                es: 'desde',
                en: 'from',
                fr: 'depuis',
            }
        },
    }

    // DATA

    // INJECT
    const formSearch = inject('formSearch')
    const data = inject('data')
    const showDropdownMobile = inject('showDropdownMobile')

    // FUNCTION

    function selectSearch (item) {
        closeModal();
        if(item.type == 'place'){
            router.push({name: 'PlaceDetail', params:{ id: item.id }})
        }else{
            router.push({name: 'ExperienceDetail', params:{ slug: item.slug }})
        }
    }

    function closeModal () {
        showDropdownMobile.value = false
    }

    function inputSearch () {
        emit('input:search')
    }

</script>