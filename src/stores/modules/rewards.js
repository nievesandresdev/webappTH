import { defineStore } from 'pinia'

import {
    createCodeReferent
} from '@/api/services/reward.services'


export const useRewardsStore = defineStore('rewards', () => {

    async function $createCodeReferent (params) {
        const response = await createCodeReferent(params)
        return response
    }

    return {
        $createCodeReferent
    }

})