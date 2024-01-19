<template>
    <div :class="class">
      <img
        :src="currentImageSrc"
        :alt="altText"
        @mouseover="isPressed = true"
        @mouseleave="isPressed = false"
        @click="copyToClipboard"
        class="object-contain cursor-pointer"
        v-if="!is_mockup"
      >
      <img
        v-else
        :src="currentImageSrc"
        :alt="altText"
        class="object-contain"
      >
    </div>
  </template>

  <script>
  import { useToast } from "vue-toastification";
  export default {
    props: {
      class: {
        type: String,
        default: 'w-6 h-6',
      },
      defaultSrc: {
        type: String,
        required: true
      },
      pressedSrc: {
        type: String,
        required: true
      },
      altText: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      msg_copy: {
        type: String,
        default: 'Copiado!',
      },
    },
    setup(){
      const toast = useToast();
      return { toast }
    },
    data() {
      return {
        isPressed: false,
        is_mockup:false
      };
    },
    mounted(){
        const urlParams = new URLSearchParams(window.location.search);
        const mockup = urlParams.get('mockup');
        this.is_mockup = (mockup === 'true');
    },
    computed: {
      currentImageSrc() {
        return this.isPressed ? this.pressedSrc : this.defaultSrc;
      }
    },
    methods: {
      copyToClipboard() {
        const el = document.createElement('textarea');
        el.value = this.content;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        setTimeout(() => {
          this.isPressed = false
        }, 300);
        this.toast(this.msg_copy, {
          toastClassName: "hbg-warning",
          bodyClassName: ["text-sm", "font-medium","text-black"],
          icon: false,
      }); 
      }
    }
  };
  </script>
