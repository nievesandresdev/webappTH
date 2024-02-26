<template>
    <Modal 
            :openModal="notSavedModal" 
            @closeModal="notSavedModal = false"
            :ZIndex="'z-[1800]'"
            :customClasess="'w-full lg:w-[326px] lg:absolute lg:left-0 lg:right-0 m-auto z-[2000]'"
        >
        <div class="relative text-center px-4 pt-4 text-base font-medium leading-110">
            <img 
                class="w-6 h-6 absolute left-4 top-3.5 cursor-pointer" 
                src="/assets/icons/1.TH.CLOSE.svg" alt=""
                @click="notSavedModal = false"
            >
            {{ $t('stay.noSavedM.title') }}
        </div>

        <div class="body-xs mt-6 px-4 overflow-y-auto">
            <p class="text-sm leading-[150%]">
                {{ $t('stay.noSavedM.body') }}
            </p>
        </div>

        
        <div class="flex justify-between px-4 pb-4 mt-6 items-center">
            <a
                href="javascript:void(0)"
                class="text-xs font-medium underline" 
                @click="exit"
                style="text-decoration: underline;"
            >
                {{ $t('stay.noSavedM.exitButton') }}
            </a>
            <button 
                @click="saveChanges"
                class="hbtn-primary py-3 px-4 text-sm font-medium leading-110"
            >
                {{ $t('stay.noSavedM.saveButton') }}
            </button>
        </div>
    </Modal>
</template>
<script setup>
    import { ref, reactive, computed, onMounted } from 'vue'
    import { useToast } from "vue-toastification";
    import { useI18n } from 'vue-i18n';
    import Modal from '@/components/Modal.vue'

    const emit = defineEmits(['exit','saveChanges'])

    const notSavedModal = ref(false);

    const exit = () => {
        notSavedModal.value = false;
        emit('exit')
    }

    const saveChanges = () => {
        notSavedModal.value = false;
        emit('saveChanges')
    }

    const open = () =>{
        notSavedModal.value = true;
    }
    
    defineExpose({
        open
    });
    
</script>