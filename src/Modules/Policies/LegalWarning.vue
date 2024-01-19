<template>
    <div class="container-fluid-landing pt-14">
        <div class="titulo px-2.5 lg:px-0">
            <h1 class="text-center font-medium text-[40px] leading-[150%]">
                <template v-if="language == 'es'">
                    AVISO LEGAL
                </template>
                <template v-if="language == 'en'">
                    LEGAL WARNING
                </template>
                <template v-else-if="language == 'fr'">
                    AVIS JURIDIQUE
                </template>
            </h1>
        </div>    
        <div class="parrafo px-2.5 lg:px-0">
            <template v-if="language == 'es'">
                <div class=" mt-6">
                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Identificación
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                         Cityvities S.L. (en adelante, “TheHoster”), provisto con NIF/CIF B16895708, con domicilio 
                        social en la Avenida de la Buhaira 17, Portal 2, 2ºA. C.P. 41018 Municipio: Sevilla, Sevilla. 
                        España, no puede asumir ninguna responsabilidad derivada del uso incorrecto, inapropiado o ilícito 
                        de la información aparecida en la página de Internet de https://thehoster.io/ (en adelante, 
                        el “Sitio Web”). Email: info@thehoster.com 
                    </p>
                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Propiedad intelectual e industrial
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Los textos, imágenes, sonidos, animaciones, software y el resto de contenidos incluidos en este 
                        Sitio Web son propiedad exclusiva de TheHoster o sus licenciantes. Cualquier acto de transmisión, 
                        distribución, cesión, reproducción, almacenamiento o comunicación pública total o parcial, debe 
                        contar con el consentimiento expreso de TheHoster. 
                    </p>

                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Enlaces a Webs de terceros
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        La página de Internet de TheHoster puede contener enlaces (links) a otras páginas de terceras partes
                        que TheHoster no puede controlar. Por lo tanto,  TheHoster no puede asumir responsabilidades por el 
                        contenido que pueda aparecer en páginas de terceros. 
                    </p>
                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Condiciones de uso
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        El acceso a este sitio Web implica la aceptación de estas condiciones de uso sin reservas que 
                        regulan el acceso y la utilización del mismo con el fin de poner a disposición de los usuarios 
                        información sobre nuestros productos.  
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Se prohíbe expresamente la utilización de los contenidos de este sitio Web para su
                        utilización con fines comerciales o para su distribución, transformación o 
                        comunicación. TheHoster, no responderá de ninguna consecuencia, daño o perjuicio 
                        que pudieran derivarse de dicha utilización o uso de la información. 
                        Tanto el acceso a esta Web como el uso que pueda hacerse de la información 
                        contenida en la misma es de la exclusiva responsabilidad de quien lo realiza. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        El usuario se obliga a no utilizar la información que se publica en esta Web con 
                        fines o efectos ilícitos o lesivos, a no dañar o inutilizar la información y a no 
                        realizar cualquier otra acción que puedan ser contraria al contenido de este Aviso 
                        Legal. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster podrá suspender temporalmente y sin previo aviso, la accesibilidad al Sitio Web 
                        con motivo de operaciones de mantenimiento, reparación, actualización o mejora. No obstante, 
                        siempre que las circunstancias lo permitan, TheHoster comunicará al Usuario, con antelación 
                        suficiente, la fecha prevista para la suspensión de los Servicios
                    </p>
                </div> 
            </template>
            <template v-if="language == 'en'">
                <div class=" mt-6">
                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        ID
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                         Cityvities S.L. (hereinafter, "TheHoster"), provided with NIF/CIF B16895708, with address
                        social at Avenida de la Buhaira 17, Portal 2, 2ºA. C.P. 41018 Municipality: Seville, Seville.
                        Spain, cannot assume any responsibility derived from the incorrect, inappropriate or illegal use
                        of the information appearing on the Internet page of https://thehoster.io/ (hereinafter,
                        the website"). Email: info@thehoster.com
                    </p>
                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Intellectual and industrial property
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        The texts, images, sounds, animations, software and other content included in this
                        Website are the exclusive property of TheHoster or its licensors. Any act of transmission,
                        distribution, assignment, reproduction, storage or total or partial public communication, must
                        have the express consent of TheHoster.
                    </p>

                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Links to third party websites
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        The website of TheHoster may contain links (links) to other pages of third parties
                        that TheHoster cannot control. Therefore, TheHoster cannot assume responsibility for the
                        content that may appear on third-party pages.
                    </p>
                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Terms of use
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Access to this website implies acceptance of these conditions of use without reservations that
                        regulate access and use thereof in order to make available to users
                        information about our products.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        The use of the contents of this website for your personal use is expressly prohibited.
                        use for commercial purposes or for its distribution, transformation or
                        communication. TheHoster will not be liable for any consequence, damage or harm
                        that may arise from said use or use of the information.
                        Both access to this website and the use that may be made of the information
                        contained therein is the sole responsibility of the person who performs it.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        The user undertakes not to use the information published on this website with
                        illicit or harmful purposes or effects, not to damage or disable the information and not to
                        perform any other action that may be contrary to the content of this Notice
                        Legal.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster may temporarily suspend access to the Website without prior notice.
                        due to maintenance, repair, update or improvement operations. Nevertheless,
                        provided that the circumstances allow it, TheHoster will notify the User, in advance
                        enough, the expected date for the suspension of the Services
                    </p>
                </div>
            </template>
            <template v-else-if="language == 'fr'">
                <div class=" mt-6">
                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        IDENTIFIANT
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                         Cityvities S.L. (ci-après, "TheHoster"), muni du NIF/CIF B16895708, avec adresse
                        social à Avenida de la Buhaira 17, Portail 2, 2ºA. CP 41018 Municipalité : Séville, Séville.
                        Espagne, ne peut assumer aucune responsabilité dérivée de l'utilisation incorrecte, inappropriée ou illégale
                        des informations figurant sur la page Internet de https://thehoster.io/ (ci-après,
                        le site Web"). Courriel : info@thehoster.com
                    </p>
                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Propriété intellectuelle et industrielle
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Les textes, images, sons, animations, logiciels et autres contenus inclus dans ce
                        Le site Web est la propriété exclusive de TheHoster ou de ses concédants. Tout acte de transmission,
                        distribution, cession, reproduction, stockage ou communication publique totale ou partielle, doit
                        avoir le consentement exprès de TheHoster.
                    </p>

                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Liens vers des sites Web tiers
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Le site Web de TheHoster peut contenir des liens (liens) vers d'autres pages de tiers
                        que TheHoster ne peut pas contrôler. Par conséquent, TheHoster ne peut assumer la responsabilité de
                        contenu pouvant apparaître sur des pages tierces.
                    </p>
                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Condition d'utilisation
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        L'accès à ce site implique l'acceptation sans réserve des présentes conditions d'utilisation qui
                        en réglementer l'accès et l'utilisation afin de mettre à la disposition des utilisateurs
                        informations sur nos produits.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        L'utilisation du contenu de ce site Web pour votre usage personnel est expressément interdite.
                        utilisation à des fins commerciales ou pour sa distribution, transformation ou
                        la communication. TheHoster ne sera pas responsable de toute conséquence, dommage ou préjudice
                        qui peuvent découler de ladite utilisation ou de l'utilisation des informations.
                        Tant l'accès à ce site que l'utilisation qui peut être faite des informations
                        qui y sont contenues relève de la seule responsabilité de celui qui l'exécute.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        L'utilisateur s'engage à ne pas utiliser les informations publiées sur ce site avec
                        à des fins ou effets illicites ou nuisibles, à ne pas endommager ou désactiver les informations et à ne pas
                        effectuer toute autre action qui pourrait être contraire au contenu de cet avis
                        Juridique.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster peut suspendre temporairement l'accès au Site sans préavis.
                        du fait d'opérations de maintenance, de réparation, de mise à jour ou d'amélioration. Cependant,
                        sous réserve que les circonstances le permettent, TheHoster informera l'Utilisateur, au préalable
                        assez, la date prévue pour la suspension des Services
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