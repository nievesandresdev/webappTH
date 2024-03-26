import axios from 'axios'
import { i18n } from '@/i18n'
import { usePreloaderStore } from '@/stores/modules/preloader';


const locale = localStorage.getItem('locale') || 'es'
const API_URL_BACKEND = process.env.VUE_APP_API_URL_BACKEND
const X_KEY_API = process.env.VUE_APP_X_KEY_API

function getPreloaderStore() {// función auxiliar que devuelve el store de preloader
  return usePreloaderStore();
}

axios.interceptors.request.use(config => {
  if (config.showPreloader !== false) {
    const preloader = getPreloaderStore();
    preloader.requestStarted();
  }
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  if (response.config.showPreloader !== false) {
    const preloader = getPreloaderStore();
    preloader.requestFinished();
  }
  return response;
}, error => {
  if (!error.config || error.config.showPreloader !== false) {
    const preloader = getPreloaderStore();
    preloader.requestFinished();
  }
  return Promise.reject(error);
});


export const apiHttp = async (method, endpoint, data, options = {}) => {
    // const { token } = localStorage
    const subdomain = localStorage.getItem('subdomain') || null
    const defaultHeaders = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Accept-Language': locale,
      'Hotel-SUBDOMAIN': subdomain,
      'x-key-api': X_KEY_API,
    //   Authorization: 'Bearer ' + `${token}`,
    }
 // eslint-disable-next-line no-prototype-builtins
 if (!options.hasOwnProperty('headers')) options.headers = defaultHeaders
 let serviceResponse = {}
 method = method.toLowerCase()
let paramAxios = {
  method,
  url: `${API_URL_BACKEND}/${endpoint}`,
  data,
  params: data,
  ...options,
} 

 const servicePromise = axios(paramAxios)

 try {
    // if (loading) { window.getApp.$emit('LOADING', true) }
    const [materializedPromise] = await Promise.all([servicePromise])
    serviceResponse = { ...materializedPromise.data }
  } catch (error) {
    serviceResponse = buildErrorMessage(error)
  }
  return serviceResponse
}

function buildErrorMessage (error) {
  console.log(error)
    const errorResponse = {
      ok: false,
      message: {
        code: String,
        text: String,
      },
      data: '',
    }
    if (typeof error.response === 'undefined') {
      errorResponse.message.text = i18n.global.t('messageRequest.apiErrorUndefined')
    } else if (error.response.status === 401) {
        errorResponse.message.text = i18n.global.t('messageRequest.apiError401')
      } else if (error.response.status === 404) {
        errorResponse.message.text = i18n.global.t('messageRequest.apiError404')
      } else if (error.response.status === 500) {
        errorResponse.message.text = i18n.global.t('messageRequest.apiError500')
      } else if (error.response.status === 405 || error.response.status === 406) {
        errorResponse.message.text = i18n.global.t('messageRequest.apiError405_406')
      } else errorResponse.message.text = error.response.data.message.text
    errorResponse.ok = error.response.data.ok
    // eslint-disable-next-line no-prototype-builtins
    if (error.response.data.hasOwnProperty('errors')) errorResponse.message.text = Object.values(error.response.data.errors)[0][0]
    // eslint-disable-next-line no-prototype-builtins
    else if (error.response.data.hasOwnProperty('motives')) errorResponse.message.text = error.response.data.motives.message
    else errorResponse.message.text = error.response.data.message
    errorResponse.data = error.response.data
    errorResponse.code = error.response.status
    return errorResponse
  }