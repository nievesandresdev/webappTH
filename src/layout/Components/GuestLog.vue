<template>

    <dialog id="guestLog" class="modal">
        <div class="modal-box bg-white lg:w-[360px] rounded-[0.875rem]">
            <div class="relative">
                <h1 class="text-lg font-medium text-center leading-6 pt-4">
                    {{ $utils.capitalize($t('stay.guest-log.title')) }}
                </h1>
                <div class="absolute top-5 right-4">
                    
                </div>
            </div>

            <!-- body -->
            <div class="body-xs">
                <div class="mt-4 px-4">
                    <label class="text-sm font-medium mb-2">{{ $utils.capitalize($t('stay.guest-log.name.label')) }}</label>
                    <THInputText
                        :placeholder="$t('stay.guest-log.name.placeholder')"
                        v-model="form.name"
                        :customClasses="{
                            'hborder-gray-400':!form.name,
                            'hborder-alert-negative':errorsKey.includes('name'),
                        }"
                    />
                </div>
                <div class="mt-4 px-4" v-if="!subject || subject == 'updated'">
                    <label class="text-sm font-medium mb-2">{{ $utils.capitalize($t('stay.guest-log.email.label')) }}</label>
                    <THInputText
                        :placeholder="$t('stay.guest-log.email.placeholder')"
                        :type="'email'"
                        v-model="form.email"
                        @handleError="emailError = $event"
                        :customClasses="{
                            'hborder-gray-400':!form.email
                        }"
                        :textError="$t('stay.guest-log.email.error')"
                    />
                </div>
            </div>
            <!-- end body -->
        </div>
    </dialog>
</template>
<script setup>
    import { onMounted, reactive, ref } from 'vue';
    import THInputText from './THInputText.vue';
    // import DropdownGuestLang from './DropdownGuestLang.vue';
    onMounted(()=>{
        document.getElementById('guestLog').showModal()  
    })

    //data
    const form = reactive({
    name: null,
    email: null,
    language: null,
    });
    const errorsKey = ref([]);
    const emailError = ref(false);
    const subject = ref(null);

</script>

