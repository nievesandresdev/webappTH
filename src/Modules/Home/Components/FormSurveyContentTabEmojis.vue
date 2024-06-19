<template>
  <div class="flex justify-center">
    <div class="text-center px-1 sp:px-2 md:px-4">
      <button 
        class="flex w-8 h-8 mx-auto sp:w-12 sp:h-12 lg:w-16 lg:h-16"
        @click="selectEmoji('WRONG')"
      >
        <img
          class="mx-auto mt-auto"
          :class="form.type && form.type !== 'WRONG' ? 'sp:w-8 sp:h-8 lg:w-14 lg:h-14' : 'w-full h-full'"
          @mouseover="hoverEmoji({face: 'WRONG', state: 'HOVER'})"
          @mouseleave="hoverEmoji({face: 'WRONG', state: 'DEFAULT'})"
          :src="`/assets/icons/1.TH.EMOJI.${state_emojis?.WRONG?.face}.${state_emojis?.WRONG?.mode}.${state_emojis?.WRONG?.state}.NEW.svg`"
          alt="1.TH.EMOJI.WRONG"
        />
      </button>
      <p
        class="text-[6px] sp:text-[10px] md:text-xs font-semibold mt-2"
        :class="form.type && form.type == 'WRONG' ? 'text-black' : 'htext-gray-500'"
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
          @mouseover="hoverEmoji({face: 'NORMAL', state: 'HOVER'})"
          @mouseleave="hoverEmoji({face: 'NORMAL', state: 'DEFAULT'})"
          :src="`/assets/icons/1.TH.EMOJI.${state_emojis?.NORMAL?.face}.${state_emojis?.NORMAL?.mode}.${state_emojis?.NORMAL?.state}.NEW.svg`"
          alt="1.TH.EMOJI.NORMAL"
        />
      </button>
      <p
        class="text-[6px] sp:text-[10px] md:text-xs font-semibold mt-2"
        :class="form.type && form.type == 'NORMAL' ? 'text-black' : 'htext-gray-500'"
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
          @mouseover="hoverEmoji({face: 'GOOD', state: 'HOVER'})"
          @mouseleave="hoverEmoji({face: 'GOOD', state: 'DEFAULT'})"
          :src="`/assets/icons/1.TH.EMOJI.${state_emojis?.GOOD?.face}.${state_emojis?.GOOD?.mode}.${state_emojis?.GOOD?.state}.NEW.svg`"
          alt="1.TH.EMOJI.GOOD"
        />
      </button>
      <p
        class="text-[6px] sp:text-[10px] md:text-xs font-semibold mt-2"
        :class="form.type && form.type == 'GOOD' ? 'text-black' : 'htext-gray-500'"
      >{{ $t(btnGoodText) }}</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, inject, onMounted, ref } from "vue";

const props = defineProps({
  userFor:{
    type:String,
    default:null
  }
})

const windowWidth = ref(window.innerWidth);
const btnWrongText = ref('home.form-survey.btn-wrong');
const btnNormalText = ref('home.form-survey.btn-normal');
const btnGoodText = ref('home.form-survey.btn-good');

onMounted(()=>{
  translateTextButtons()
})


// DATA STATIC
const STATUS_EMOJIS = {
  ACTIVE: "DISABLED",
  DISABLED: "ACTIVE",
  HOVER: "DEFAULT",
  DEFAULT: "HOVER"
};

// DATA

const state_emojis = reactive({
  GOOD: {
    face: "GOOD",
    mode: "ACTIVE",
    state: "DEFAULT"
  },
  NORMAL: {
    face: "NORMAL",
    mode: "ACTIVE",
    state: "DEFAULT"
  },
  WRONG: {
    face: "WRONG",
    mode: "ACTIVE",
    state: "DEFAULT"
  }
});

//INJECT
const form = inject('form')

//COMPUTED

//FUNCTION
function translateTextButtons(){
  if(props.userFor == "queries-stay"){
    btnWrongText.value = 'query.form.btn-wrong-stay';
    btnNormalText.value = 'query.form.btn-normal-stay';
    btnGoodText.value = 'query.form.btn-good-stay';
  }
  if(props.userFor == "queries-poststay"){
    btnWrongText.value = 'query.form.btn-wrong-poststay';
    btnNormalText.value = 'query.form.btn-normal-poststay';
    btnGoodText.value = 'query.form.btn-good-poststay';
  }
}
function hoverEmoji(payload) {
  if(windowWidth.value > 1020){
    let { face, state } = payload;
    state_emojis[face].state = STATUS_EMOJIS[state_emojis[face].state];
  }
}

function selectEmoji(face) {
  const EMOJIS = Object.keys(state_emojis);
  state_emojis[face].mode = "ACTIVE";
  form.type = face;
  EMOJIS.forEach(item => {
    if (face != item) {
      state_emojis[item].mode = "DISABLED";
    }
  });
  
}
</script>