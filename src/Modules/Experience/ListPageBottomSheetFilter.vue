<template>
    <BaseBottomSheet
        :open="isOpenBottomSheetFilter"
        :position="positionBottomSheet"
        is-full-front
         @changeCurrentHeight="changePositionHandle"
    >
        <template v-slot:content>
            <div class=" h-full flex flex-col h-full">
                <div class="pl-4 w-full pb-[12px] z-[4000]" :class="{ 'shadow-header': isScrollingHeader }">
                    <h2 class="text-[20px] font-bold">{{ $t('experience.list-page.section-filter.label-search') }}</h2>
                </div>
                <div
                    id="content-filter"
                     @scroll="handleScroll"
                     ref="contentFilter"
                    class="pl-4 pr-[7px]  overflow-y-scroll flex-1 pt-[24px]"
                >
                    <div class="space-y-6">
                        <div class="space-y-4 border-b border-[--Border-secondary] pb-6">
                            <label class="text-base font-bold">
                                {{ $t('experience.list-page.section-filter.cancellation-policy.title') }}
                            </label>
                            <div class="flex flex-wrap gap-2 leading-110">
                                <BaseButtonChipFilter
                                    :active="formFilterSheeBottom.free_cancelation"
                                    :name="$t('experience.list-page.section-filter.cancellation-policy.free-cancellation')"
                                    @click="formFilterSheeBottom.free_cancelation = !formFilterSheeBottom.free_cancelation"
                                />
                            </div>
                        </div>
                         <div class="space-y-4 border-b border-[--Border-secondary] pb-6">
                            <label class="text-base font-bold">
                                {{ $t('experience.list-page.section-filter.duration.title') }}
                            </label>
                            <div class="flex flex-wrap gap-2 leading-110">
                                <template  v-for="item in filterButtons.duration">
                                    <BaseButtonChipFilter
                                        :active="formFilterSheeBottom.duration.includes(item.value)"
                                        icon="WA.CLOCK"
                                        :name="$t(item.name)"
                                        @click="selectFilter(item.value, 'duration')"
                                    />
                                </template>
                            </div>
                        </div>
                         <div class="space-y-4 border-b border-[--Border-secondary] pb-6">
                            <label class="text-base font-bold">
                                {{ $t('experience.list-page.section-filter.score.title') }}
                            </label>
                            <div class="flex flex-wrap gap-2 leading-110">
                                <template  v-for="item in filterButtons.score">
                                    <BaseButtonChipFilter
                                        :active="formFilterSheeBottom.score.includes(item.value)"
                                        icon="WA.STAR.BLACK"
                                        :name="`${item.star} ${$t(item.name)}`"
                                        @click="selectFilter(item.value, 'score')"
                                    />
                                </template>
                            </div>
                        </div>
                         <div class="space-y-4 border-b border-[--Border-secondary] pb-6">
                            <label class="text-base font-bold">
                                {{ $t('experience.list-page.section-filter.price.title') }}
                            </label>
                            <div class="flex flex-wrap gap-2 leading-110">
                                <template  v-for="item in filterButtons.price">
                                    <BaseButtonChipFilter
                                        :active="formFilterSheeBottom.price == item.value"
                                        :name="$t(item.name)"
                                        @click="selectPrice(item.value)"
                                    />
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    id="footer-filter"
                    :class="{ 'shadow-footer': isScrollingFooter }"
                    class="flex justify-between border-t-[2px] border-[#fff] p-4 z-[6000]"
                >
                    <button
                        class="underline hbtn-tertiary text-sm font-bold px-4 py-[10px]"
                        @click="resetFormFilter"
                    >
                        {{ $t('place.detail.filters.remove') }}
                    </button>
                    <PrimaryButton
                        classes="text-sm font-bold px-4 py-[10px] rounded-[10px]"
                        @click="applyFilter"
                    >
                        {{ $t('place.detail.filters.apply') }}
                    </PrimaryButton>
                </div>
            </div>
        </template>
    </BaseBottomSheet>
</template>

