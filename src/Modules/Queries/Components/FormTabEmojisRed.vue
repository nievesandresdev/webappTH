<template>
    <div 
        class="flex justify-center mx-[-4px] sp:mx-[-10px] md:mx-[-16px]"
        id="emoji-tab-form"
    >
      <div class="text-center px-0.5 sp:px-2.5 md:px-4">
        <div 
          class="flex w-8 h-8 mx-auto sp:w-10 sp:h-10 md:w-[64px] md:h-[64px]"
          id="emoji-VERYWRONG-button"
          @click="selectEmoji('VERYWRONG')"
        >
          <img
            class="mx-auto mt-auto cursor-pointer"
            :class="form.type && form.type !== 'VERYWRONG' ? 'sp:w-8 sp:h-8 md:w-[52px] md:h-[52px] opacity-50' : 'w-full h-full'"
            :src="`/assets/icons/emojis/1.TH.EMOJI.${state_emojis?.VERYWRONG?.face}.${state_emojis?.VERYWRONG?.mode}.svg`"
            alt="1.TH.EMOJI.VERYWRONG"
          />
        </div>
        <p
          class="lato text-[6px] sp:text-[10px] md:text-xs font-bold mt-2 leading-[12px]"
          :class="textEmojiClasess('VERYWRONG')"
        >{{ $t(btnVeryWrongText) }}</p>
      </div>
      <div class="text-center px-0.5 sp:px-2.5 md:px-4">
        <div 
          class="flex w-8 h-8 mx-auto sp:w-10 sp:h-10 md:w-[64px] md:h-[64px]"
          id="emoji-WRONG-button"
          @click="selectEmoji('WRONG')"
        >
          <img
            class="mx-auto mt-auto cursor-pointer"
            :class="form.type && form.type !== 'WRONG' ? 'sp:w-8 sp:h-8 md:w-[52px] md:h-[52px] opacity-50' : 'w-full h-full'"
            :src="`/assets/icons/emojis/1.TH.EMOJI.${state_emojis?.WRONG?.face}.${state_emojis?.WRONG?.mode}.svg`"
            alt="1.TH.EMOJI.WRONG"
          />
        </div>
        <p
          class="lato text-[6px] sp:text-[10px] md:text-xs font-bold mt-2 leading-[12px]"
          :class="textEmojiClasess('WRONG')"
        >{{ $t(btnWrongText) }}</p>
      </div>
      <div class="text-center px-0.5 sp:px-2.5 md:px-4">
        <div 
          class="flex w-8 h-8 mx-auto sp:w-10 sp:h-10 md:w-[64px] md:h-[64px]"
          id="emoji-NORMAL-button"
          @click="selectEmoji('NORMAL')"
        >
          <img
            class="mx-auto mt-auto cursor-pointer"
            :class="form.type && form.type !== 'NORMAL' ? 'sp:w-8 sp:h-8 md:w-[52px] md:h-[52px] opacity-50' : 'w-full h-full'"
            :src="`/assets/icons/emojis/1.TH.EMOJI.${state_emojis?.NORMAL?.face}.${state_emojis?.NORMAL?.mode}.svg`"
            alt="1.TH.EMOJI.NORMAL"
          />
        </div>
        <p
          class="lato text-[6px] sp:text-[10px] md:text-xs font-bold mt-2 leading-[12px]"
          :class="textEmojiClasess('NORMAL')"
        >{{ $t(btnNormalText) }}</p>
      </div>
      <div class="text-center px-0.5 sp:px-2.5 md:px-4">
        <div 
          class="flex w-8 h-8 mx-auto sp:w-10 sp:h-10 md:w-[64px] md:h-[64px]"
          id="emoji-GOOD-button"
          @click="selectEmoji('GOOD')"
        >
          <img
            class="mx-auto mt-auto cursor-pointer"
            :class="form.type && form.type !== 'GOOD' ? 'sp:w-8 sp:h-8 md:w-[52px] md:h-[52px] opacity-50' : 'w-full h-full'"
            :src="`/assets/icons/emojis/1.TH.EMOJI.${state_emojis?.GOOD?.face}.${state_emojis?.GOOD?.mode}.svg`"
            alt="1.TH.EMOJI.GOOD"
          />
        </div>
        <p
          class="lato text-[6px] sp:text-[10px] md:text-xs font-bold mt-2 leading-[12px]"
          :class="textEmojiClasess('GOOD')"
        >{{ $t(btnGoodText) }}</p>
      </div>
      <div class="text-center px-0.5 sp:px-2.5 md:px-4">
        <div 
          class="flex w-8 h-8 mx-auto sp:w-10 sp:h-10 md:w-[64px] md:h-[64px]"
          id="emoji-VERYGOOD-button"
          @click="selectEmoji('VERYGOOD')"
        >
          <img
            class="mx-auto mt-auto cursor-pointer"
            :class="form.type && form.type !== 'VERYGOOD' ? 'sp:w-8 sp:h-8 md:w-[52px] md:h-[52px] opacity-50' : 'w-full h-full'"
            :src="`/assets/icons/emojis/1.TH.EMOJI.${state_emojis?.VERYGOOD?.face}.${state_emojis?.VERYGOOD?.mode}.svg`"
            alt="1.TH.EMOJI.VERYGOOD"
          />
        </div>
        <p
          class="lato text-[6px] sp:text-[10px] md:text-xs font-bold mt-2 leading-[12px]"
          :class="textEmojiClasess('VERYGOOD')"
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

  function textEmojiClasess(face) {
    return form.type && form.type == face ? 'htext-black-100' : 'text-[#777]';
  }
  
  watch(form, (newType) => {
    // console.log('newType',newType.type)      
    selectEmoji(newType.type)
  }, { deep: true, immediate: true });
  </script>