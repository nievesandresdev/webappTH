import { apiHttp } from '../axiosApi'
import {
    chatPath,
} from '../config/apiRoute'

export const sendMsgToHosterApi = (params) => apiHttp('POST', `${chatPath}/sendMsgToHoster`, params , { showPreloader: false }, 'API_GENERAL', false, true)
export const loadMessagesApi = (params) => apiHttp('POST', `${chatPath}/loadMessages`, params, {}, 'API_GENERAL', false, true)
export const markMsgsAsReadApi = (params) => apiHttp('POST', `${chatPath}/markMsgsAsRead`, params , { showPreloader: false }, 'API_GENERAL', false, true)
export const unreadMsgsApi = (params) => apiHttp('GET', `${chatPath}/unreadMsgs`, params , { showPreloader: false })
export const getAvailableLanguagesApi = () => apiHttp('GET', `${chatPath}/getAvailableLanguages`, [] , { showPreloader: false })
export const getAllSettingsApi = () => apiHttp('GET', `${chatPath}/getAllSettings`, [] , { showPreloader: false })