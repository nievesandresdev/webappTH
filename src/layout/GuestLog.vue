<template>
    <Dialog :open="false" class="relative">
      <!-- The backdrop, rendered as a fixed sibling to the panel container -->
      <div class="fixed top-0 left-0 h-screen w-full bg-[#00000080] z-[1000]" aria-hidden="true" />
  
      <!-- Full-screen container to center the panel -->
      <div class="fixed left-0 lg:top-0 bottom-0 lg:right-0 flex w-screen items-center justify-center z-[1200] ">
        <!-- The actual dialog panel -->
        <DialogPanel class="w-full lg:max-w-[360px] bg-white rounded-t-[0.85rem] lg:rounded-b-[0.85rem]">
            <div class="relative">
                <h1 class="text-lg font-medium text-center leading-6 pt-4">
                    {{ $utils.capitalize($t('stay.guest-log.title')) }}
                </h1>
                <div class="absolute top-3 right-4">
                    <MiniLangDropdown />
                </div>
            </div>

            <div class="">
                <div class="mt-4 px-4">
                    <THInputText
                        :textLabel="$t('stay.guest-log.name.label')"
                        :placeholder="$t('stay.guest-log.name.placeholder')"
                        v-model="form.name"
                        :customClasses="{
                            'hborder-gray-400':!form.name,
                            'hborder-alert-negative':errorsKey.includes('name'),
                        }"
                    />
                </div>
                <div class="mt-4 px-4" v-if="!subject || subject == 'updated'">
                    <THInputText
                        :textLabel="$t('stay.guest-log.email.label')"
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
            
            <div class="mt-6 text-right p-4 border-t">
                <button 
                    class="hbtn-cta py-3 px-4 text-sm leading-4"
                    :class="{'cta-disabled':!valid || form.processing}"
                    :disabled="!valid || form.processing"
                >
                    {{ $utils.capitalize($t('stay.guest-log.button')) }}
                </button>
            </div>
        </DialogPanel>
      </div>
    </Dialog>
  </template>
  
  <script setup>
    import { onMounted, reactive, ref } from 'vue';
    import THInputText from '@/components/THInputText.vue';
    import MiniLangDropdown from '@/layout/Components/MiniLangDropdown.vue';
    import { Dialog } from '@headlessui/vue'

    onMounted(()=>{
        //
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

