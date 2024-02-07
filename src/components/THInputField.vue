<template>
    <div class="cursor-pointer relative" v-if="options.length > 0">
      <button
        :disabled="disabled"
        @click="toggleDropdown"
        class="box-input-field flex items-center h-10 w-full rounded-[6px] py-2 px-3 hoverForm bg-white text-left"
        :class="{
          'hborder-gray-400': !error && !modelValue,
          'hborder-alert-negative': error,
          'hborder-black-100': modelValue,
        }"
      >
        <img v-if="icon_left" :src="icon_left" :class="icon_left_class">
        <span
          class="flex-grow truncate text-label text-sm font-medium mr-2"
          :class="{
            'htext-gray-500': !error && !modelValue,
            'htext-alert-negative': error,
            'htext-black-100': modelValue,
          }"
        >
          {{ labelSelect }}
        </span>
        <template v-if="modelValue && !mandatory">
          <img :src="icon_delete" :class="icon_delete_class" @click.stop="deleteOption" class="cursor-pointer">
        </template>
        <template v-else>
          <img :src="icon_right" :class="icon_right_class">
        </template>
      </button>
      <div
        class="custom-dropdown-menu max-h-[104px] lg:max-h-[264px] overflow-y-scroll"
        :class="{'show': showOptions}"
      >
        <div
          v-for="(option, index) in options"
          :key="index"
          class="custom-option cursor-pointer relative h-10 p-3 text-sm"
          @click.prevent="selectOption(option)"
          @mouseover="hoverOption = true"
          @mouseleave="hoverOption = false"
          tabindex="-1"
          :class="{'active': (option.value == modelValue) && !hoverOption, 'disabled': option.disabled}"
        >
          <p>
            <img v-if="option.img" :src="option.img" :class="option.img_class ?? option_classes">
            {{ option.label }}
            <span v-if="option.tag" class="status-tag inline ml-2" :class="option.tag.class">
              {{ option.tag.text }}
            </span>
          </p>
        </div>
      </div>
      <p v-if="error && showError" class="mt-1 text-xs htext-alert-negative flex">
        <img class="inline w-4 h-4 mr-2" src="/assets/icons/1.TH.WARNING.svg">
        {{ texterror }}
      </p>
    </div>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        showOptions: false,
        hoverOption: false,
      };
    },
    emits: ['update:modelValue'],
    props: {
            id:{
                type: String,
                default: '',
            },
            error:{
                type: Boolean,
                default: false,
            },
            showError:{
                type: Boolean,
                default: false,
            },
            disabled:{
                type: Boolean,
                default: false,
            },
            textLabel: {
                type: String,
                default: '',
            },
            modelValue: {
                type: [Number, String],
                default: null,
            },
            options: {
                type: Array,
                default: () => ([]),
            },
            classLabel:{
                type: Object,
                default: null,
            },
            icon_left:{
                type: String,
                default: null,
            },
            icon_left_class:{
                type: String,
                default: 'h-6 w-6 mr-2',
            },
            icon_right:{
                type: String,
                default: '/assets/icons/1.TH.I.DROPDOWN.svg',
            },
            icon_right_class:{
                type: String,
                default: 'h-6 w-6',
            },
            icon_delete:{
                type: String,
                default: '/assets/icons/1.TH.CLOSE.svg',
            },
            icon_delete_class:{
                type: String,
                default: 'h-6 w-6',
            },
            option_classes:{
                type: String,
                default: 'h-6 w-6 mr-2 inline',
            },
            mandatory:{
                type:Boolean,
                default:false
            },
            texterror:{
                type:String,
                default:'Campo obligatorio'
            },
            size: {
                type: String,
                default: 'm', //s.m,l
            },
            top_dropdown: {
                type: String,
                default: 'top-dropdown', //opciones : top-auto
            },
            extra_dropdown: {
                type: String,
                default: '', //opciones : top-auto
            },
        },
    mounted() {
        document.addEventListener('click', this.handleOutsideClick);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleOutsideClick);
    },
    methods: {
        toggleDropdown(event) {
            this.showOptions = !this.showOptions;
            event.stopPropagation();
        },
        handleOutsideClick(event) {
            if (!this.$el.contains(event.target)) {
                this.showOptions = false;
            }
        },
        selectOption(option) {
            this.showOptions = false;
            if (!option.disabled) {
                this.$emit('update:modelValue', option.value);
            }
        },
        deleteOption() {
            this.$emit('update:modelValue', null);
            this.showOptions = false;
        },
        closeDropdown() {
            this.showOptions = false;
        },
      
    },
    
    computed: {
        label () {
            var lb = this.options.find(item => this.modelValue == item.value)
            var text = lb ? lb.label : null
            return text
        },
        // labelSelect (){
        //     return this.label || this.textLabel;
        // },
        labelSelect() {
            const selectedOption = this.options.find(option => option.value === this.modelValue);
            return selectedOption ? selectedOption.label : this.textLabel;
        },
        style () {
            let s = {
                content: 'h-10 rounded-6 p-3',
                text: 'text-sm',
            }
            if (this.size == 's') {
                s.content = 'h-8 rounded-6 py-auto py-1.5 px-3'
                return s
            }
            if (this.size == 'free') {
                s = {
                    content : 'border-0',
                    text: 'mr-1'
                }
                return s
            }
            return s
        }
    },
  };
  </script>
  <style scoped>
  .border-0:hover,
  .border-0 {
      border: none !important;
  }
  .box-input-field:hover {
      border-color: var(--h-green-600) !important;
  }
  .box-input-field:hover > .text-label {
      color: var(--h-green-600) !important;
  }
  .top-dropdown {
      top: 40px !important;
      transform: none !important;
  }
  .top-auto {
      top: 0;
  }
  .custom-dropdown-menu {
      display: none;
      position: absolute;
      z-index: 1000;
      box-shadow: 0px 3.5px 7px rgba(0, 0, 0, 0.15);
      border-radius: 0px 0px 10px 10px;
      border: none;
      width: 100%;
      padding: 0;
      background-color: white;
  }
  .custom-dropdown-menu.show {
      display: block;
  }
  .custom-option {
      border-radius: 0px 0px 10px 10px;
  }
  .custom-option:hover, .custom-option.active {
      background-color: var(--h-gray-100);
  }
  .custom-option.disabled:hover {
      background-color: #fff;
  }
</style>
