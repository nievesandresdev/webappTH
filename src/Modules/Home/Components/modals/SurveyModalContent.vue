<template>
    <div class="flex flex-column justify-between h-full">
        <div :class="{'mb-8': tab == 1 || (tab == 2 && form.type != 'GOOD')}">
            <div
                class="mb-6 flex"
                :class="{'md:hidden': tab == 3}"
            >
                <button class="" @click="close()">
                    <img 
                        src="/vendor_asset/img/hoster/icons/1.TH.CLOSE.svg" alt="icon_close" 
                        class="w-6 h-6"
                    >
                </button>
            </div>
            <div
                v-if="tab == 1"
                id="tab-1"
            >
                <h2 class="text-lg font-semibold mb-4">¿Cómo ha sido tu experiencia con nosotros?</h2>
                <p class="mb-8">Nos encantaría conocer tu opinión, es muy importante para nosotros.</p>
                <SurveyModalContentTabEmojis />
            </div>
            <div
                v-if="tab == 2"
                id="tab-2"
            >
                <!-- v-if="form.type == 'GOOD'" -->
                <div v-if="form.type == 'GOOD'" class="w-full">
                    <div class="flex justify-center mb-8">
                        <img
                            :src="`/vendor_asset/img/hoster/icons/1.TH.EMOJI.GOOD.ACTIVE.DEFAULT.svg`"
                            alt="1.TH.EMOJI.GOOD"
                        />
                    </div>
                    <div :class="{'mb-8': url_review_google || url_review_tripadvisor}">
                        <h2 class="text-lg font-semibold mb-4">¡Nos alegra que hayas disfrutado en {{ hoster.name }}!</h2>
                        <p v-if="url_review_google || url_review_tripadvisor" class="">Si te ha gustado tu estancia con nosotros, nos encantaría que compartieras tu experiencia positiva. Tu opinión ayuda a otros viajeros a conocernos mejor.</p>
                    </div>
                    <div v-if="url_review_google || url_review_tripadvisor" class="mb-8 flex flex-column space-y-4">
                        <button
                            v-if="url_review_google"
                            class="py-2 px-3 text-sm relative w-full rounded-[6px] border-1 border-black"
                            @click="goOta('google')"
                        >
                            <span class="absolute top-1.5 left-3">
                                <img
                                    :src="`/vendor_asset/img/hoster/icons/1.TH.GOOGLE.svg`"
                                    alt="1.TH.GOOGLE"
                                />
                            </span>
                            Continuar con Google
                        </button>
                        <button
                            v-if="url_review_tripadvisor"
                            class="py-2 px-3 text-sm relative rounded-[6px] border-1 border-black w-full"
                            @click="goOta('tripadvisor')"
                        >
                            <span class="absolute top-1.5 left-3">
                                <img
                                    :src="`/vendor_asset/img/hoster/icons/1.TH.TRIPADVISOR.svg`"
                                    alt="1.TH.GOOGLE"
                                />
                            </span>
                            Continuar con Tripadvisor
                        </button>
                    </div>
                    <div :class="url_review_google || url_review_tripadvisor ? 'mb-2': 'mb-4'">
                        <p class="text-sm">Si hiciste tu reserva a tráves de una <strong>agencia online</strong>, prodrían pedirte que <strong>des tu opinión</strong> en los próximos días. Nos encantaría. si pudieras tomarte un momento para <strong>proporcionarla.</strong></p>
                        <p
                            class="text-sm mt-2"
                            :class="{'hidden': url_review_google || url_review_tripadvisor}"
                        >Tu opinión ayuda a otros viajeros a conocernos mejor</p>
                    </div>
                    <p class="text-center text-sm"><strong>¡Gracias por elegirnos!</strong></p>
                </div>
                <div v-if="form.type == 'NORMAL'" class="w-full">
                    <div class="flex justify-center mb-8">
                        <img
                            :src="`/vendor_asset/img/hoster/icons/1.TH.EMOJI.NORMAL.ACTIVE.DEFAULT.svg`"
                            alt="1.TH.EMOJI.GOOD"
                        />
                    </div>
                    <h2 class="text-lg font-semibold mb-4">Lamentamos que no haya sido perfecto.</h2>
                    <p class="mb-2">Nos encantaria conocer tu opinión, es muy importante para nosotros.</p>
                    <textarea
                        v-model="form.description"
                        class="text-sm w-full box-input-field flex h-full items-center hoverForm h-[6.75rem] rounded-6"
                        :placeholder="`Escriba tu feedback para el ${ hoster.name }`"
                        maxlength="300"
                        :class="{
                            'hborder-gray-400 htext-gray-500' : !form.description,
                            'hborder-black-100': form.description,
                        }"
                    />
                    <p class="mt-2 text-xs text-right">{{ length_description }}/300</p>
                </div>
                <div v-if="form.type == 'WRONG'" class="w-full">
                    <div class="flex justify-center mb-8">
                        <img
                            :src="`/vendor_asset/img/hoster/icons/1.TH.EMOJI.WRONG.ACTIVE.DEFAULT.svg`"
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
                    <p class="mt-2 text-xs text-right">{{ length_description }}/300</p>
                </div>
            </div>
            <div
                v-if="tab == 3"
                id="tab-3"
            >
                
                <div class="flex justify-center mb-4">
                    <img
                        :src="`/vendor_asset/img/hoster/icons/1.TH.CHECK.OUTLINED.svg`"
                        alt="1.TH.CHECK.OUTLINED"
                    />
                </div>
                <h2 class="text-lg font-semibold mb-4 text-center">¡Gracias por compartir tu experiencia!</h2>
                <p class="text-center">Valoramos mucho tu opinión y trabajaremos para ofrecerte la mejor estancia posible en el futuro.</p>
            </div>
        </div>
        <div v-if="tab == 1 || (tab == 2 && form.type != 'GOOD')" class="text-right">
            <button
                class="w-full md:w-auto px-4 py-3 text-center hbtn-cta"
                :disabled="!form.type"
                @click="nextTab()"
            >
                {{ tab == 1 ? 'Siguiente' : 'Enviar' }}
            </button>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, reactive, inject, provide, onMounted } from "vue"

    import SurveyModalContentTabEmojis from './SurveyModalContentTabEmojis.vue'

    //DATA
    const tab = ref(1)
    const loading_submit = ref(false)
    const otas_selected = ref([])
    const url_review_google = ref('')
    const url_review_tripadvisor = ref('')

    //COMPUTED
    const length_description = computed(() => {
        return form.description.length
    })
    const enable_submit = computed(() => {
        let option_1 = tab.value == 1 && form.type == 'GOOD'
        let option_2 = tab.value == 2 && ['NORMAL', 'WRONG'].includes(form.type)
        return option_1 || option_2
    })

    //PROVIDE

    // INJECT
    const modal_survey = inject('modal_survey')
    const summary_reviews = inject('summary_reviews')
    const hotel = inject('hotel')
    const hoster = inject('hoster')
    const form = inject('form')
    const toast = inject('toast')

    onMounted(() => {
        loadUrlReviews()
    })

    // FUNCTION
    function loadUrlReviews () {
        // GOOGLE
        let ota_googe = summary_reviews.value.find(item => item.enum_ota == 'google')
        let placeid = hoster.value.google_maps_place_id
        url_review_google.value = placeid ? `https://search.google.com/local/writereview?placeid=${placeid}` : ''

        // TRIPADVISOR
        let ota_tripadvisor = summary_reviews.value.find(item => item.enum_ota == 'tripadvisor')
        url_review_tripadvisor.value = ota_tripadvisor?.url ? `https://www.tripadvisor.es/UserReviewEdit-${match_url(ota_tripadvisor?.url)}` : ''

    }
    function goOta (ota) {
        if (!otas_selected.value.includes(ota)){
            otas_selected.value.push(ota)
        }
        form.steps = form.steps.replace(/\[.*?\]/, `[${otas_selected.value.join(',')}]`)
        // submitSurvey()
        
        if (ota == 'google' && url_review_google.value) {
            window.open(url_review_google.value, '_blank')
        }
        if (ota == 'tripadvisor' && url_review_tripadvisor.value) {
            window.open(url_review_tripadvisor.value, '_blank')
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
        if (enable_submit.value){
            submitSurvey()
        } else {
            tab.value++
        }
        
    }

    function close () {
        modal_survey.value = false
        $('#modal-survey').modal('hide')
    }

    function submitSurvey () {

        loading_submit.value = true
        axios({
            url: route('survey.store', form),
            method: 'POST',
        })
        .then((res) => {
            // toast.success('Encuesta con existo',{ position: "top-right"})
            if (!(form.type == 'GOOD' && tab.value == 2)) {
                tab.value++
            }
            form.id = res?.data?.id
        }).finally(()=>{
            loading_submit.value = false
        })
    }

    // AUX
    function match_url (url) {
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