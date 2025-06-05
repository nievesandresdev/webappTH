import { apiHttp } from '../axiosApi'
import {
    rewardPath,
} from '../config/apiRoute'

export const createCodeReferent = (params) => apiHttp('POST', `${rewardPath}/createCodeReferent`, params , { showPreloader: false }, 'API_GENERAL', false, true)