<script setup>

    import { ref, inject, reactive, watch, onMounted } from 'vue';

    import BaseBottomSheet from '@/components/Modal/BaseBottomSheet.vue';
    import BaseButtonChipFilter from '@/components/Buttons/BaseButtonChipFilter.vue';
    import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';

    const emits = defineEmits(['reloadPlaces']);

    const positionBottomSheet = ref('min-top');

    const isOpenBottomSheetFilter = inject('isOpenBottomSheetFilter');
    const formFilter = inject('formFilter');
    
    // DATA
    const filterButtons = {
        duration: [
            {
                name: 'experience.list-page.section-filter.duration.one-hour',
                value: '1',
            },
            {
                name: 'experience.list-page.section-filter.duration.one-hour',
                value: '2',
            },
            {
                name: 'experience.list-page.section-filter.duration.noon',
                value: '3',
            },
            {
                name: 'experience.list-page.section-filter.duration.whole-day',
                value: '4',
            },
        ],
        score: [
            {
                star: '5',
                name: 'place.detail.filters.stars',
                value: '3',
            },
            {
                star: '+4',
                name: 'place.detail.filters.stars',
                value: '2',
            },
            {
                star: '3+',
                name: 'place.detail.filters.stars',
                value: '1',
            },
        ],
        price: [
            {
                name: 'experience.list-page.section-filter.price.0-100',
                value: '0,100',
            },
            {
                name: 'experience.list-page.section-filter.price.100-250',
                value: '100,250',
            },
            {
                name: 'experience.list-page.section-filter.price.250-500',
                value: '250,500',
            },
            {
                name: 'experience.list-page.section-filter.price.250-500',
                value: '500,',
            },
        ]
    }

    const dataFilter = {
        duration: [],
        score: [],
        price: null,
        price_min: null,
        price_max: null,
        free_cancelation: false,
    }
    const formFilterSheeBottom = reactive(JSON.parse(JSON.stringify(dataFilter)));
    const formFilterSheeBottomDefault = reactive(JSON.parse(JSON.stringify(dataFilter)));

    const isScrollingFooter = ref(false);
    const isScrollingHeader = ref(false);

    watch(isOpenBottomSheetFilter, (valNew, valOld) => {
        if (!!valNew && !valOld) {
            let { free_cancelation, price_max, price_min, score, duration } = formFilter;
            Object.assign(formFilterSheeBottom, { free_cancelation, price_max, price_min, score, duration });
        }
    });

    onMounted(() => {
        const contentFilter = document.querySelector('#content-filter');
        if (contentFilter) {
            contentFilter.addEventListener('scroll', handleScroll);
        }
    });

    function handleScroll() {
        const contentFilter = document.querySelector('#content-filter');
        if (contentFilter) {
            const maxScroll = contentFilter.scrollHeight - contentFilter.clientHeight;
            isScrollingFooter.value = contentFilter.scrollTop < maxScroll;
            isScrollingHeader.value = contentFilter.scrollTop != 0;
        }
    }

    function closeModalFilter () {
        isOpenBottomSheetFilter.value = false;
    }

    function selectFilter (value, property) {
        let v = formFilterSheeBottom?.[property];
        let a = v?.includes(value);
        if (a) {
            let i = v?.[property]?.indexOf(value);
            if (i !== -1) {
                v.splice(i, 1);
            }
        } else {
            v.push(value);
        }
    }

    function selectPrice (value) {
        let prices = value.split(',');
        formFilterSheeBottom.price = value;
        let price_min = prices?.[0];
        let price_max = prices?.[1];
        formFilterSheeBottom.price_min = price_min ? Number(price_min) : null;
        formFilterSheeBottom.price_max = price_max ? Number(price_max) : null;
    }
 
    function selectRecommended () {
        formFilterSheeBottom.featured = !formFilterSheeBottom.featured; 
    }

    function resetFormFilter () {
        Object.assign(formFilterSheeBottom, JSON.parse(JSON.stringify(formFilterSheeBottomDefault)));
        Object.assign(formFilter, JSON.parse(JSON.stringify(formFilterSheeBottomDefault)));
        emits('reloadPlaces');
        closeModalFilter();
    }

    function applyFilter () {
        Object.assign(formFilter, formFilterSheeBottom);
        emits('reloadPlaces');
        closeModalFilter();
    }

    function changePositionHandle ($event) {
        closeModalFilter();
    }

</script>   

<style lang="scss" scoped>
    .footer-filter {
    transition: box-shadow 0.3s ease;
    }
    .shadow-header{
       box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    }
    .shadow-footer{
       box-shadow: 0px -4px 8px 0px rgba(0, 0, 0, 0.25);
    }    
</style>