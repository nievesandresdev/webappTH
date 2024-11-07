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
    width: {
      type: [String, Number],
      default: '',
    },
    height: {
      type: [String, Number],
      default: '',
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
      let svgContent = response.data;

      // Reemplazar los atributos de tamaño
      svgContent = svgContent
        .replace(/width="[^"]*"/g, `width="${this.width}"`)
        .replace(/height="[^"]*"/g, `height="${this.height}"`);

      // Reemplazar el color
      if (this.onlyChangeBackground) {
        svgContent = svgContent.replace(/fill="#333333"/g, `fill="${this.color}"`);
      } else {
        svgContent = svgContent.replace(/fill="[^"]*"/g, `fill="${this.color}"`);
      }

      this.svgContent = svgContent;
    } catch (error) {
      console.error(`Error loading SVG icon: ${error}`);
    }
  },
};
</script>

<style scoped>
.svg-icon svg {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  fill: currentColor;
}
</style>
