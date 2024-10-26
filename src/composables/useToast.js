import { useToast } from "vue-toastification";
import CheckIcon from "@/components/CheckIcon.vue"; 

export function handleToast() {

  const toast = useToast();

  const toastSuccess = (msg) => {
    toast(msg, {
        toastClassName: "success-toast",
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
