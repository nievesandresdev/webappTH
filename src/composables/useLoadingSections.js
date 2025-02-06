import { useLoadingSectionsStore } from "@/stores/loadingSections";
import { computed, ref } from "vue";

export function useLoadingSections() {
  const store = useLoadingSectionsStore();
  const loadedSections = ref({});

  const startLoading = (section) => {
    
    store.startLoading(section);
  };

  const stopLoading = (section) => {
    store.stopLoading(section);
    loadedSections.value[section] = true; // Marca la sección como cargada
  };

  const isLoading = (section) => computed(() => store.sections[section] ?? false);
  const isLoaded = (section) => computed(() => loadedSections.value[section] ?? false);

  return { startLoading, stopLoading, isLoading, isLoaded };
}