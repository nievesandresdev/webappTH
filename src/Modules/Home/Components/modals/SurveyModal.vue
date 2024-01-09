<template>
    <div
        v-if="modalMobile"
        class="bg-black opacity-75 w-screen h-screen z-[3000] fixed top-0 left-0 md:hidden"
        @click="modalMobile = false"
    />
    <div v-if="modalMobile" class="inline-block bg-white opacity-100 w-screen h-[95%] z-50 rounded-t-xl px-4 pt-6 pb-8 md:hidden fixed bottom-0 left-0 z-[4000]">
        <!-- <SurveyModalContent /> -->
    </div>
    styleContent="max-width: 428px !important;"
    <Dialog
        :open="modal" class="relative"
    >
        <div class="fixed top-0 left-0 h-screen w-full bg-[#00000080] z-[1000]" aria-hidden="true" />
        <div class="fixed inset-0 flex w-screen items-center justify-center z-[1200] ">
            <DialogPanel class="w-full max-w-[360px] bg-white rounded-[0.85rem]">
                dd
            </DialogPanel>
        </div>
        <!-- <SurveyModalContent /> -->
    </Dialog>
</template>

<script setup>
    import { ref, provide, onMounted, nextTick, inject, watch, reactive } from 'vue'

    import SurveyModalContent from './SurveyModalContent.vue'
        import { Dialog } from '@headlessui/vue'
    
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

    //inject
    const mockup = false
    const stayData = null
    // const $moment = inject('moment')

    //watch stayData
    // watch(stayData, async (value) => {
    //     await nextTick()
    //     openSurvey()
    // })

    //onmounted
    onMounted(async() => {
        await nextTick()
        openSurvey()
    })

    //function
    function openSurvey () {
        modal.value = true
        return;
        // setTimeout(() => {
        //     if (mockup.value) return;
        //     if (stayData.value?.guest) {
        //         let dateNow = $moment()
        //         let dateCheckIn = $moment(`${stayData.value.stay.check_in} ${stayData.value.stay.hour_checkin ?? '00:00'}:00`)
        //         let dateCheckOut = $moment(`${stayData.value.stay.check_out} ${stayData.value.stay.hour_checkout ?? '00:00'}:00`)
        //         // let dateCheckOut_one_before = dateCheckOut.clone().subtract(1, 'days')
        //         let diffDays = dateCheckOut.diff(dateCheckIn, 'days')
        //         let diffDaysNow = dateCheckOut.diff(dateNow, 'days')
        //         if (diffDays >= 4) {
        //             dateNow.add(1, 'days')
        //             if (dateNow.isSameOrAfter(dateCheckOut, 'day')) {
        //                 form.stay_id = stayData.value.stay.id
        //                 form.guest_id = stayData.value.guest.id
        //                 if (WINDOW_WIDTH < 640){
        //                     modalMobile.value = true
        //                 } else {
        //                     modal.value = true
        //                 }
        //             }
        //         } else {
        //             // console.log(stayData.value.id, 'stayData.value')
        //             if (dateNow.isSameOrAfter(dateCheckOut, 'day')) {
        //                 form.stay_id = stayData.value.stay.id
        //                 form.guest_id = stayData.value.guest.id
        //                 if (WINDOW_WIDTH < 640){
        //                     modalMobile.value = true
        //                 } else {
        //                     modal.value = true
        //                 }
        //             } 
        //         }
        //     }
        // }, 2000)
    }
</script>