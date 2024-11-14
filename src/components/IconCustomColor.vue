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
      default: '',
    },
    name: {
      type: String,
      required: true,
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
      default: null,
    },
    height: {
      type: [String, Number],
      default: null,
    },
  },
  data() {
    return {
      svgContent: '',
      baseSvgContent: '',
    };
  },
  watch: {
    color() {
      this.updateSvgContent();
    },
    width() {
      this.updateSvgContent();
    },
    height() {
      this.updateSvgContent();
    },
    onlyChangeBackground() {
      this.updateSvgContent();
    },
    name(newName, oldName) {
      if (newName !== oldName) {
        this.fetchSvg();
      }
    },
  },
  async mounted() {
    await this.fetchSvg();
  },
  methods: {
    async fetchSvg() {
      try {
        const response = await axios.get(`/assets/icons/${this.name}.svg`, { showPreloader: false });
        this.baseSvgContent = response.data;
        this.updateSvgContent();
      } catch (error) {
        console.error(`Error loading SVG icon: ${error}`);
      }
    },
    updateSvgContent() {
      if (!this.baseSvgContent) return;

      let svg = this.baseSvgContent;

      // Reemplazar los atributos de tamaño
      if (this.width && this.height) {
        svg = svg
          .replace(/(<svg[^>]*?)width="[^"]*"/, `$1width="${this.width}"`)
          .replace(/(<svg[^>]*?)height="[^"]*"/, `$1height="${this.height}"`);
      }

      // Reemplazar el color
      if (this.onlyChangeBackground) {
        svg = svg.replace(/fill="#333333"/g, `fill="${this.color}"`);
      } else {
        // Reemplaza todos los atributos de fill, puedes ajustar esto según tus necesidades
        svg = svg.replace(/fill="[^"]*"/g, `fill="${this.color}"`);
      }

      this.svgContent = svg;
    },
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
