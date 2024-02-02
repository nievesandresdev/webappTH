<template>
    <Modal 
        :openModal="openModal" 
        @closeModal="openModal = false"
        :customClasess="'max-w-[500px]'"
    >
        <div class="h-14 border-b bg-white rounded-t-xl p-4">
            <a 
                href="javascript:void(0)" 
                class="absolute z-50 top-6 left-4 font-semibold"
                @click="openModal=false"
            >
                <img 
                    class="w-4 h-4"
                    src="/assets/icons/close.svg"
                >
            </a>
            <p class="text-center font-medium text-lg">Más filtros</p>
        </div>
        <div class="overflow-y-auto pb-6 max-h-[27rem]">
            <div class="points px-4 mt-6 text-left">
                <label class="mb-0 text-base font-medium">
                    Valoraciones
                </label>
                <div class="mt-2">
                    <div
                        v-for="(item, index) in scoreList"
                        class="flex mt-2"
                    >
                        <div class="flex items-center">
                            <input 
                                v-model="points"
                                type="checkbox" 
                                class="w-5 h-5 rounded mr-2"
                                :value="item.id"
                                :checked="points.includes(item.id)"
                            >
                            <p class="inline text-sm">{{ item.name }}</p>
                        </div>
                        <p class="font-medium text-sm ml-auto">
                            {{ countPoints[String(index+1)] }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div 
            class="p-4 border-t  bg-white rounded-b-xl flex justify-between"
        >
            <a 
                href="javascript:void(0)"
                @click="cleanPointFilter"
                class="font-medium text-[10px] sp:text-xs my-auto"
            >
                Quitar filtros
            </a>
            <button 
                class="hbtn-primary font-medium text-[10px] text-sm h-10"
                style="width:126px;"
                @click="submitPointsFilter"
            >
                Aplicar filtros
            </button>
        </div>
    </Modal>
</template>
<script setup>
    import { ref } from 'vue'
    import Modal from '@/components/Modal.vue'

    const props = defineProps({
        countPoints:{
            type: Array,
            default : []
        }
    })
    const emit = defineEmits(['submitPointsFilter']);

    const points = ref([])
    const openModal = ref(false)
    const scoreList = [
        {id:'1',name:'1 estrella'},
        {id:'2',name:'2 estrellas'},
        {id:'3',name:'3 estrellas'},
        {id:'4',name:'4 estrellas'},
        {id:'5',name:'5 estrellas'},
    ];

    const open = () =>{
        openModal.value = true;
    }
    const submitPointsFilter = () =>{ 
        openModal.value = false;
        emit('submitPointsFilter',points.value)
    }

    const cleanPointFilter = () =>{ 
        openModal.value = false;
        points.value = [];
        emit('submitPointsFilter',points.value)
    }

    defineExpose({
        open
    });
    
</script>
<style scoped>
/* Estilo para el checkbox cuando no está chequeado */
input[type="checkbox"] {
    accent-color: #2A8873 ; /* Cambia el color del checkbox */
}

/* Estilo para cuando el checkbox está chequeado */
input[type="checkbox"]:checked {
    background-color: #2A8873 ; /* Cambia el color de fondo al estar chequeado */
    border-color: #2A8873 ; /* Cambia el color del borde al estar chequeado */
}

/* Ajusta el estilo de la etiqueta del checkbox para que sea clickeable y se vea mejor */
input[type="checkbox"] + label {
    cursor: pointer;
    padding-left: 2px; /* Espacio para la etiqueta */
    margin-left: 5px; /* Espacio entre el checkbox y la etiqueta */
}

/* Puedes necesitar ajustar los estilos del label y el div que los contiene para alinearlos correctamente */
.checkbox-container label,
.checkbox-container div {
    color: white;
    display: flex;
    align-items: center;
    gap: 10px;
}


</style>