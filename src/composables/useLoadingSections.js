import { useLoadingSectionsStore } from "@/stores/loadingSections";
import { computed, ref, watch } from "vue";

export function useLoadingSections() {
  
  const store = useLoadingSectionsStore();
  const loadedSections = ref({});
  const loading = ref(false);

  const startLoading = (section) => {
    loading.value = true;
    store.startLoading(section);
  };

  const stopLoading = (section) => {
    store.stopLoading(section);
    loadedSections.value[section] = true; // Marca la sección como cargada
    loading.value = false;
  };

  const isLoading = (section) => computed(() => store.sections[section] ?? false);
  const isLoaded = (section) => computed(() => loadedSections.value[section] ?? false);

  return { startLoading, stopLoading, isLoading, isLoaded, loading };
}