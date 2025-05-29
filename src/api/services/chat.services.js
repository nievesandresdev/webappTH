import { apiHttp } from '../axiosApi'
import {
    chatPath,
} from '../config/apiRoute'

export const sendMsgToHosterApi = (params) => apiHttp('POST', `${chatPath}/sendMsgToHoster`, params , { showPreloader: false })
export const loadMessagesApi = (params) => apiHttp('POST', `${chatPath}/loadMessages`, params)
export const markMsgsAsReadApi = (params) => apiHttp('POST', `${chatPath}/markMsgsAsRead`, params , { showPreloader: false })
export const unreadMsgsApi = (params) => apiHttp('GET', `${chatPath}/unreadMsgs`, params , { showPreloader: false })
export const getAvailableLanguagesApi = () => apiHttp('GET', `${chatPath}/getAvailableLanguages`, [] , { showPreloader: false })
export const getAllSettingsApi = () => apiHttp('GET', `${chatPath}/getAllSettings`, [] , { showPreloader: false })
export const getChatHoursByHotelApi = () => apiHttp('GET', `${chatPath}/getChatHoursByHotel`, [] , { showPreloader: false })