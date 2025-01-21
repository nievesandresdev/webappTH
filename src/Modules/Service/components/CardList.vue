<template>
    <div
        class="card-list flex w-full" :class="class"
    >
        <div class="w-[55px] sp:w-[111px] rounded-[10px] relative overflow-hidden">
            <img
                class="object-cover w-full h-full"
                :src="'https://thehosterappbucket.s3.eu-south-2.amazonaws.com/test/storage/places/65a56b3a03e4918b95a2e55f57fe1387623b348e10a48d0a84726ab0448ffed0.jpg'"
                alt="img_act"
                loading="lazy"
            >
        </div>

        
        <div class="p-[4px] sp:p-[8px] flex flex-col flex-1 truncate-2 space-y-[8px] sp:space-y-[16px]">
            <p class="text-[6px] sp:text-[14px] font-bold lato leading-none" v-html="'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla laborum sint, impedit'" />
            <p class="text-[6px] sp:text-[14px] lato leading-none truncate-2" v-html="'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla laborum sint, impedit'" />
            <div
                class="flex items-center justify-end pb-[4px] sp:pb-[8px]"
            >
                <div class="text-right">
                    <p class="text-[5px] sp:text-[10px] font-medium lato leading-non">{{ $t('experience.card-experience.from') }}</p>
                    <p class="text-[9px] sp:text-[16px] font-medium lato leading-non">222 €</p>
                </div>
            </div>
        </div>
    </div>
</template>\

<style lang="scss">
    .card-list {
        border-radius: 10px;
        border: 1px solid #FFF;
        background: linear-gradient(214deg, #F3F3F3 19.98%, #FAFAFA 80.15%);
        box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.12), 0px 3px 1px 0px rgba(0, 0, 0, 0.04);
    }
</style>