<template>
    <BaseBottomSheet
        :open="isOpenBottomSheetFilter"
        :position="positionBottomSheet"
         @changeCurrentHeight="changePositionHandle"
    >
        <template v-slot:content>
            <div class="pl-4 pr-[7px]">
                <h2 class="text-[20px] font-bold mb-[36px]">{{ $t('place.detail.filters.title') }}</h2>
                <div class="space-y-6">
                    <div class="space-y-4 border-b border-[--Border-secondary] pb-6">
                        <label class="text-base font-bold">
                            {{ $t('place.detail.filters.distanceLogding') }}
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
                            {{ $t('place.detail.recommended') }}
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
                                    @click="selectFilter(item.value, 'points')"
                                />
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-slot:footer>
            <div class="flex justify-between border-t-[2px] border-[#fff] p-4">
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
        </template>
    </BaseBottomSheet>
</template>

<script setup>

    import { ref, inject, reactive,watch } from 'vue';

    import BaseBottomSheet from '@/components/Modal/BaseBottomSheet.vue';
    import BaseButtonChipFilter from '@/components/Buttons/BaseButtonChipFilter.vue';
    import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';

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

    watch(isOpenBottomSheetFilter, (valNew, valOld) => {
        if (!!valNew && !valOld) {
            let { featured, distances, points } = formFilter;
            Object.assign(formFilterSheeBottom, { featured, distances, points });
            // Object.assign(formFilterSheeBottomDefault, { featured, distances, points });
        }
    });

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

    function selectRecommended () {
        formFilterSheeBottom.featured = !formFilterSheeBottom.featured; 
    }

    function resetFormFilter () {
        console.log(formFilterSheeBottomDefault, 'formFilterSheeBottomDefault');
        Object.assign(formFilterSheeBottom, formFilterSheeBottomDefault);
        Object.assign(formFilter, formFilterSheeBottomDefault);
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