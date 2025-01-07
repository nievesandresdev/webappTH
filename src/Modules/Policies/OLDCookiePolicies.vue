<template>
    <div class="container-fluid-landing pt-14">
        <div class="titulo px-2.5 lg:px-0">
            <h1 class="text-center font-medium text-[40px] leading-[150%]">
                <template v-if="language === 'es'">
                    POLÍTICA DE COOKIES
                </template>
                <template v-if="language === 'en'">
                    COOKIES POLICY
                </template>
                <template v-else-if="language === 'fr'">
                    POLITIQUE DE COOKIES
                </template>
            </h1>
        </div>    
        <div class="parrafo px-2.5 lg:px-0">
            <template v-if="language === 'es'">
                <div class="mt-6">
                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Información Previa
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        El presente sitio web (en adelante, el “Sitio Web”) utiliza cookies para realizar un seguimiento de las interacciones de los usuarios con los servicios que ofrece el titular del sitio web, Cityvities S.L. y mejorar su experiencia en el sitio web.  
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        En esta web se utilizan cookies de terceros y propias para conseguir que tengas una mejor experiencia de navegación, puedas compartir contenido en redes sociales y para que podamos obtener estadísticas de los usuarios. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Este sitio web, no utiliza ninguna información personal procedente de cookies, tan sólo realiza estadísticas generales de visitas que no suponen ninguna información personal.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        ¿Qué son las cookies? 
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Las cookies son un conjunto de datos que un servidor deposita en el navegador del usuario para recoger la información de registro estándar de Internet y la información del comportamiento de los visitantes en un sitio web. Es decir, se trata de pequeños archivos de texto que quedan almacenados en el disco duro del dispositivo y que sirven para identificar al usuario cuando se conecta nuevamente al sitio web. Su objetivo es registrar la visita del usuario y guardar cierta información. Su uso es común y frecuente en la web ya que permite a las páginas funcionar de manera más eficiente y conseguir una mayor personalización y análisis sobre el comportamiento del usuario. 
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        ¿Para que sirven las cookies?
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Las cookies utilizadas en nuestro sitio web, son de sesión y de terceros, y nos permiten almacenar y acceder a información relativa al idioma, el tipo de navegador utilizado, y otras características generales predefinidas por el usuario, así como, seguir y analizar la actividad que lleva a cabo, con el objeto de introducir mejoras y prestar nuestros servicios de una manera más eficiente y personalizada. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Las cookies, en función de su permanencia, pueden dividirse en cookies de sesión o permanentes. Las que expiran cuando el usuario cierra el navegador. Las que expiran en función de cuando se cumpla el objetivo para el que sirven o bien cuando se borran manualmente. 
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Cookies de rendimiento 
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Este tipo de Cookie recuerda sus preferencias para las herramientas que se encuentran en los servicios, por lo que no tiene que volver a configurar el servicio cada vez que usted visita. A modo de ejemplo, en esta tipología se incluyen: Ajustes de volumen de reproductores de vídeo o sonido. Las velocidades de transmisión de vídeo que sean compatibles con su navegador. Los objetos guardados en el “carrito de la compra” en los servicios de e-commerce tales como tiendas. 
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Cookies de registro 
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Las cookies de registro se generan una vez que el usuario se ha registrado o posteriormente ha abierto su sesión, y se utilizan para identificarle en los servicios con los siguientes objetivos: 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Mantener al usuario identificado de forma que, si cierra un servicio, el navegador o el ordenador y en otro momento u otro día vuelve a entrar en dicho servicio, seguirá identificado, facilitando así su navegación sin tener que volver a identificarse. Esta funcionalidad se puede suprimir si el usuario pulsa la funcionalidad [cerrar sesión], de forma que esta cookie se elimina y la próxima vez que entre en el servicio el usuario tendrá que iniciar sesión para estar identificado. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Comprobar si el usuario está autorizado para acceder a ciertos servicios, por ejemplo, para participar en un concurso. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Adicionalmente, algunos servicios pueden utilizar conectores con redes sociales tales como Facebook o Twitter. Cuando el usuario se registra en un servicio con credenciales de una red social, autoriza a la red social a guardar una Cookie persistente que recuerda su identidad y le garantiza acceso a los servicios hasta que expira. El usuario puede borrar esta Cookie y revocar el acceso a los servicios mediante redes sociales actualizando sus preferencias en la red social que específica.  
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        ¿Cómo puedo deshabilitar las cookies en mi navegador? 
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Se pueden configurar los diferentes navegadores para avisar al usuario de la recepción de cookies y, si se desea, impedir su instalación en el equipo. Asimismo, el usuario puede revisar en su navegador qué cookies tiene instaladas y cuál es el plazo de caducidad de las mismas, pudiendo eliminarlas. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Para ampliar esta información consulte las instrucciones y manuales de su navegador: 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Para más información sobre la administración de las cookies en Google Chrome: https://support.google.com/chrome/answer/95647?hl=es 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Para más información sobre la administración de las cookies en Internet Explorer: http://windows.microsoft.com/es-es/windows-vista/cookies-frequently-asked-questions 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Para más información sobre la administración de las cookies en Mozilla Firefox: http://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-we 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Para más información sobre la administración de las cookies en Safari: http://www.apple.com/es/privacy/use-of-cookies/ 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Para más información sobre la administración de las cookies en Opera: http://help.opera.com/Windows/11.50/es-ES/cookies.html 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Si desea dejar de ser seguido por Google Analytics visite: http://tools.google.com/dlpage/gaoptout 
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Para saber más sobre las cookies
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Puede obtener más información sobre la publicidad online basada en el comportamiento y la privacidad online en el siguiente enlace: http://www.youronlinechoices.com/es/ 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6 hidden lg:block">
                        Protección de datos de Google Analytics: http://www.google.com/analytics/learn/privacy.html 
                    </p>

                    <p class="content-info-legal mb-3.5 lg:mb-6 lg:hidden md:hidden">
                        Protección de datos de Google Analytics: http://www.google.com/analytics/<br>learn/privacy.html 
                    </p>

                    <p class="content-info-legal mb-3.5 lg:mb-6 hidden lg:block">
                        Cómo usa Google Analytics las cookies: https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=es#analyticsjs 
                    </p>

                    <p class="content-info-legal mb-3.5 lg:mb-6 lg:hidden md:hidden">
                        Cómo usa Google Analytics las cookies: https://developers.google.com/analytics/<br>devguides/collection/analyticsjs/cookie-usage?hl=es#analyticsjs 
                    </p>

                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Actualizaciones y cambios en la política de privacidad/cookies 
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        CLas webs de pueden modificar esta Política de Cookies en función de exigencias legislativas, reglamentarias, o con la finalidad de adaptar dicha política a las instrucciones dictadas por la Agencia Española de Protección de Datos, por ello se aconseja a los usuarios que la visiten periódicamente. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Cuando se produzcan cambios significativos en esta Política de Cookies, estos se comunicarán a los usuarios bien mediante la web o a través de correo electrónico a los usuarios registrados.
                    </p>
                </div>   
            </template>
            <template v-if="language === 'en'">
                <div class="mt-6">
                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Previous information
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        This website (hereinafter, the "Website") uses cookies to track user interactions with the services offered by the owner of the website, Cityvities S.L. and improve your experience on the website.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Third-party and own cookies are used on this website to ensure that you have a better browsing experience, you can share content on social networks and so that we can obtain user statistics.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        This website does not use any personal information from cookies, it only performs general visitor statistics that do not imply any personal information.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        What are cookies?
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Cookies are a set of data that a server deposits in the user's browser to collect standard Internet registration information and information on the behavior of visitors to a website. In other words, they are small text files that are stored on the device's hard drive and are used to identify the user when they connect to the website again. Its purpose is to record the user's visit and save certain information. Its use is common and frequent on the web as it allows pages to function more efficiently and achieve greater personalization and analysis of user behavior.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        What are cookies for?
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        The cookies used on our website are session and third-party cookies, and allow us to store and access information related to the language, the type of browser used, and other general characteristics predefined by the user, as well as to monitor and analyze the activity that it carries out, in order to introduce improvements and provide our services in a more efficient and personalized way.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Cookies, depending on their permanence, can be divided into session or permanent cookies. Those that expire when the user closes the browser. Those that expire depending on when the objective for which they serve is fulfilled or when they are manually deleted.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        performance cookies
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        This type of Cookie remembers your preferences for the tools found in the services, so you do not have to reconfigure the service each time you visit. By way of example, this typology includes: Volume adjustments of video or sound players. The video transmission speeds that are compatible with your browser. Objects stored in the "shopping cart" in e-commerce services such as stores.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Registration cookies
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Registration cookies are generated once the user has registered or subsequently opened his session, and are used to identify him in the services with the following objectives:
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Keep the user identified in such a way that, if he closes a service, the browser or the computer and at another time or another day re-enters said service, he will continue to be identified, thus facilitating his navigation without having to identify himself again. This functionality can be suppressed if the user presses the [close session] functionality, so that this cookie is deleted and the next time the user enters the service, they will have to log in to be identified.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Check if the user is authorized to access certain services, for example, to participate in a contest.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Additionally, some services may use connectors with social networks such as Facebook or Twitter. When the user registers in a service with credentials from a social network, he authorizes the social network to store a persistent Cookie that remembers his identity and grants him access to the services until it expires. The user can delete this Cookie and revoke access to services through social networks by updating their preferences in the specific social network.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        How can I disable cookies in my browser?
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        The different browsers can be configured to notify the user of the reception of cookies and, if desired, prevent their installation on the computer. Likewise, the user can check in his browser what cookies he has installed and what is their expiration period, being able to eliminate them.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        For further information, consult the instructions and manuals of your browser:
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        For more information about managing cookies in Google Chrome: https://support.google.com/chrome/answer/95647?hl=es
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        For more information about managing cookies in Internet Explorer: http://windows.microsoft.com/es-es/windows-vista/cookies-frequently-asked-questions
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        For more information on the management of cookies in Mozilla Firefox: http://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-we
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        For more information about managing cookies in Safari: http://www.apple.com/es/privacy/use-of-cookies/
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        For more information about managing cookies in Opera: http://help.opera.com/Windows/11.50/es-ES/cookies.html
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        If you want to stop being tracked by Google Analytics visit: http://tools.google.com/dlpage/gaoptout
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        To know more about cookies
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        You can obtain more information about online advertising based on behavior and online privacy at the following link: http://www.youronlinechoices.com/es/
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Google Analytics data protection: http://www.google.com/analytics/learn/privacy.html
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        How Google Analytics uses cookies: https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=es#analyticsjs
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Updates and changes in the privacy policy / cookies
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        The websites of may modify this Cookies Policy based on legislative or regulatory requirements, or in order to adapt said policy to the instructions issued by the Spanish Agency for Data Protection, therefore users are advised to visit it periodically.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        When significant changes occur in this Cookies Policy, these will be communicated to users either through the web or through email to registered users.
                    </p>
                </div>
            </template>
            <template v-else-if="language === 'fr'">
                <div class="mt-6">
                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Informations précédentes
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Ce site Web (ci-après, le "Site Web") utilise des cookies pour suivre les interactions des utilisateurs avec les services offerts par le propriétaire du site Web, Cityvities S.L. et améliorez votre expérience sur le site.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Des cookies tiers et propres sont utilisés sur ce site pour vous garantir une meilleure expérience de navigation, vous permettre de partager du contenu sur les réseaux sociaux et pour que nous puissions obtenir des statistiques d'utilisation.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Ce site Web n'utilise aucune information personnelle provenant de cookies, il effectue uniquement des statistiques générales sur les visiteurs qui n'impliquent aucune information personnelle.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Que sont les cookies ?
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Les cookies sont un ensemble de données qu'un serveur dépose dans le navigateur de l'utilisateur pour collecter des informations d'enregistrement Internet standard et des informations sur le comportement des visiteurs d'un site Web. En d'autres termes, ce sont de petits fichiers texte qui sont stockés sur le disque dur de l'appareil et qui sont utilisés pour identifier l'utilisateur lorsqu'il se connecte à nouveau au site Web. Il a pour but d'enregistrer la visite de l'utilisateur et de sauvegarder certaines informations. Son utilisation est courante et fréquente sur le Web car elle permet aux pages de fonctionner plus efficacement et d'obtenir une plus grande personnalisation et analyse du comportement des utilisateurs.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        A quoi servent les cookies ?
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Les cookies utilisés sur notre site Web sont des cookies de session et de tiers, et nous permettent de stocker et d'accéder à des informations relatives à la langue, au type de navigateur utilisé et à d'autres caractéristiques générales prédéfinies par l'utilisateur, ainsi que de surveiller et d'analyser le activité qu'il exerce, afin d'introduire des améliorations et de fournir nos services de manière plus efficace et personnalisée.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Les cookies, selon leur permanence, peuvent être divisés en cookies de session ou permanents. Ceux qui expirent lorsque l'utilisateur ferme le navigateur. Ceux qui expirent en fonction du moment où l'objectif pour lequel ils servent est atteint ou lorsqu'ils sont supprimés manuellement.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        cookies de performance
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Ce type de cookie mémorise vos préférences pour les outils trouvés dans les services, vous n'avez donc pas à reconfigurer le service à chaque visite. A titre d'exemple, cette typologie comprend : Les réglages de volume des lecteurs vidéo ou son. Les vitesses de transmission vidéo compatibles avec votre navigateur. Objets stockés dans le "panier" dans les services de commerce électronique tels que les magasins.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Cookies d'enregistrement
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Les cookies d'enregistrement sont générés une fois que l'utilisateur s'est enregistré ou a ensuite ouvert sa session, et sont utilisés pour l'identifier dans les services avec les objectifs suivants :
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Maintenir l'utilisateur identifié de manière à ce que, s'il ferme un service, le navigateur ou l'ordinateur et à un autre moment ou un autre jour entre à nouveau dans ledit service, il continuera à être identifié, facilitant ainsi sa navigation sans avoir à s'identifier encore. Cette fonctionnalité peut être supprimée si l'utilisateur appuie sur la fonctionnalité [fermer la session], de sorte que ce cookie est supprimé et la prochaine fois que l'utilisateur entrera dans le service, il devra se connecter pour être identifié.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Vérifiez si l'utilisateur est autorisé à accéder à certains services, par exemple pour participer à un concours.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        De plus, certains services peuvent utiliser des connecteurs avec des réseaux sociaux tels que Facebook ou Twitter. Lorsque l'utilisateur s'inscrit à un service avec des informations d'identification d'un réseau social, il autorise le réseau social à enregistrer un cookie persistant qui mémorise son identité et lui donne accès aux services jusqu'à son expiration. L'utilisateur peut supprimer ce cookie et révoquer l'accès aux services via les réseaux sociaux en mettant à jour ses préférences dans le réseau social spécifique.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Comment puis-je désactiver les cookies dans mon navigateur ?
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Les différents navigateurs peuvent être configurés pour avertir l'utilisateur de la réception de cookies et, s'il le souhaite, empêcher leur installation sur l'ordinateur. De même, l'utilisateur peut vérifier dans son navigateur quels cookies il a installés et quelle est leur durée d'expiration, en pouvant les éliminer.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Pour plus d'informations, consultez les instructions et les manuels de votre navigateur :
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Pour plus d'informations sur la gestion des cookies dans Google Chrome : https://support.google.com/chrome/answer/95647?hl=es
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Pour plus d'informations sur la gestion des cookies dans Internet Explorer : http://windows.microsoft.com/es-es/windows-vista/cookies-frequently-asked-questions
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Pour plus d'informations sur la gestion des cookies dans Mozilla Firefox : http://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-que-los-sitios-we
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Pour plus d'informations sur la gestion des cookies dans Safari : http://www.apple.com/es/privacy/use-of-cookies/
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Pour plus d'informations sur la gestion des cookies dans Opera : http://help.opera.com/Windows/11.50/es-ES/cookies.html
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Si vous souhaitez ne plus être suivi par Google Analytics, visitez : http://tools.google.com/dlpage/gaoptout
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        En savoir plus sur les cookies
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Vous pouvez obtenir plus d'informations sur la publicité en ligne basée sur le comportement et la confidentialité en ligne sur le lien suivant : http://www.youronlinechoices.com/es/
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Protection des données Google Analytics : http://www.google.com/analytics/learn/privacy.html
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Comment Google Analytics utilise les cookies : https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=es#analyticsjs
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Mises à jour et modifications de la politique de confidentialité / cookies
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Les sites Web de peuvent modifier cette politique de cookies en fonction d'exigences législatives ou réglementaires, ou afin d'adapter ladite politique aux instructions émises par l'Agence espagnole de protection des données, il est donc conseillé aux utilisateurs de la visiter périodiquement.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Lorsque des modifications importantes se produisent dans cette politique de cookies, celles-ci seront communiquées aux utilisateurs soit via le Web, soit par e-mail aux utilisateurs enregistrés.
                    </p>
                </div>
            </template>
        </div>
    </div>
</template>
<script setup>
    import { ref } from 'vue'
    const language = ref(localStorage.getItem('locale') || 'es');
</script>
<style scoped>
    .sub-title-info-legal {
        font-weight: 500;
        font-size: 22px;
        line-height: 110%;
    }
    .content-info-legal {
        font-size: 14px;
        line-height: 150%;
    }

</style>