<template>
  <div class="flex justify-center gap-2 sp:gap-4">
    <div class="text-center">
      <button class="w-8 sp:w-[48px] h-8 sp:h-[48px] flex justify-center items-center" @click="selectEmoji('WRONG')">
        <img
          @mouseover="hoverEmoji({face: 'WRONG', state: 'HOVER'})"
          @mouseleave="hoverEmoji({face: 'WRONG', state: 'DEFAULT'})"
          :src="`/assets/icons/1.TH.EMOJI.${state_emojis?.WRONG?.face}.${state_emojis?.WRONG?.mode}.${state_emojis?.WRONG?.state}.svg`"
          alt="1.TH.EMOJI.WRONG"
        />
      </button>
      <p
        class="text-[6px] sp:text-[10px] font-semibold mt-0.5 sp:mt-2"
        :class="form.type && form.type == 'WRONG' ? 'text-black' : 'htext-gray-500'"
      >{{ $t(btnWrongText) }}</p>
    </div>
    <div class="text-center">
      <button class="w-8 sp:w-[48px] h-8 sp:h-[48px] flex justify-center items-center" @click="selectEmoji('NORMAL')">
        <img
          @mouseover="hoverEmoji({face: 'NORMAL', state: 'HOVER'})"
          @mouseleave="hoverEmoji({face: 'NORMAL', state: 'DEFAULT'})"
          :src="`/assets/icons/1.TH.EMOJI.${state_emojis?.NORMAL?.face}.${state_emojis?.NORMAL?.mode}.${state_emojis?.NORMAL?.state}.svg`"
          alt="1.TH.EMOJI.NORMAL"
        />
      </button>
      <p
        class="text-[6px] sp:text-[10px] font-semibold mt-0.5 sp:mt-2"
        :class="form.type && form.type == 'NORMAL' ? 'text-black' : 'htext-gray-500'"
      >{{ $t(btnNormalText) }}</p>
    </div>
    <div class="text-center">
      <button class="w-8 sp:w-[48px] h-8 sp:h-[48px] flex justify-center items-center" @click="selectEmoji('GOOD')">
        <img
          @mouseover="hoverEmoji({face: 'GOOD', state: 'HOVER'})"
          @mouseleave="hoverEmoji({face: 'GOOD', state: 'DEFAULT'})"
          :src="`/assets/icons/1.TH.EMOJI.${state_emojis?.GOOD?.face}.${state_emojis?.GOOD?.mode}.${state_emojis?.GOOD?.state}.svg`"
          alt="1.TH.EMOJI.GOOD"
        />
      </button>
      <p
        class="text-[6px] sp:text-[10px] font-semibold mt-0.5 sp:mt-2"
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
  let { face, state } = payload;
  state_emojis[face].state = STATUS_EMOJIS[state_emojis[face].state];
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