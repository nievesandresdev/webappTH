import { defineStore } from "pinia";
import { reactive } from "vue";

export const useLoadingSectionsStore = defineStore("loadingSections", () => {
  // Estado reactivo que guarda el loading por cada sección
  const sections = reactive({});

  // Iniciar la carga de una sección específica
  function startLoading(section) {
    sections[section] = true;
  }

  // Finalizar la carga de una sección específica
  function stopLoading(section) {
    sections[section] = false;
  }

  return { sections, startLoading, stopLoading };
});
