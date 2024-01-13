import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
    sendMsgToHosterApi,
    loadMessagesApi,
    markMsgsAsReadApi,
    unreadMsgsApi
} from '@/api/services/chat.services'

export const useChatStore = defineStore('chat', () => {
    
    // STATE
    const messages = ref([]);
    const unreadMsgsRef = ref([]);
    // ACTIONS
    async function sendMsgToHoster (params) {
        const response = await sendMsgToHosterApi(params)
        return response
    }

    function addMessage(dataMsg) {
        messages.value.push(dataMsg);
    }

    async function loadMessages() {
        let params = {
            stayId: localStorage.getItem('stayId')
        }
        const response = await loadMessagesApi(params)
        const { ok } = response;
        if(ok){
            messages.value = response.data
        }
        return messages.value
    }

    async function markMsgsAsRead() {
        let params = {
            stayId: localStorage.getItem('stayId'),
            rol: 'Hoster'
        }
        const response = await markMsgsAsReadApi(params)
        const { ok } = response;
        if(ok){
            return unreadMsgsRef.value = true;
        }
        return unreadMsgsRef.value = false;
    }

    async function unreadMsgs() {
        let params = {
            stayId: localStorage.getItem('stayId'),
            rol: 'Hoster'
        }
        const response = await unreadMsgsApi(params)
        const { ok } = response;
        if(ok){
            console.log('unreadMsgsApi',response.data)
            return response.data
        }
        return false
    }

    //
    return {
        sendMsgToHoster,
        addMessage,
        loadMessages,
        markMsgsAsRead,
        unreadMsgs,
        unreadMsgsRef
    }

})