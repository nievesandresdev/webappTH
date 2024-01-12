<template>
    <div ref="refButton" class="inline-block">
        <slot name="button"></slot>
    </div>
    <div v-if="open" ref="refDropdownContainer"  class="absolute bg-white shadow-md p-4 z-50 rounded-sm" style="width: 300px !important; top: 44px;" :style="left ? 'left: -220px !important;' : 'left: 0px !important;'" >
        <div class="relative">
            <input 
                class="h-11 w-full border rounded-[6px] pl-[40px] text-sm" 
                v-model="city"
                @input="searchCity"
            >
            <img src="/assets/icons/lupa.svg" class="absolute left-3.5 top-3">
            <h5 
                v-for="(item, index) in cities"
                :key="index" 
                class="h-11 text-base cursor-pointer pl-6 py-2.5"
                @click="selectCity(item.title)"
            >
                {{item.title}}
            </h5>
            <h5 v-if="searchingCity && cities.length == 0" class="h-11 text-base cursor-pointer pl-6 py-2.5">
                Cargando...
            </h5>
            <h5 v-else-if="city && !searchingCity && cities.length == 0" class="h-11 text-base cursor-pointer pl-6 py-2.5">
                Sin resultados...
            </h5>
        </div>
        <div>
        </div>
    </div>
</template>
<script setup>
    import { ref, toRefs, provide, onMounted, onUnmounted, nextTick } from 'vue'

    // STORE
    import { useCityStore } from '@/stores/modules/city'
    const cityStore = useCityStore()

    const emit = defineEmits(['submitSearchCity', 'update:open'])
    //PROPS
    const props = defineProps({
        left: {
            type: Boolean,
            default: false,
        },
        right: {
            type: Boolean,
            default: false,
        },
        open: {
            type: Boolean,
            default: false,
        },
        classes: {
            type: String,
            default:'',
        },
        endpoint: {
            type: String,
            default:'hoster.plataform.cityguide',
        },
        data: {
            type: Object,
            default:{},
        },
    })
    const { data, open } = toRefs(props)

    //cities
    let city =  ref(null);
    let cities = ref([])
    let searchingCity = ref(false)
    let debounce = ref(null)
    const refDropdownContainer = ref(null)
    const refButton = ref(null)
    // provide('type', type)

    //FUNCTIONS
    function selectCity(name) {
        searchingCity.value = false
        cities.value = []
        city.value = ''
        emit('submitSearchCity', name)

        updateValue(false)
    }
    
    function searchCity() {
        searchingCity.value = true;
        clearTimeout(debounce.value)
        debounce.value = setTimeout(async() => {
            if(city.value){
                const response = await cityStore.$apiGetAll({search: city.value})
                console.log(response, 'response')
                if (response.ok) {
                    cities.value = response.data
                }
                searchingCity.value = false
            }else{
                searchingCity.value = false
            }
        }, 500)
    }

    const updateValue = (value) => {
        emit('update:open', value)
    }


    // UPDATE STATUS MENU

    const handleClickOutside =  (event) => {
        if (
            refDropdownContainer.value && !refDropdownContainer.value.contains(event.target) &&
            refButton.value && !refButton.value.contains(event.target)
        ) {
                updateValue(false)
        }
    };

    onMounted( () => {
        document.addEventListener('click', handleClickOutside)
    });

    onUnmounted( () => {
        document.removeEventListener('click', handleClickOutside)
    });

</script>
<style>
h5:hover{
    background-color: #F3F3F3;
}
</style>