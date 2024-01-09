<template>
  <div class="flex justify-center space-x-4">
    <div class="text-center">
      <button class="w-[56px] h-[56px] flex justify-center items-center" @click="selectEmoji('WRONG')">
        <img
          @mouseover="hoverEmoji({face: 'WRONG', state: 'HOVER'})"
          @mouseleave="hoverEmoji({face: 'WRONG', state: 'DEFAULT'})"
          :src="`/vendor_asset/img/hoster/icons/1.TH.EMOJI.${state_emojis?.WRONG?.face}.${state_emojis?.WRONG?.mode}.${state_emojis?.WRONG?.state}.svg`"
          alt="1.TH.EMOJI.WRONG"
        />
      </button>
      <span
        class="text-[10px] font-semibold mt-2"
        :class="form.type && form.type == 'WRONG' ? 'text-black' : 'htext-gray-500'"
      >Mal</span>
    </div>
    <div class="text-center">
      <button class="w-[56px] h-[56px] flex justify-center items-center" @click="selectEmoji('NORMAL')">
        <img
          @mouseover="hoverEmoji({face: 'NORMAL', state: 'HOVER'})"
          @mouseleave="hoverEmoji({face: 'NORMAL', state: 'DEFAULT'})"
          :src="`/vendor_asset/img/hoster/icons/1.TH.EMOJI.${state_emojis?.NORMAL?.face}.${state_emojis?.NORMAL?.mode}.${state_emojis?.NORMAL?.state}.svg`"
          alt="1.TH.EMOJI.NORMAL"
        />
      </button>
      <span
        class="text-[10px] font-semibold mt-2"
        :class="form.type && form.type == 'NORMAL' ? 'text-black' : 'htext-gray-500'"
      >Normal</span>
    </div>
    <div class="text-center">
      <button class="w-[56px] h-[56px] flex justify-center items-center" @click="selectEmoji('GOOD')">
        <img
          @mouseover="hoverEmoji({face: 'GOOD', state: 'HOVER'})"
          @mouseleave="hoverEmoji({face: 'GOOD', state: 'DEFAULT'})"
          :src="`/vendor_asset/img/hoster/icons/1.TH.EMOJI.${state_emojis?.GOOD?.face}.${state_emojis?.GOOD?.mode}.${state_emojis?.GOOD?.state}.svg`"
          alt="1.TH.EMOJI.GOOD"
        />
      </button>
      <span
        class="text-[10px] font-semibold mt-2"
        :class="form.type && form.type == 'GOOD' ? 'text-black' : 'htext-gray-500'"
      >Muy bien</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, inject } from "vue";

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