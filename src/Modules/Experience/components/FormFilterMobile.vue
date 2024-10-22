<template>
    <TransitionRoot appear :show="modalFilter" as="template">
        <Dialog
            as="div"
            @close="close"
            class="relative"
        >
            <div class="fixed top-0 left-0 h-screen w-full bg-[#00000080] z-[1000]" aria-hidden="true" />
            <div class="fixed inset-0 flex w-screen items-center justify-center z-[1200] ">
                <DialogPanel class="w-full max-w-[90%] bg-white rounded-[0.85rem]">
                    <div class="px-3.5 py-3.5 sticky z-30 border-b top-0 bg-white rounded-t-xl">
                        <a 
                            class="absolute z-50 top-5 left-6 font-semibold"
                            @click="close"
                        >
                            <img 
                                class="w-5" 
                                src="/assets/icons/1.TH.CLOSE.svg"
                            >
                        </a>
                        <p class="text-center font-medium text-lg">
                            {{ $t('experience.list-page.btn-more-filter') }}
                        </p>
                    </div>
                    <div class="overflow-y-auto pb-6" style="max-height:27rem">
                        <div class="px-3.5">
                            <!-- filter seacrh -->
                            <div class="relative mt-6">
                                <img 
                                    class="w-5 h-5 absolute left-2.5 top-2.5"
                                    src="/assets/icons/lupa.svg"
                                >
                                <input 
                                    type="text"
                                    class="w-full hinput-primary  py-[8px] px-[12px] h-10 pl-9"
                                    :placeholder="$t('experience.list-page.section-filter.label-search')"
                                    v-model="formFilter.search"
                                    @keyup.enter="submitFilter"
                                >
                            </div>
                            <!-- END filter seacrh -->
                            <!-- filter prices -->
                            <div class="mt-7">
                                <h2 class="text-sm font-medium">
                                    {{ $t('experience.list-page.section-filter.label-price') }}
                                </h2>
                                <div class="flex mt-4">
                                    <div class="w-1/2 pr-2">
                                        <label class="mb-2 text-sm">
                                            {{ $t('experience.list-page.section-filter.label-price-min') }}
                                        </label>
                                        <div class="relative">
                                            <input
                                                v-model="formFilter.price_min"
                                                @keyup.enter="submitFilter"
                                                type="number"
                                                class="w-full hinput-primary  py-[8px] px-[12px] h-8"
                                                :placeholder="$t('experience.list-page.section-filter.placeholder-price-min')"
                                            >
                                            <p class="text-sm absolute right-2.5 top-1.5">€</p>
                                        </div>
                                    </div>
                                    <div class="w-1/2 pl-2">
                                        <label class="mb-2 text-sm">
                                            {{ $t('experience.list-page.section-filter.label-price-max') }}
                                        </label>
                                        <div class="relative">
                                            <input
                                                v-model="formFilter.price_max"
                                                type="number"
                                                @keyup.enter="submitFilter"
                                                class="w-full hinput-primary  py-[8px] px-[12px] h-8"
                                                :placeholder="$t('experience.list-page.section-filter.placeholder-price-max')"
                                            >
                                            <p class="text-sm absolute right-2.5 top-1.5">€</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- END filter prices -->
                            <!-- duration filter -->
                            <div class="mt-6">
                                <h2 class="text-sm font-medium mb-2">
                                    {{ $t('experience.list-page.section-filter.label-duration') }}
                                </h2>
                                <div 
                                    class="mt-2 flex justify-between"
                                    v-for="dur in durationList" :key="dur.id"
                                >
                                    <div class="flex">
                                        <input
                                            v-model="formFilter.duration"
                                            :value="dur.id" type="checkbox"
                                            class="inline-block rounded  mr-2 h-5 w-5"
                                            :checked="formFilter.duration.includes(dur.id)"
                                        >
                                        <label class="text-sm mb-0">
                                            {{dur.name[$i18n.locale]}}
                                        </label>
                                    </div>
                                    <span class="inline-block text-sm">{{ numbersByFilterDuration?.duration?.[dur.id]?.['count'] }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div 
                        class="px-3.5 py-3.5 sticky z-30 border-t bottom-0 bg-white rounded-b-xl flex justify-between items-center"
                    >
                        <a 
                            href="javascript:void(0)"
                            class="underline font-medium text-sm mt-0.5"
                            @click="clearFilters"
                        >
                            {{ $t('experience.list-page.section-filter-history.btn-close') }}
                        </a>
                        <button 
                            class="hbtn-primary text-sm p-1.5"
                            @click="submitFilter"
                        >
                            {{ $t('experience.list-page.btn-submit-filter') }}
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
    import { ref, reactive, onMounted, inject, watch, toRefs, computed, provide } from 'vue'
    import { Dialog, TransitionRoot } from '@headlessui/vue'

    // EMIT
    const emit = defineEmits(['click:close', 'submit:filter', 'click:clearFilters'])

    // PROVIDE
    const formFilter = inject('formFilter')
    const durationList = inject('durationList')
    const numbersByFilterDuration = inject('numbersByFilterDuration')
    const modalFilter = inject('modalFilter')

    // ONMOUNTED
    onMounted(() => {
    })
    
    // FUNCTION
    function submitFilter () {
        emit('submit:filter')
    }
    function clearFilters () {
        emit('click:clearFilters')
    }
    function close () {
        emit('click:close')
    }

</script>

<style scoped>
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}

input[type=number] { -moz-appearance:textfield; }
::-webkit-scrollbar {
    display: none;
}
.sticky {
    -webkit-animation: none;
    animation: none;
}
</style>
