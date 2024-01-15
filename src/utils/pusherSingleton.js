// pusherSingleton.js
import { utilsPath } from '@/api/config/apiRoute';
// import { apiHttp } from '@/api/config/apiRoute'

// import Pusher from 'pusher-js';

let pusherInstance = null;


export function getPusherInstance() {
    if (!pusherInstance) {
        // console.log("Creando instancia de pusher...");
        // pusherInstance = new Pusher(process.env.VUE_APP_PUSHER_APP_KEY, {
        //     cluster: 'us2',
        //     authEndpoint: `${process.env.VUE_APP_API_URL_BACKEND}/${utilsPath}/authPusher` 
        // });
        // console.log("Instancia de pusher creada:", pusherInstance);
    } else {
        // console.log("Reutilizando instancia existente de pusher:", pusherInstance);
    }
    return pusherInstance;
}

let subscribedChannels = {};

export function isChannelSubscribed(channelName) {
    return !!subscribedChannels[channelName];
}

export function setChannelSubscribed(channelName) {
    subscribedChannels[channelName] = true;
}
