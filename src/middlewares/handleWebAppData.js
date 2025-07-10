// src/middleware/handleWebAppData.js
import { useHotelStore } from '@/stores/modules/hotel'
import { useGuestStore } from '@/stores/modules/guest'
import { useStayStore } from '@/stores/modules/stay'
import { useLocaleStore } from '@/stores/modules/locale'
import { useChainStore } from '@/stores/modules/chain'
import { useHistoryStore } from '@/stores/modules/history'
import { useAuthStore } from '@/stores/modules/auth'

import utils from '@/utils/utils.js';
import { i18n } from '@/i18n'

export default async function handleWebAppData({ to, from, next }) {
    console.log('test handleWebAppData',{to,from});
    const stayStore = useStayStore();
    const guestStore = useGuestStore();
    const historyStore = useHistoryStore();
    const authStore = useAuthStore();
    //
    // const stayId = utils.getUrlParam('e');
    // const guestId = utils.getUrlParam('g');
    const stayId = to.query.e;
    const guestId = to.query.g;
    const googleId = to.query.gid;
    const facebookId = to.query.fid;
    sessionStorage.setItem('guestPerStay', utils.getUrlParam('guestPerStay'))
    //evitar multiples redirecciones
    
    if (to.name === 'NotFound') return next();
    
    ////////////////////////////////////////////////////////
    //
    //cargar data de la cadena
    const chainStore = useChainStore();
    await chainStore.$loadChainSubdomain();
    const chainSubdomain = localStorage.getItem('chainSubdomain');//http://localhost:81/?chainsubdomain=nobusevillatex
    
    if (!chainSubdomain) {
        return next({ name: 'NotFound' }); // Redirige a la ruta NotFound
    }else{
        if(chainStore.chainData?.subdomain !== chainSubdomain || !chainStore.chainData){
            await chainStore.$loadChainData();
        }
        if(!chainStore.chainData) return next({ name: 'NotFound' }); // Redirige a la ruta NotFound
        
        //para el caso de que entren a chainlanding en pc
        //sera redireccionado a compartir pantalla
        //en index de rutas se toman los demas caso para redirigir en pc a esta pantalla
        if(chainStore.chainData && screen.width > 766 && to.name == 'ChainLanding'){
            console.log('Redirigiendo a ScreenNotAllowed');
            next({
                name: 'ScreenNotAllowed',
            });
        }
    }
    ////////////////////////////////////////////////////////
    //
    //
    console.log('test mddl 1')
    const hotelStore = useHotelStore();
    //se guarda el subdominio en localstorage en caso de existir
    if(chainStore.chainData?.type == 'INDEPENDENT'){
        utils.saveHotelSlug(chainStore.chainData?.independentSubdomain);    
        if(chainStore.chainData?.independentSubdomain && to.name == 'ChainLanding'){
            // Redirige a la home cuando la cadena sea independiente
            console.log('test mddl 1.1')
            return next({ name: 'Home', params :{ hotelSlug: chainStore.chainData?.independentSubdomain}, query: to.query }); 
        } 
    }else{
        console.log('test mddl 1.2')
        let sudmainsChain = chainStore.chainData.hotels_subdomains;
        let validSubdomain = sudmainsChain.includes(to.params.hotelSlug);
        //si el slug no pertenece a un hotel de la cadena se va a la chainlanding
        if(!validSubdomain && to.params.hotelSlug && !utils.isMockup()) {
            await hotelStore.$deleteLocalHotel();
            // console.log('test mddl 2')
            return next({ name: 'ChainLanding' });
        }
        utils.saveHotelSlug(to.params.hotelSlug);
    }
    //cargar data del hotel
    hotelStore.$load(false, to);
    ////////////////////////////////////////////////////////
    //
    //
    console.log('test mddl 2')
    if (to.query.mockup || to.query.dossier) {
        console.log('test mddl 2.1')
        await authStore.$autenticateWithGuestDemo();
    }

    //cargar data stay
    console.log('test mddl 3')
    if(stayId){
        console.log('test mddl 3.1')
        await stayStore.findByIdInSetLocalStay(stayId)
    }
    ////////////////////////////////////////////////////////
    //
    //
    //cargar data huesped
    console.log('test mddl 4')
    if(guestId){
        console.log('test mddl 4.1')
        if (googleId) {
            console.log('test mddl 4.1.1')
            await authStore.$loginByGoogle(guestId, googleId);
        }else if (facebookId) {
            console.log('test mddl 4.1.2')
            await authStore.$loginByFacebook(guestId, facebookId);
        }else {
            console.log('test mddl 4.2')
            let localGuest = guestStore.getLocalGuest();
            if(!localGuest || localGuest && Number(localGuest.id) !== Number(guestId)){
                await guestStore.findByIdInSetLocalGuest(guestId)
            }
        }
    }
    ////////////////////////////////////////////////////////
    //
    //
    //data extra
    console.log('test mddl 5')
    const localeStore = useLocaleStore();
    if (utils.isMockup() || !localStorage.getItem('guestId')) {
        console.log('test mddl 5.1')
        let lang = hotelStore.hotelData?.language_default_webapp ?? localeStore.localeCurrent;
        if(localeStore.localeCurrent !== 'es'){
            lang = localeStore.localeCurrent;
        }
        localeStore.$loadByURL(lang);
    } else if (!utils.isMockup()) {
        console.log('test mddl 5.2')
        let lang = localeStore.localeCurrent !== i18n.global.locale.value ? localeStore.localeCurrent : null;
        localeStore.$loadByURL(lang);
    }

    // if (to.meta.verifyHotel && !hotel) {
    //     return next({ name: 'NotFound' });
    // }

    //validar sesion 
    // console.log('test screen.width',screen.width)
    console.log('test mddl 6')
    if(screen.width < 767){   
        console.log('test mddl 6.1')
        authStore.$validateSession(to, next);
        authStore.$goLoginBySocialNetwork();
        authStore.$validateStayGuestRelation(next);
    }
    //
    // Agrega la nueva ruta al historial
    console.log('test mddl 7')
    if(authStore.sessionActive){
        console.log('test mddl 7.1')
        historyStore.$addRoute({
            name: to.name,
            params: to.params,
            query: to.query
        })
    }
    // console.log('test mddl fin')
    next();
}
