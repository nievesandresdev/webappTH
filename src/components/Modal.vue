<template>
    <Dialog :open="openModal" @close="closeModal" as="div" class="relative">
    <div class="fixed inset-0 bg-[#00000080]  z-[1000]" aria-hidden="true" />

        <div class="fixed inset-0 overflow-y-auto z-[1010]">
            <div :class="`${customBackdrop ? customBackdrop :'flex min-h-full items-center justify-center p-4 text-center'}`">
                <DialogPanel
                    :class="`
                        w-full transform overflow-hidden transition-all
                        rounded-[0.85rem] bg-white align-middle shadow-xl
                        ${customClasess}
                    `"
                >
                    <slot></slot>
                </DialogPanel>
            </div>
        </div>
    </Dialog>
</template>
<script setup>

import { ref } from 'vue'
import { Dialog, DialogPanel} from '@headlessui/vue'

    const props = defineProps({
        openModal: {
            type: Boolean,
            default: false,
        },
        customClasess: {
            type: String,
            default: '',
        },
        customBackdrop: {
            type: String,
            default: null,
        }
    })
    const emit = defineEmits('closeModal');

    function closeModal() {
        emit('closeModal')
    }
</script>


