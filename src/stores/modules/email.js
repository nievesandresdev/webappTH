
import { defineStore } from 'pinia'

import {
    disabledEmail,
    reactivateEmail
} from '@/api/services/email.services'

export const useEmailStore = defineStore('email', () => {

    // ACTIONS
    async function $disabledEmail (params) {
        const response = await disabledEmail(params)
        // console.log(response, 'response')
        return response
    }

    async function $reactivateEmail (params) {
        const response = await reactivateEmail(params)
        // console.log(response, 'response')
        return response
    }

    //
    return {
        $disabledEmail,
        $reactivateEmail
    }

})