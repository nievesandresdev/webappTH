<!-- src/components/SvgIcon.vue -->
<template>
  <div v-html="svgContent" class="svg-icon" :class="class"></div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    class: {
      type: String,
      required: '',
    },
    name: {
      type: String,
      required: '',
    },
    color: {
      type: String,
      default: '#333333',
    },
    onlyChangeBackground: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      svgContent: '',
    };
  },
  async mounted() {
    try {
      const response = await axios.get(`/assets/icons/${this.name}.svg`);
      if (this.onlyChangeBackground) {
        this.svgContent = response.data.replace(/fill="#333333"/g, `fill="${this.color}"`);
        // this.svgContent = response.data.replace(/fill="#333333"/g, `fill="${this.color}"`);
      } else {
        this.svgContent = response.data.replace(/fill="[^"]*"/g, `fill="${this.color}"`);
      }
    } catch (error) {
      console.error(`Error loading SVG icon: ${error}`);
    }
  },
};
</script>

<style scoped>
.svg-icon svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}
</style>
