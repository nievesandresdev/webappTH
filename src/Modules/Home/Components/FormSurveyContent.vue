<template>
    <div class="flex flex-col justify-between h-full">
        <div :class="{'mb-8': tab == 1 || (tab == 2 && form.type != 'GOOD')}">
            <div
                class="mb-6 flex"
                :class="{'md:hidden': tab == 3}"
            >
                <button class="" @click="close()">
                    <img 
                        src="/assets/icons/1.TH.CLOSE.svg" alt="icon_close" 
                        class="w-6 h-6"
                    >
                </button>
            </div>
            <div
                v-if="tab == 1"
                id="tab-1"
            >
                <h2 class="text-lg font-semibold mb-4">{{ $t('home.form-survey.title') }}</h2>
                <p class="mb-8">{{ $t('home.form-survey.subtitle') }}</p>
                <FormSurveyContentTabEmojis />
            </div>
            <div
                v-if="tab == 2"
                id="tab-2"
            >
                <!-- v-if="form.type == 'GOOD'" -->
                <div v-if="form.type == 'GOOD'" class="w-full">
                    <div class="flex justify-center mb-8">
                        <img
                            :src="`/assets/icons/1.TH.EMOJI.GOOD.ACTIVE.DEFAULT.svg`"
                            alt="1.TH.EMOJI.GOOD"
                        />
                    </div>
                    <div :class="{'mb-8': urlReviewGoogle || urlReviewTripadvisor}">
                        <h2 class="text-lg font-semibold mb-4">¡Nos alegra que hayas disfrutado en {{ hotelData.name }}!</h2>
                        <p v-if="urlReviewGoogle || urlReviewTripadvisor" class="">Si te ha gustado tu estancia con nosotros, nos encantaría que compartieras tu experiencia positiva. Tu opinión ayuda a otros viajeros a conocernos mejor.</p>
                    </div>
                    <div v-if="urlReviewGoogle || urlReviewTripadvisor" class="mb-8 flex flex-column space-y-4">
                        <button
                            v-if="urlReviewGoogle"
                            class="py-2 px-3 text-sm relative w-full rounded-[6px] border-1 border-black"
                            @click="goOta('google')"
                        >
                            <span class="absolute top-1.5 left-3">
                                <img
                                    :src="`/assets/icons/1.TH.GOOGLE.svg`"
                                    alt="1.TH.GOOGLE"
                                />
                            </span>
                            Continuar con Google
                        </button>
                        <button
                            v-if="urlReviewTripadvisor"
                            class="py-2 px-3 text-sm relative rounded-[6px] border-1 border-black w-full"
                            @click="goOta('tripadvisor')"
                        >
                            <span class="absolute top-1.5 left-3">
                                <img
                                    :src="`/assets/icons/1.TH.TRIPADVISOR.svg`"
                                    alt="1.TH.GOOGLE"
                                />
                            </span>
                            Continuar con Tripadvisor
                        </button>
                    </div>
                    <div :class="urlReviewGoogle || urlReviewTripadvisor ? 'mb-2': 'mb-4'">
                        <p class="text-sm">Si hiciste tu reserva a tráves de una <strong>agencia online</strong>, prodrían pedirte que <strong>des tu opinión</strong> en los próximos días. Nos encantaría. si pudieras tomarte un momento para <strong>proporcionarla.</strong></p>
                        <p
                            class="text-sm mt-2"
                            :class="{'hidden': urlReviewGoogle || urlReviewTripadvisor}"
                        >Tu opinión ayuda a otros viajeros a conocernos mejor</p>
                    </div>
                    <p class="text-center text-sm"><strong>¡Gracias por elegirnos!</strong></p>
                </div>
                <div v-if="form.type == 'NORMAL'" class="w-full">
                    <div class="flex justify-center mb-8">
                        <img
                            :src="`/assets/icons/1.TH.EMOJI.NORMAL.ACTIVE.DEFAULT.svg`"
                            alt="1.TH.EMOJI.GOOD"
                        />
                    </div>
                    <h2 class="text-lg font-semibold mb-4">Lamentamos que no haya sido perfecto.</h2>
                    <p class="mb-2">Nos encantaria conocer tu opinión, es muy importante para nosotros.</p>
                    <textarea
                        v-model="form.description"
                        class="text-sm w-full box-input-field flex h-full items-center hoverForm h-[6.75rem] rounded-6"
                        :placeholder="`Escriba tu feedback para el ${ hotelData.name }`"
                        maxlength="300"
                        :class="{
                            'hborder-gray-400 htext-gray-500' : !form.description,
                            'hborder-black-100': form.description,
                        }"
                    />
                    <p class="mt-2 text-xs text-right">{{ lengthDescription }}/300</p>
                </div>
                <div v-if="form.type == 'WRONG'" class="w-full">
                    <div class="flex justify-center mb-8">
                        <img
                            :src="`/assets/icons/1.TH.EMOJI.WRONG.ACTIVE.DEFAULT.svg`"
                            alt="1.TH.EMOJI.GOOD"
                        />
                    </div>
                    <h2 class="text-lg font-semibold mb-4">Lamentamos que no haya sido perfecto.</h2>
                    <p class="mb-2">Nos encantaria conocer tu opinión, es muy importante para nosotros.</p>
                    <textarea
                        v-model="form.description"
                        class="text-sm w-full box-input-field flex h-full items-center hoverForm h-[6.75rem] rounded-6"
                        placeholder="Escriba tu feedback para el Hotel America"
                        maxlength="300"
                        :class="{
                            'hborder-gray-400 htext-gray-500' : !form.description,
                            'hborder-black-100': form.description,
                        }"
                    />
                    <p class="mt-2 text-xs text-right">{{ lengthDescription }}/300</p>
                </div>
            </div>
            <div
                v-if="tab == 3"
                id="tab-3"
            >
                
                <div class="flex justify-center mb-4">
                    <img
                        :src="`/assets/icons/1.TH.CHECK.OUTLINED.svg`"
                        alt="1.TH.CHECK.OUTLINED"
                    />
                </div>
                <h2 class="text-lg font-semibold mb-4 text-center">{{ $t('home.form-survey.message-success-title') }}</h2>
                <p class="text-center">{{ $t('home.form-survey.message-success-text') }}</p>
            </div>
        </div>
        <div v-if="tab == 1 || (tab == 2 && form.type != 'GOOD')" class="text-right">
            <button
                class="w-full md:w-auto px-4 py-3 text-center hbtn-cta"
                :disabled="!form.type"
                @click="nextTab()"
            >
                {{ tab == 1 ? $t('home.form-survey.btn-next') : $t('home.form-survey.btn-submit') }}
            </button>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, reactive, inject, provide, onMounted } from "vue"

    // COMPONENTS
    import FormSurveyContentTabEmojis from './FormSurveyContentTabEmojis.vue'

    // STATE
    import { useStaySurveyStore } from '@/stores/modules/staySurvey'
        const staySurveyStore = useStaySurveyStore()
    import { useHotelStore } from '@/stores/modules/hotel'
    const hotelStore = useHotelStore()
    const { hotelData } = hotelStore
    import { useHotelOtaStore } from '@/stores/modules/hotelOta'
    const hotelOtaStore = useHotelOtaStore()
    const { hotelOtasData } = hotelOtaStore

    //DATA
    const tab = ref(1)
    const loadingSubmit = ref(false)
    const otasSelected = ref([])
    const urlReviewGoogle = ref('')
    const urlReviewTripadvisor = ref('')

    //COMPUTED
    const lengthDescription = computed(() => {
        return form.description.length
    })
    const enableSubmit = computed(() => {
        let option_1 = tab.value == 1 && form.type == 'GOOD'
        let option_2 = tab.value == 2 && ['NORMAL', 'WRONG'].includes(form.type)
        return option_1 || option_2
    })

    //PROVIDE

    // INJECT
    const modal = inject('modal')
    const modalMobile = inject('modalMobile')
    const form = inject('form')

    onMounted(() => {
        loadUrlReviews()
    })

    // FUNCTION
    function loadUrlReviews () {
        // GOOGLE
        let ota_googe = hotelOtasData.find(item => item.enum_ota == 'google')
        let placeid = hotelData.google_maps_place_id
        urlReviewGoogle.value = placeid ? `https://search.google.com/local/writereview?placeid=${placeid}` : ''

        // TRIPADVISOR
        let ota_tripadvisor = hotelOtasData.find(item => item.enum_ota == 'tripadvisor')
        urlReviewTripadvisor.value = ota_tripadvisor?.url ? `https://www.tripadvisor.es/UserReviewEdit-${matchUrl(ota_tripadvisor?.url)}` : ''

    }
    function goOta (ota) {
        if (!otasSelected.value.includes(ota)){
            otasSelected.value.push(ota)
        }
        form.steps = form.steps.replace(/\[.*?\]/, `[${otasSelected.value.join(',')}]`)
        // submitSurvey()
        
        if (ota == 'google' && urlReviewGoogle.value) {
            window.open(urlReviewGoogle.value, '_blank')
        }
        if (ota == 'tripadvisor' && urlReviewTripadvisor.value) {
            window.open(urlReviewTripadvisor.value, '_blank')
        }
    }
    function nextTab () {
        if (tab.value == 1) {
            form.steps = `click:${form.type}+click:next`
            if (form.type == 'GOOD') {
                form.steps = `${form.steps},click:[ota]`
            }
        }
        if(tab.value == 2) {
            if (['NORMAL', 'WRONG'].includes(form.type)) {
                form.steps = `${form.steps},description:${form.description ? 'true' : 'false'}+click:next`
            }
        }
        if (enableSubmit.value){
            submitSurvey()
        } else {
            tab.value++
        }
        
    }

    function close () {
        modal.value = false
        modalMobile.value = false
    }

    async function submitSurvey () {
        loadingSubmit.value = true
        const response = await staySurveyStore.$store(form)
        if (response.ok) {
            if (!(form.type == 'GOOD' && tab.value == 2)) {
                tab.value++
            }
            form.id = response?.data?.id
        }
        loadingSubmit.value = false
    }

    // AUX
    function matchUrl (url) {
        const regex = /Hotel_Review-(.*?)-Reviews/
        const matches = url.match(regex)
        if (matches && matches[1]) {
        const result = matches[1]
        return result
        } else {
            return ''
        }
    }

</script>