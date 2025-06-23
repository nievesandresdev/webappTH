import { useToast } from "vue-toastification";
import CheckIcon from "@/components/CheckIcon.vue";
import { useRoute } from 'vue-router'

export function handleToast() {
  
  const route = useRoute();
  const toast = useToast();

  const toastSuccess = (msg, mBottom = null) => {
    //saldra pegado debajo en las vista de perfil(por ahora)
    //en las demas vistas que tiene menu saldra sobre el menu
    
    const ByView = ['Profile','MyStays','PersonalInfo','EditStay','Home','ChainLanding','Inbox'].includes(route.name) ? "bottom-toast-normal" : "bottom-toast-over-menu";
    const typeBottom = Boolean(mBottom) ? mBottom : ByView;
    const totalClassToast = "success-toast "+typeBottom;
    toast(msg, {
        toastClassName: totalClassToast,
        bodyClassName: "success-toast-body",
        position: "bottom-center",
        icon: CheckIcon,
        timeout: 2500,
        closeButton: false,  
        hideProgressBar: true,
    });
  };


  const warningToast = (msg) => {
    toast(msg, {
        toastClassName: "warning-toast",
        bodyClassName: "warning-toast-body",
        position: "bottom-center",
        icon: CheckIcon,
        timeout: 2500,
        closeButton: false,  
        hideProgressBar: true,
    });
  }

  return { toastSuccess, warningToast };
}
