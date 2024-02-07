<template>
    <div
        v-if="modalMobile"
        class="bg-black opacity-75 w-screen h-screen z-[3000] fixed top-0 left-0 md:hidden"
        @click="modalMobile = false"
    />
    <div v-if="modalMobile" class="inline-block bg-white opacity-100 w-screen h-[95%] z-50 rounded-t-xl px-4 pt-6 pb-8 md:hidden fixed bottom-0 left-0 z-[4000]">
        <FormSurveyContent />
    </div>
    <!-- styleContent="max-width: 428px !important;" -->
    <TransitionRoot appear :show="modal" as="template">
        <Dialog
            as="div"
            @close="close"
            class="relative"
        >
            <div class="fixed top-0 left-0 h-screen w-full bg-[#00000080] z-[1000]" aria-hidden="true" />
            <div class="fixed inset-0 flex w-screen items-center justify-center z-[1200] ">
                <DialogPanel class="w-full max-w-[428px] bg-white rounded-[0.85rem] p-4">
                    <FormSurveyContent />
                </DialogPanel>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
    import { ref, provide, onMounted, nextTick, inject, watch, reactive } from 'vue'

    import FormSurveyContent from './FormSurveyContent.vue'
    import { Dialog, TransitionRoot } from '@headlessui/vue'
    
    // STATE
    import { useHotelStore } from '@/stores/modules/hotel'
    const hotelStore = useHotelStore()
    const { hotelData } = hotelStore
    import { useHotelOtaStore } from '@/stores/modules/hotelOta'
    const hotelOtaStore = useHotelOtaStore()
    import { useStaySurveyStore } from '@/stores/modules/staySurvey'
    const staySurveyStore = useStaySurveyStore()
    import { useStayStore } from '@/stores/modules/stay'
    const stayStore = useStayStore()
    const { stayData } = stayStore
    import { useGuestStore } from '@/stores/modules/guest'
    const guestStore = useGuestStore()
    const { guestData } = guestStore
    
    // STATIC DATA
    const WINDOW_WIDTH = window.innerWidth

    //DATA
    const modalMobile = ref(false)
    const modal = ref(false)
    const form = reactive({
        id: null,
        stay_id: null,
        guest_id: null,
        steps: null,
        type: '',
        description: '',
    })

    //provide
    provide('form', form)
    provide('modal', modal)
    provide('modalMobile', modalMobile)

    //inject
    const mockup = false
    const $moment = inject('$moment')

    // watch stayData
    watch(()=>guestStore.guestData?.id, async (value) => {
        })
    watch(()=>stayStore.stayData?.id, async (value) => {
        await nextTick()
        await staySurveyStore.$findByParams({guest_id: guestStore.guestData?.id, stay_id: stayStore.stayData?.id})
        openSurvey()
    })

    //onmounted
    onMounted(async() => {
        await nextTick()
        await hotelOtaStore.$getAll()
    })

    function close () {
        modal.value = false
    }

    //function
    function openSurvey () {
        setTimeout(() => {
            if (mockup.value) return;
            const stay = stayStore.stayData
            const guest = guestStore.guestData
            if (stay && !staySurveyStore.surveyData) {
                let dateNow = $moment()
                let dateCheckIn = $moment(`${stay?.check_in} ${stay?.hour_checkin ?? '00:00'}:00`)
                let dateCheckOut = $moment(`${stay?.check_out} ${stay?.hour_checkout ?? '00:00'}:00`)
                // let dateCheckOut_one_before = dateCheckOut.clone().subtract(1, 'days')
                let diffDays = dateCheckOut.diff(dateCheckIn, 'days')
                let diffDaysNow = dateCheckOut.diff(dateNow, 'days')
                if (diffDays >= 4) {
                    dateNow.add(1, 'days')
                    if (dateNow.isSameOrAfter(dateCheckOut, 'day')) {
                        form.stay_id = stay?.id
                        form.guest_id = guest?.id
                        if (WINDOW_WIDTH < 640){
                            modalMobile.value = true
                        } else {
                            modal.value = true
                        }
                    }
                } else {
                    // console.log(id, 'stayData.value')
                    if (dateNow.isSameOrAfter(dateCheckOut, 'day')) {
                        form.stay_id = stay?.id
                        form.guest_id = guest?.id
                        if (WINDOW_WIDTH < 640){
                            modalMobile.value = true
                        } else {
                            modal.value = true
                        }
                    } 
                }
            }
        }, 2000)
    }
</script>