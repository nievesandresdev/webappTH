import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
    sendMsgToHosterApi,
    loadMessagesApi,
    markMsgsAsReadApi,
    unreadMsgsApi,
    getAvailableLanguagesApi,
    getAllSettingsApi
} from '@/api/services/chat.services'

export const useChatStore = defineStore('chat', () => {
    
    // STATE
    const messages = ref([]);
    const unreadMsgsRef = ref(0);
    // ACTIONS
    async function sendMsgToHoster (params) {
        const response = await sendMsgToHosterApi(params)
        return response
    }

    async function addMessage(dataMsg) {
        messages.value.push(dataMsg);
    }

    async function loadMessages() {
        let params = {
            stayId: localStorage.getItem('stayId'),
            guestId: localStorage.getItem('guestId'),
        }
        
        const response = await loadMessagesApi(params)
        const { ok } = response;
        if(ok){
            messages.value = response.data
        }
        return messages.value
    }

    async function markMsgsAsRead(test = null) {
        let params = {
            stayId: localStorage.getItem('stayId'),
            guestId: localStorage.getItem('guestId'),
            rol: 'Hoster'
        }
        const response = await markMsgsAsReadApi(params)
        const { ok } = response;
        if(ok){
            unreadMsgsRef.value = 0;
            return response.data;
        }
        return null;
    }

    async function unreadMsgs() {
        let params = {
            stayId: localStorage.getItem('stayId'),
            guestId: localStorage.getItem('guestId'),
            rol: 'Hoster'
        }
        const response = await unreadMsgsApi(params)
        const { ok } = response;
        if(ok){
            unreadMsgsRef.value = response.data;
        }
    }

    async function getAvailableLanguages() {
        const response = await getAvailableLanguagesApi()
        const { ok } = response;
        if(ok){
            return response.data;
        }
        return [];
    }

    async function getAllSettings() {
        const response = await getAllSettingsApi()
        const { ok } = response;
        if(ok){
            return response.data;
        }
        return [];
    }

    function setUnreadMsgsCount(count) {
        unreadMsgsRef.value = count;
    }

    //getters

    const countUnreadMessages = computed(() => {
        return unreadMsgsRef.value;
    });
    //


    return {
        sendMsgToHoster,
        addMessage,
        loadMessages,
        markMsgsAsRead,
        unreadMsgs,
        unreadMsgsRef,
        countUnreadMessages,
        setUnreadMsgsCount,
        getAvailableLanguages,
        messages,
        getAllSettings
    }

})