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
                    <h2 class="text-[20px] font-bold">{{ $t('place.detail.filters.title') }}</h2>
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
                                {{ $t('place.detail.filters.distanceLogding') }} {{$formatTypeLodging()}}
                            </label>
                            <div class="flex flex-wrap gap-2 leading-110">
                                <template  v-for="item in filterButtons.distance">
                                    <BaseButtonChipFilter
                                        :active="formFilterSheeBottom.distances.includes(item.value)"
                                        icon="WA.pointer"
                                        :name="$t(item.name)"
                                        @click="selectFilter(item.value, 'distances')"
                                    />
                                </template>
                            </div>
                        </div>
                        <div class="space-y-4 border-b border-[--Border-secondary] pb-6">
                            <label class="text-base font-bold">
                                {{ $t('place.detail.recommendedTitle',{ lodging: $formatTypeLodging()}) }}
                            </label>
                            <BaseButtonChipFilter
                                :active="formFilterSheeBottom.featured"
                                :name="$t('place.detail.recommended')"
                                @click="selectRecommended()"
                            />
                        </div>
                        <div class="space-y-4 border-b border-[--Border-secondary] pb-6">
                            <label class="text-base font-bold">
                                {{ $t('place.detail.filters.ratings') }}
                            </label>
                            <div class="flex flex-wrap gap-2 leading-110">
                                <template  v-for="item in filterButtons.score">
                                    <BaseButtonChipFilter
                                        :active="formFilterSheeBottom.points.includes(item.value)"
                                        icon="WA.STAR.BLACK"
                                        :name="`${item.star} ${$t(item.name)}`"
                                        @change="selectFilter(item.value, 'points')"
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

    import { useHotelStore } from '@/stores/modules/hotel';
    const hotelStore = useHotelStore();

    const emits = defineEmits(['reloadPlaces']);

    const positionBottomSheet = ref('min-top');

    const isOpenBottomSheetFilter = inject('isOpenBottomSheetFilter');
    const isOpenBottomSheetList = inject('isOpenBottomSheetList');
    const formFilter = inject('formFilter');
    
    // DATA
    const filterButtons = {
        distance: [
            {
                name: 'place.detail.filters.distante.oneKm',
                value: '1',
            },
            {
                name: 'place.detail.filters.distante.threeKm',
                value: '2',
            },
            {
                name: 'place.detail.filters.distante.fiveKm',
                value: '3',
            },
            {
                name: 'place.detail.filters.distante.tenKm',
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
        ]
    }

    const dataFilter = {
        points: [],
        distances: [],
        featured: false,
    }
    const formFilterSheeBottom = reactive(JSON.parse(JSON.stringify(dataFilter)));
    const formFilterSheeBottomDefault = reactive(JSON.parse(JSON.stringify(dataFilter)));

    const isScrollingFooter = ref(false);
    const isScrollingHeader = ref(false);

    watch(isOpenBottomSheetFilter, (valNew, valOld) => {
        if (!!valNew && !valOld) {
            let { featured, distances, points } = formFilter;
            Object.assign(formFilterSheeBottom, { featured, distances, points });
            // Object.assign(formFilterSheeBottomDefault, { featured, distances, points });
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
            let i = v?.indexOf(value); 
            if (i !== -1) {
                v.splice(i, 1);
            }
        } else {
            v.push(value);
        }
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
        setTimeout(() => {
            isOpenBottomSheetList.value = true;
        }, 400);
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