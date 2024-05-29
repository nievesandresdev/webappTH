<template>
    <div 
        v-if="open"
        class="bg-black w-screen z-40 fixed top-0 left-0 lg:hidden h-[100vh]"
    >
        <div class="bg-white w-screen z-50 fixed bottom-0 top-0 left-0 lg:hidden h-[108vh]">
            <div class="pt-7 px-4 mb-4">
                <div class="relative text-center">
                    <button class="mb-6 text-xl top-0 left-0 absolute" @click="closeModal">
                        <img 
                            src="/assets/icons/1.TH.CLOSE.svg" alt="icon_close" 
                            class="w-6 h-6"
                        >
                    </button>
                    <h4 class="text-lg font-medium inline-block text-black">{{ $t('place.city') }}</h4>
                </div>
            </div>
            <div class="px-4 mb-4">
                <div class="relative">
                    <img 
                        class="w-5 h-5 top-3 left-4 absolute"
                        :src="`/assets/icons/search.svg`"
                        alt="menu_explora"
                    >
                    <input
                        v-model="form.search"
                        type="text"
                        class="border rounded-[6px] w-full py-2 pl-12 h-11"
                        :class="{'border-black':form.search,'border-gray-300':!form.search}"
                        :placeholder="$t('place.city') +'...'"
                        @input="searchCity"
                    >
                </div>
            </div>
            <div class="border border-gray-300 mx-[-16px]"></div>
            <div class="px-5 pb-5" v-if="form.search">
                    <div class="h-52 overflow-y-auto">
                        <div
                            v-for="city in cityList" :key="city"
                            class="flex hover:bg-gray-100 w-full cursor-pointer h-14 mt-4"
                            @click="selectCity(city.slug)"
                        >
                            <img class="w-10 h-10 my-auto" src="/assets/icons/1.TH.PINPOINTBACKGROUND.svg" alt="icon_PINPOINT">
                            <div class="border-b border-gray-300 w-full truncate h-full ml-2">
                                <p
                                    class="text-sm font-medium truncate text-left leading-10 mt-2"
                                >
                                    {{city.title}}
                                </p>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, toRefs, inject, watch, reactive, onMounted, provide } from 'vue';
    
    import { useCityStore } from '@/stores/modules/city';
    const cityStore = useCityStore();
    const props = defineProps({
        language: {
            type: String,
            default: 'es',
        },
        currentCity:{
            type: String,
            default: 'Sevilla',
        },
        open:{
            type: Boolean,
            default: false,
        }
    })

    const emit = defineEmits(['closeModal','submitSearchCity'])

    //DATA
    const form = reactive({
        search: null
    });
    const cityList = ref([]);
    const searchingCity = ref(false);
    const debounce = ref(null)

    onMounted(() => {
    })

    //FUNCTIONS
    function searchCity(){
        if(form.search){
            clearTimeout(debounce.value)
            debounce.value = setTimeout(async() => {
                if(form.search){
                    const response = await cityStore.$apiGetAll({search: form.search})
                    // console.log('searchCity',response)
                    if (response.ok) {
                        cityList.value = response.data
                    }   
                }
            }, 500)
        }
    }


    function closeModal(){
        emit('closeModal')
    }
    
    function selectCity(name) {
        form.search = null
        emit('submitSearchCity', name)
    }
</script>

<style lang="scss" scoped>
   .li-city:hover{
        background-color: #F3F3F3 !important;
   }
</style>