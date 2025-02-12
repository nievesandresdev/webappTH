<template>
    
    <HeadWithLang 
        go-back
        @go-back="goBack"
        text="Política de privacidad"
        title-classes="h-[28px] lato text-[20px] font-bold leading-[28px] w-[255px] text-center"
        sticky
    />
    
    <div class="py-6 px-4">
        <!-- point 1 -->
        <div>
            <h1 class="lato text-base font-bold leading-[20px]">1. IDENTIFICACIÓN Y RESPONSABLE DEL TRATAMIENTO DE LOS DATOS.</h1> <br/>
             <p class="lato text-sm font-medium leading-[16px]">
                [Hotel] con domicilio en [dirección] y con NIF [NIF] es el responsable de los datos personales recogidos a través de la webapp. <br/> <br/>
                Si tiene alguna duda o necesita más información sobre el tratamiento de sus datos personales, puede contactar a través de [email].  <br/> <br/>
                <template v-if="false">
                    Datos de contacto del Delegado de Protección de Datos: correo electrónico [email], dirección postal [dirección].  <br/> <br/>
                </template>
             </p>
        </div>
        <!-- point 2 -->
        <div class="mt-2">
            <h1 class="lato text-base font-bold leading-[20px]">2. INFORMACIÓN PERSONAL RECOPILADA. </h1> <br/>
             <p class="lato text-sm font-medium leading-[16px]">
                Al utilizar la webapp, podemos recopilar y procesar la siguiente información sobre usted: <br/> <br/>
                <ul class="list-disc pl-4">
                    <li class="lato text-sm font-medium leading-[16px]">Acceso a la webapp. Determinados accesos a la webapp implicarán la solicitud de alguno de los siguientes datos: </li>
                </ul>
                <ul class="list-disc pl-8 mt-4">
                    <li class="lato text-sm font-medium leading-[16px]">Nombre y apellidos: para identificarle y personalizar su experiencia en la webapp.  </li>
                    <li class="lato text-sm font-medium leading-[16px] mt-4">Número de teléfono o email: para facilitar la comunicación y enviarle notificaciones relacionadas con la webapp. </li>
                    <li class="lato text-sm font-medium leading-[16px] mt-4">Fecha de Check-in y Check-out: para conocer las fechas de su estancia y ofrecerle información relevante.</li>
                </ul>
                <ul class="list-disc pl-4">
                    <li class="lato text-sm font-medium leading-[16px] mt-4">Registro de la estancia: nombre, apellido, segundo apellido, sexo, nacionalidad, fecha de nacimiento, ciudad de nacimiento, país de nacimiento, país de residencia, ciudad de residencia, dirección de residencia, tipo de identificación, número de identificación, fecha de identificación, país de identificación, ciudad de emisión, propósito de la estadía, número de visa, firma. </li>
                    <li class="lato text-sm font-medium leading-[16px] mt-4">Participación en encuestas. Si decide participar en las encuestas de satisfacción, recopilamos sus respuestas para evaluar su experiencia y ayudarnos a mejorar los servicios. </li>
                </ul>
             </p>
        </div>
        <!-- point 3 -->
        <div class="mt-6">
            <h1 class="lato text-base font-bold leading-[20px]">3. FINALIDAD DEL TRATAMIENTO.  </h1> <br/>
             <p class="lato text-sm font-medium leading-[16px]">
                Los datos personales que se recogen a través de la webapp se utilizan para las siguientes finalidades:  <br/> <br/>
                <ul class="list-disc pl-4">
                    <li class="lato text-sm font-medium leading-[16px]">Acceso y uso de la webapp: facilitar el acceso y uso personalizado de la webapp, permitiendo al huésped obtener información relacionada con su estancia, la ciudad y las actividades turísticas disponibles, y comunicarse con el personal del hotel a través del chat incorporado en la webapp. </li>
                    <li class="lato text-sm font-medium leading-[16px] mt-4">Encuestas de satisfacción: durante la estancia o una vez finalizada la misma, el huésped puede ser invitado a participar en una encuesta para evaluar su experiencia y proporcionar feedback. </li>
                    <li class="lato text-sm font-medium leading-[16px] mt-4">Notificaciones: en determinados casos, podemos enviar notificaciones, ya sea por correo electrónico o SMS, relacionadas con mensajes sin leer en el chat o cualquier otra información relevante sobre la estancia. </li>
                    <li class="lato text-sm font-medium leading-[16px] mt-4">Comunicaciones comerciales: envío de comunicaciones comerciales y ofertas personalizadas. </li>
                    <li class="lato text-sm font-medium leading-[16px] mt-4">Información a las autoridades competentes, según lo requieran las normativas turísticas. </li>
                </ul>
             </p>
        </div>
        <!-- point 4 -->
        <div class="mt-6">
            <h1 class="lato text-base font-bold leading-[20px]">4. LEGITIMACIÓN DEL TRATAMIENTO.  </h1> <br/>
             <p class="lato text-sm font-medium leading-[16px]">
                La base jurídica que legitima el tratamiento de los datos personales de los huéspedes se fundamenta en:   <br/> <br/>
                <ul class="list-disc pl-4">
                    <li class="lato text-sm font-medium leading-[16px]">Ejecución de un contrato en el que el interesado es parte o para la aplicación a petición de este de medidas precontractuales. </li>
                    <li class="lato text-sm font-medium leading-[16px] mt-4">Interés legítimo: en determinadas circunstancias, es posible que tratemos datos personales basándonos en nuestro interés legítimo, siempre y cuando dicho interés no se vea superado por los intereses o derechos y libertades fundamentales del huésped. </li>
                    <li class="lato text-sm font-medium leading-[16px] mt-4">Cumplimiento de una obligación legal: en ciertos casos, el tratamiento de datos personales puede ser necesario para cumplir con obligaciones legales aplicables al hoster. </li>
                </ul>
             </p>
        </div>
        <!-- point 5 -->
        <div class="mt-6">
            <h1 class="lato text-base font-bold leading-[20px]">5. CESIÓN DE LOS DATOS.</h1> <br/>
             <p class="lato text-sm font-medium leading-[16px]">
                Los datos personales de los huéspedes no serán cedidos ni transferidos a terceros sin el previo consentimiento informado, salvo en los casos previstos por la ley.<br/> <br/>
                Sin embargo, para el correcto funcionamiento de la webapp es necesario que ciertos proveedores de servicios accedan a los datos personales de los huéspedes en calidad de encargados del tratamiento. Estos proveedores tienen la obligación de tratar los datos exclusivamente con las finalidades estipuladas por el hoster y bajo las condiciones que se determinen en los correspondientes contratos de encargado del tratamiento.<br/> <br/>
                Entre estos proveedores se encuentra TheHoster (The Hoster Hospitality S.L. con NIF B56861479 y email de contacto info@thehoster.io), que proporciona la infraestructura y tecnología necesaria para el correcto funcionamiento de la webapp. TheHoster actúa en todo momento como encargado del tratamiento y únicamente procesa los datos según las instrucciones del titular del alojamiento y para las finalidades previstas.<br/> <br/>
             </p>
        </div>
        <!-- point 6 -->
        <div class="mt-4">
            <h1 class="lato text-base font-bold leading-[20px]">6. DERECHOS DEL USUARIO.</h1> <br/>
             <p class="lato text-sm font-medium leading-[16px]">
                a) Derecho de acceso: tiene derecho a solicitar y obtener confirmación de si se tratan datos personalesque le conciernen, así como a acceder a sus datos personales almacenados.<br/> <br/>
                b) Derecho de rectificación: tiene derecho a solicitar la rectificación de sus datos personales si estos fueran inexactos o incompletos<br/> <br/>
                c) Derecho de supresión: tiene derecho a solicitar la supresión de sus datos personales cuando, entre otros motivos, los datos ya no sean necesarios para los fines que fueron recogidos.<br/> <br/>
                d) Derecho de oposición: tiene derecho a oponerse al tratamiento de sus datos personales, por motivos relacionados con su situación particular.<br/> <br/>
                e) Derecho a la limitación del tratamiento: tiene derecho a solicitar la limitación del tratamiento de sus datos personales, en cuyo caso únicamente se conservan para el ejercicio o la defensa de reclamaciones.<br/> <br/>
                f) Derecho a la portabilidad de los datos: tiene derecho a recibir los datos personales que le incumben, que haya facilitado a un responsable del tratamiento, en un formato estructurado, de uso común y lectura mecánica y a transmitirlos a otro responsable del tratamiento.<br/> <br/>
                g) Derecho a no ser objeto de decisiones individuales automatizadas: tiene derecho a no ser objeto de una decisión basada únicamente en el tratamiento automatizado, incluida la elaboración de perfiles, que produzca efectos jurídicos en él o le afecte significativamente de modo similar.<br/> <br/>
                h) Derecho a revocar el consentimiento otorgado.<br/> <br/>
                i) Derecho a reclamar ante la Agencia Española de Protección de Datos cuando el interesado considere que se ha vulnerado los derechos que le son reconocidos por la normativa aplicable en protección de datos.<br/> <br/>
             </p>
        </div>
        <!-- point 7 -->
        <div class="mt-4">
            <h1 class="lato text-base font-bold leading-[20px]">7. PLAZO DE CONSERVACIÓN DE LOS DATOS.</h1> <br/>
             <p class="lato text-sm font-medium leading-[16px]">
                Sus datos se almacenan durante el tiempo necesario para realizar los diferentes tratamientos, y al menos, de acuerdo con la normativa turística, por un período de 3 años.<br/> <br/>
             </p>
        </div>
        <!-- point 8 -->
        <div class="mt-4">
            <h1 class="lato text-base font-bold leading-[20px]">8. ENLACES A SITIOS WEB DE TERCEROS</h1> <br/>
             <p class="lato text-sm font-medium leading-[16px]">
                La webapp puede incluir hipervínculos o enlaces que permiten acceder a páginas web de terceros. Los titulares de dichos sitios web dispondrán de sus propias políticas de protección de datos, siendo ellos mismos, en cada caso, responsables de sus propios ficheros y de sus propias prácticas de privacidad.
             </p>
        </div>
        <div class="mt-6">
             <p class="lato text-sm font-medium leading-[16px]">
                Esta Política de Privacidad fue actualizada por última vez el 06 de marzo de 2024.
             </p>
        </div>
    </div>
</template>
<script setup>
import HeadWithLang from '@/layout/Components/HeadWithLang.vue'
import { navigateTo } from '@/utils/navigation'
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
//store
import { useHotelStore } from '@/stores/modules/hotel'
const hotelStore = useHotelStore()
import { useHistoryStore } from '@/stores/modules/history';
const historyStore = useHistoryStore()
import { useAuthStore } from '@/stores/modules/auth'
const authStore = useAuthStore()

async function goBack(){
    if(authStore.sessionActive){
        //si existe session usa el historial
        historyStore.$goBack(router);
    }else{
        if(hotelStore.hotelData){
            navigateTo('Home',{},{ acform : 'complete', g : localStorage.getItem('guestId') })
        }else{
            router.push({ name: 'ChainLanding', query:{acform:'complete', g : localStorage.getItem('guestId')}});
        }
    }
    
}
</script>