<template>
  <div class="flex justify-center mx-[-4px] sp:mx-[-8px] md:mx-[-16px]">
    <div class="text-center px-1 sp:px-2 md:px-4">
      <button 
        class="flex w-8 h-8 mx-auto sp:w-12 sp:h-12 lg:w-16 lg:h-16"
        @click="selectEmoji('VERYWRONG')"
      >
        <img
          class="mx-auto mt-auto"
          :class="form.type && form.type !== 'VERYWRONG' ? 'sp:w-8 sp:h-8 lg:w-14 lg:h-14' : 'w-full h-full'"
          :src="`/assets/icons/emojis/1.TH.EMOJI.${state_emojis?.VERYWRONG?.face}.${state_emojis?.VERYWRONG?.mode}.svg`"
          alt="1.TH.EMOJI.VERYWRONG"
        />
      </button>
      <p
        class="text-[6px] sp:text-[10px] md:text-xs font-semibold mt-2 leading-[90%]"
        :class="form.type && form.type == 'VERYWRONG' ? 'htext-black-100' : 'htext-gray-500'"
      >{{ $t(btnVeryWrongText) }}</p>
    </div>
    <div class="text-center px-1 sp:px-2 md:px-4">
      <button 
        class="flex w-8 h-8 mx-auto sp:w-12 sp:h-12 lg:w-16 lg:h-16"
        @click="selectEmoji('WRONG')"
      >
        <img
          class="mx-auto mt-auto"
          :class="form.type && form.type !== 'WRONG' ? 'sp:w-8 sp:h-8 lg:w-14 lg:h-14' : 'w-full h-full'"
          :src="`/assets/icons/emojis/1.TH.EMOJI.${state_emojis?.WRONG?.face}.${state_emojis?.WRONG?.mode}.svg`"
          alt="1.TH.EMOJI.WRONG"
        />
      </button>
      <p
        class="text-[6px] sp:text-[10px] md:text-xs font-semibold mt-2 leading-[90%]"
        :class="form.type && form.type == 'WRONG' ? 'htext-black-100' : 'htext-gray-500'"
      >{{ $t(btnWrongText) }}</p>
    </div>
    <div class="text-center px-1 sp:px-2 md:px-4">
      <button 
        class="flex w-8 h-8 mx-auto sp:w-12 sp:h-12 lg:w-16 lg:h-16"
        @click="selectEmoji('NORMAL')"
      >
        <img
          class="mx-auto mt-auto"
          :class="form.type && form.type !== 'NORMAL' ? 'sp:w-8 sp:h-8 lg:w-14 lg:h-14' : 'w-full h-full'"
          :src="`/assets/icons/emojis/1.TH.EMOJI.${state_emojis?.NORMAL?.face}.${state_emojis?.NORMAL?.mode}.svg`"
          alt="1.TH.EMOJI.NORMAL"
        />
      </button>
      <p
        class="text-[6px] sp:text-[10px] md:text-xs font-semibold mt-2 leading-[90%]"
        :class="form.type && form.type == 'NORMAL' ? 'htext-black-100' : 'htext-gray-500'"
      >{{ $t(btnNormalText) }}</p>
    </div>
    <div class="text-center px-1 sp:px-2 md:px-4">
      <button 
        class="flex w-8 h-8 mx-auto sp:w-12 sp:h-12 lg:w-16 lg:h-16"
        @click="selectEmoji('GOOD')"
      >
        <img
          class="mx-auto mt-auto"
          :class="form.type && form.type !== 'GOOD' ? 'sp:w-8 sp:h-8 lg:w-14 lg:h-14' : 'w-full h-full'"
          :src="`/assets/icons/emojis/1.TH.EMOJI.${state_emojis?.GOOD?.face}.${state_emojis?.GOOD?.mode}.svg`"
          alt="1.TH.EMOJI.GOOD"
        />
      </button>
      <p
        class="text-[6px] sp:text-[10px] md:text-xs font-semibold mt-2 leading-[90%]"
        :class="form.type && form.type == 'GOOD' ? 'htext-black-100' : 'htext-gray-500'"
      >{{ $t(btnGoodText) }}</p>
    </div>
    <div class="text-center px-1 sp:px-2 md:px-4">
      <button 
        class="flex w-8 h-8 mx-auto sp:w-12 sp:h-12 lg:w-16 lg:h-16"
        @click="selectEmoji('VERYGOOD')"
      >
        <img
          class="mx-auto mt-auto"
          :class="form.type && form.type !== 'VERYGOOD' ? 'sp:w-8 sp:h-8 lg:w-14 lg:h-14' : 'w-full h-full'"
          :src="`/assets/icons/emojis/1.TH.EMOJI.${state_emojis?.VERYGOOD?.face}.${state_emojis?.VERYGOOD?.mode}.svg`"
          alt="1.TH.EMOJI.VERYGOOD"
        />
      </button>
      <p
        class="text-[6px] sp:text-[10px] md:text-xs font-semibold mt-2 leading-[90%]"
        :class="form.type && form.type == 'VERYGOOD' ? 'htext-black-100' : 'htext-gray-500'"
      >{{ $t(btnVeryGoodText) }}</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, inject, onMounted, ref, watch } from "vue";

