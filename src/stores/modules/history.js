import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHistoryStore = defineStore('history', () => {
  // STATE
  const storedHistory = localStorage.getItem('history')
  const history = ref(storedHistory ? JSON.parse(storedHistory) : [])
  const excludedRoutes = ref([// nombres de ruta para no guardar en historial
    'ChainLanding', 
    'SelectLanguage',
    'HotelsList',
    'CreateStayFromChain',
    'IsCompleteCheckin',
    'CompleteCheckin',
    'PrivacyPolicies',
    'MyStay',
    'Guests',
    'ReservationStay',
    'PersonalInfo',
    'SelectLanguage'
  ]);

  // ACTIONS
  function $initHistory() {
    history.value = []
    $saveHistory()
  }

  function $loadHistory() {
    const stored = localStorage.getItem('history')
    history.value = stored ? JSON.parse(stored) : []
  }

  function $addRoute(route) {
    // Si hay rutas, comparamos con la última
    const lastRoute = history.value[history.value.length - 1]
    
    // Verificar si la ruta actual está en la lista de excluidas
    if (excludedRoutes.value.includes(route.name)) {
        return;
    }

    // Si no hay rutas aún, la agregamos sin más
    if (history.value.length === 0) {
      history.value.push(route)
      $saveHistory()
      return
    }
  
    // Verificamos que sea distinta (name, params y query)
    if (
      lastRoute.name === route.name &&
      JSON.stringify(lastRoute.params) === JSON.stringify(route.params) &&
      JSON.stringify(lastRoute.query) === JSON.stringify(route.query)
    ) {
      // Es la misma ruta, no la agregamos
      return
    }
  
    // Caso contrario, se agrega
    history.value.push(route)
    $saveHistory()
  }

  function $goBack(router) {
    
    const currentRouteName = router.currentRoute.value.name
    console.log('test ',history.value.length)
    // Recupera la anterior
    let last = history.value[history.value.length - 1];
    
    // excludedRoutes.value.includes(last.name) || 
    if(currentRouteName == last?.name){
      last = history.value[history.value.length - 2];
      // Saca las dos ultimas rutas (la actual)
      history.value.splice(-2, 2)
    }else{
      // Saca la última ruta (la actual)
      history.value.pop() 
    }
    
    //redirecciona a la ultima vista obtenida
    if (last) {
      router.push({ name: last.name, params: last.params, query: last.query })
    } else {
      // Fallback o vista por defecto
      router.push({ name: 'Home' })
    }
    $saveHistory()
  }

  function $clearHistory() {
    history.value = []
    localStorage.removeItem('history')
  }

  function $saveHistory() {
    localStorage.setItem('history', JSON.stringify(history.value))
  }

  async function $saveExclusiveRoute(name, params = {}, query = {}) {
    localStorage.setItem('exclusiveRoute', JSON.stringify({
      name,
      params,
      query
    }))
  }

  async function $deleteExclusiveRoute(name, params = {}, query = {}) {
    localStorage.removeItem('exclusiveRoute')
  }

  async function $goExclusiveRoute(router) {
    let goTo = JSON.parse(localStorage.getItem('exclusiveRoute'))
    router.push({ name: goTo.name, params: goTo.params, query: goTo.query });
    $deleteExclusiveRoute();
  }

  // Retornamos todo lo que queramos exponer
  return {
    history,
    $initHistory,
    $loadHistory,
    $addRoute,
    $goBack,
    $clearHistory,
    $saveExclusiveRoute,
    $deleteExclusiveRoute,
    $goExclusiveRoute,
  }
})
