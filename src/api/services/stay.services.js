import { apiHttp } from '../axiosApi'
import {
    stayPath,
} from '../config/apiRoute'
console.log(`${stayPath}/findAndValidAccess`)
export const findAndValidAccessApi = (params) => apiHttp('GET', `${stayPath}/findAndValidAccess`, params)