const props = defineProps({
  userFor:{
    type:String,
    default:null
  }
})

const windowWidth = ref(window.innerWidth);
const btnVeryWrongText = ref('home.form-survey.btn-wrong');
const btnWrongText = ref('home.form-survey.btn-wrong');
const btnNormalText = ref('home.form-survey.btn-normal');
const btnGoodText = ref('home.form-survey.btn-good');
const btnVeryGoodText = ref('home.form-survey.btn-good');


onMounted(()=>{
  translateTextButtons()
})


// DATA STATIC
// const STATUS_EMOJIS = {
//   ACTIVE: "DISABLED",
//   DISABLED: "ACTIVE",
//   HOVER: "DEFAULT",
//   DEFAULT: "HOVER"
// };

// DATA

const state_emojis = reactive({
  VERYGOOD: {
    face: "VERYGOOD",
    mode: "ACTIVE",
    // state: "DEFAULT"
  },
  GOOD: {
    face: "GOOD",
    mode: "ACTIVE",
    // state: "DEFAULT"
  },
  NORMAL: {
    face: "NORMAL",
    mode: "ACTIVE",
  },
  WRONG: {
    face: "WRONG",
    mode: "ACTIVE",
  },
  VERYWRONG: {
    face: "VERYWRONG",
    mode: "ACTIVE",
  }
});

//INJECT
const form = inject('form')

//COMPUTED

//FUNCTION
function translateTextButtons(){
  if(props.userFor == "queries-stay"){
    btnVeryWrongText.value = 'query.form.btn-verywrong-stay';
    btnWrongText.value = 'query.form.btn-wrong-stay';
    btnNormalText.value = 'query.form.btn-normal-stay';
    btnGoodText.value = 'query.form.btn-good-stay';
    btnVeryGoodText.value = 'query.form.btn-verygood-stay';
  }
  if(props.userFor == "queries-poststay"){
    btnVeryWrongText.value = 'query.form.btn-verywrong-poststay';
    btnWrongText.value = 'query.form.btn-wrong-poststay';
    btnNormalText.value = 'query.form.btn-normal-poststay';
    btnGoodText.value = 'query.form.btn-good-poststay';
    btnVeryGoodText.value = 'query.form.btn-verygood-poststay';
  }
}

// function hoverEmoji(payload) {
//   if(windowWidth.value > 1020){
//     let { face, state } = payload;
//     state_emojis[face].state = STATUS_EMOJIS[state_emojis[face].state];
//   }
// }

function selectEmoji(face) {
  if(!face) return;
  const EMOJIS = Object.keys(state_emojis);
  state_emojis[face].mode = "ACTIVE";
  form.type = face;
  EMOJIS.forEach(item => {
    if (face != item) {
      state_emojis[item].mode = "INACTIVE";
    }
  });
  
}

watch(form, (newType) => {
  // console.log('newType',newType.type)      
  selectEmoji(newType.type)
}, { deep: true, immediate: true });
</script>