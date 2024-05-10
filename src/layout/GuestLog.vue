<template>
    <Dialog :open="openModal" class="relative">
    <!-- The backdrop, rendered as a fixed sibling to the panel container -->
    <div class="fixed top-0 left-0 h-screen w-full bg-[#00000080] z-[2000]" aria-hidden="true" />

    <!-- Full-screen container to center the panel -->
    <div 
        class="fixed left-0 lg:top-0 bottom-0 lg:right-0 flex w-screen items-center justify-center z-[2500]" 
        :class="openModal ? 'dialog-enter-active' : 'dialog-leave-active'"
    >
        <!-- The actual dialog panel -->
        <DialogPanel class="w-full lg:max-w-[360px] bg-white rounded-t-[0.85rem] lg:rounded-b-[0.85rem]">
            <div class="relative">
                <h1 class="text-lg font-medium text-center leading-6 pt-4">
                    {{ $utils.capitalize($t('guest.guestLog.title')) }}
                </h1>
                <div class="absolute top-3 right-4">
                    <MiniLangDropdown v-model="form.language" />
                </div>
            </div>
            
            <div class="">
                <div class="mt-4 px-4">
                    <THInputText
                        :textLabel="$t('guest.guestLog.name.label')"
                        :placeholder="$t('guest.guestLog.name.placeholder')"
                        v-model="form.name"
                        :customClasses="{
                            'hborder-gray-400':!form.name,
                            'hborder-alert-negative':errorsKey.includes('name'),
                        }"
                    />
                </div>
                <div class="mt-4 px-4" v-if="guestData?.name !== null">
                    <THInputText
                        :textLabel="$t('guest.guestLog.email.label')"
                        :placeholder="$t('guest.guestLog.email.placeholder')"
                        :type="'email'"
                        v-model="form.email"
                        @handleError="emailError = $event"
                        :customClasses="{
                            'hborder-gray-400':!form.email
                        }"
                        :textError="$t('guest.guestLog.email.error')"
                    />
                </div>
            </div>
            <div class="mt-6 text-right p-4 border-t">
                <button 
                    type="submit"
                    class="hbtn-cta py-3 px-4 text-sm leading-4"
                    :class="{'cta-disabled':!valid || processingForm}"
                    :disabled="!valid || processingForm"
                    @click="submitForm" 
                >
                    {{ processingForm ? $t('guest.guestLog.processing')+'...' : $t('guest.guestLog.button') }}
                </button>
            </div>
            
        </DialogPanel>
    </div>
    </Dialog>
</template>

<script setup>
import { onMounted, reactive, ref, computed, watch } from 'vue';
import THInputText from '@/components/THInputText.vue';
import MiniLangDropdown from '@/layout/Components/MiniLangDropdown.vue';
import { Dialog } from '@headlessui/vue'
import { useGuestStore } from '@/stores/modules/guest'
import { useLocaleStore } from '@/stores/modules/locale'
import { useHotelStore } from '@/stores/modules/hotel'

const hotelStore = useHotelStore();
const { hotelData } = hotelStore;

const props = defineProps({
    openModal: {
        type:Boolean,
        default:false
    }
})

const emit = defineEmits(['closeModal']);

const guestStore = useGuestStore()
const { getLocalGuest } = guestStore;

//data
const errorsKey = ref([]);
const emailError = ref(false);
const guestData = ref(null);
const subject = ref(null);
const processingForm = ref(false);


const form = reactive({
    name: guestData.value?.name ?? null,
    email: guestData.value?.email ?? null,
    // language: guestData.value?.lang_web ?? 'es',
    language: hotelData.language_default_webapp ?? 'es',
});


const submitForm = async () =>{
    form.language = !form.language ? localStorage.getItem('locale') : form.language;
    processingForm.value = true
    const response = await guestStore.saveOrUpdate(form);
    processingForm.value = false
    
    if(response){
        emit('closeModal')
    }
}

//COMPUTED
const valid = computed(() => {
    return form.name && !emailError.value && form.email
})

// Observa los cambios en guestData y actualiza el formulario
watch(() => props.openModal, (newGuestData) => {
    guestData.value = getLocalGuest();
    console.log('props.openModal Guest Log')
    if (guestData.value) {
        form.name = guestData.value?.name;
        form.email = guestData.value?.email;
        form.language = guestData.value?.lang_web;
    }
}, { immediate: true }); // El flag 'immediate' asegura que se ejecute inmediatamente después de la creación del watcher
</script>   
<style scoped>
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}

.dialog-enter-active {
    animation: fadeIn 0.5s ease;
}

.dialog-leave-active {
    animation: fadeOut 0.5s ease;
}
</style>



