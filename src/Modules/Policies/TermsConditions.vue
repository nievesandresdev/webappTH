<template>
    <div class="container-fluid-landing pt-14">
        <div class="titulo px-2.5 lg:px-0">
            <h1 class="text-center font-medium text-[40px] leading-[150%]">
                <template v-if="language == 'es'">
                    TÉRMINOS Y CONDICIONES
                </template>
                <template v-if="language == 'en'">
                    TERMS AND CONDITIONS
                </template>
                <template v-else-if="language == 'fr'">
                    TERMES ET CONDITIONS
                </template>
            </h1>
        </div>    
        <div class="parrafo px-2.5 lg:px-0">  
            <template v-if="language == 'es'">
                <div class="mt-6">
                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Información Previa 
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster, titular del sitio web https://thehoster.io/ , en adelante el “Sitio Web”, es una empresa que se dedica a la comercialización de servicios de carácter turístico online además de la facilitación de información turística sobre los destinos en los que la empresa está presente.  
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Los datos de TheHoster son los siguientes: 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Nombre: Cityvities S.L. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Domicilio fiscal: Avenida de la Buhaira 17, Portal 2, 2ºA. C.P. 41018 Municipio: Sevilla, Sevilla. España. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Número de teléfono: +34624609935 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        CIF: B16895708  
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Objeto del Sitio Web 
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster ha desarrollado el presente Sitio Web para ofrecer al Usuario un servicio de reserva de actividades y experiencias en diferentes países del mundo en los que se encuentra presente actualmente. Además proporciona un servicio único de información Turística sobre los destinos en los que se encuentra presente. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster le informa que las actividades y experiencias ofertadas en el sitio web  son servicios proporcionados directamente por empresas terceras ajenas que funcionan como  colaboradoras de TheHoster (en adelante, el/los Proveedor/es). Por lo tanto, TheHoster SE LIMITA EXCLUSIVAMENTE A OFRECER A TRAVÉS DEL SITIO WEB UN SERVICIO DE RESERVA DE ACTIVIDADES EN DIFERENTES LUGARES DEL MUNDO, LOS CUALES SON EJECUTADOS DIRECTAMENTE POR LOS PROVEEDORES. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Asimismo, a través del Sitio Web, TheHoster facilita a sus usuarios información gratuita de diferentes destinos, que incluye fotografías, información sobre transporte, puntos turísticos más importantes, mapas y recomendaciones sobre esos destinos. El acceso y consulta de la mencionada información turística gratuita solo podrá realizarse online y su comercialización está prohibida, aceptando el Usuario este extremo y responsabilizándose de su uso indebido y no autorizado. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        La información mostrada por TheHoster a través de su Sitio Web para la prestación de los servicios está basada siempre en la información proporcionada por los Proveedores en las que se basa en todo caso la oferta que aparece en el Sitio Web. 
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Compra en el Sitio Web
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Para poder realizar las reservas a través del Sitio Web, el cliente tendrá que facilitar sus datos personales (nombre, apellidos, e-mail, teléfono y móvil), o en su caso los datos de la persona en nombre de la cual se reserva la actividad. Este proceso se llevará a cabo una vez que el cliente seleccione la experiencia que desea adquirir y el número de personas para las que desea hacerlo. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        En virtud de estas Condiciones Generales de Uso, los clientes declaran facilitar datos verídicos, exactos, actuales y completos sobre su identidad, o en su caso sobre la persona en nombre de la cual se reserva la actividad . En este sentido, los clientes serán responsables de la exactitud de los datos facilitados a TheHoster y de cualquier consecuencia que se pudiera derivar de los errores en la información proporcionada. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Se entenderá que la compra de un servicio queda formalizada una vez que se haya completado con éxito el proceso de reserva de la actividad y se haya procesado correctamente el pago de la misma con el consiguiente email de confirmación. Tanto el pago como la posterior confirmación se producen de forma inmediata si el proceso se ha realizado correctamente.  
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Política de Cancelación y Devolución 
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Ademas de los derechos del Usuario reconocidos en materia de cancelaciones de servicios de viajes combinados a los que le sea de aplicación lo establecido en el Real Decreto Legislativo 1/2007, de 16 de noviembre, por el que se aprueba el texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios y otras leyes complementarias, cada uno de los servicios ofertados por TheHoster en el Sitio Web cuenta con una política de cancelaciones específica, que el Usuario podrá consultar en la ficha de descripción de la actividad en el mismo Sitio Web , así como en el email de confirmación que se le envíe una vez haya realizado el proceso de compra de manera satisfactoria . 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Por lo tanto, a cada servicio le serán aplicables sus condiciones específicas de cancelación, las cuales establecerán el plazo de cancelación y si hay algún tipo de penalización o no. De forma general existen dos plazos de cancelación para todas las actividades, la elección de una u otra depende del proveedor y estará debidamente señalada en la descripción de la actividad. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        24 horas antes de que tenga lugar la actividad y que dan derecho al reembolso completo del precio pagado. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        72 horas antes de que tenga lugar la actividad que dan derecho también al reembolso completo de lo pagado. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        En definitiva, TheHoster gestionará las cancelaciones conforme lo dispuesto en la política de cancelación de cada actividad. 
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Exclusión de Responsabilidad 
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        De forma general y sin perjuicio de lo enunciado en las leyes aplicables, TheHoster no se hace responsable de los siguientes casos: 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Cancelaciones extemporáneas por parte de los clientes de las actividades contratadas. En ningún caso será exigible la devolución del importe pagado a los clientes que hayan cancelado la actividad fuera del plazo determinado para la misma. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster no será responsable de la pérdida total o parcial de la actividad generadas como consecuencia de falta de puntualidad del cliente o de no encontrarse este en el punto de encuentro indicado para el comienzo de la misma. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        De los robos o daños que puedan afectar al cliente y a los bienes de su titularidad mientras que se lleva a cabo la actividad. Asimismo, TheHoster no se hará responsable de los daños o lesiones que el cliente pueda sufrir durante la actividad o la prestación del servicio contratado y tampoco de los que se produzcan antes del comienzo de la actividad y que tengan como resultado la no asistencia a esta por parte del cliente. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Los fallos en el Sitio Web como resultado de casos de fuerza mayor o de los actos de terceros.  
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Propiedad Intelectual 
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Todos los derechos sobre el contenido, diseño y código de este Sitio Web y, en especial sobre las imágenes, textos, logotipos, diseños, marcas, nombres comerciales, datos que se incluyen en el Sitio Web y cualesquiera otros derechos de propiedad intelectual e industrial son titularidad de TheHoster, o bien de terceros que han autorizado expresamente a TheHoster para la utilización de los mismos en el Sitio Web.
                    </p>
                </div>
            </template>
            <template v-if="language == 'en'">
                <div class="mt-6">
                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Previous information
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster, owner of the website https://thehoster.io/, hereinafter the "Website", is a company dedicated to the marketing of online tourist services in addition to the provision of tourist information on the destinations in which the company is present.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster data is as follows:
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Name: Cityvities S.L.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Fiscal address: Avenida de la Buhaira 17, Portal 2, 2ºA. C.P. 41018 Municipality: Seville, Seville. Spain.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Phone number: +34624609935
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        CIF: B16895708
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Object of the Website
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster has developed this Website to offer the User a reservation service for activities and experiences in different countries of the world in which it is currently present. It also provides a unique tourist information service on the destinations in which it is present.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster informs you that the activities and experiences offered on the website are services provided directly by third-party companies that work as collaborators of TheHoster (hereinafter, the Provider(s). Therefore, TheHoster IS EXCLUSIVELY LIMITED TO OFFERING THROUGH THE WEBSITE A RESERVATION SERVICE FOR ACTIVITIES IN DIFFERENT PLACES IN THE WORLD, WHICH ARE EXECUTED DIRECTLY BY THE PROVIDERS.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Likewise, through the Website, TheHoster provides its users with free information on different destinations, including photographs, information on transportation, the most important tourist spots, maps and recommendations on those destinations. The access and consultation of the aforementioned free tourist information can only be done online and its commercialization is prohibited, the User accepting this end and being responsible for its improper and unauthorized use.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        The information displayed by TheHoster through its Website for the provision of services is always based on the information provided by the Providers on which the offer that appears on the Website is based in any case.
                    </p>

                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Purchase on the Website
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        In order to make reservations through the Website, the client will have to provide their personal data (name, surnames, e-mail, telephone and mobile), or, where appropriate, the data of the person on whose behalf the booking is made. exercise. This process will be carried out once the client selects the experience they want to acquire and the number of people they want to do it for.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        By virtue of these General Conditions of Use, clients declare to provide true, exact, current and complete information about their identity, or, where appropriate, about the person on whose behalf the activity is reserved. In this sense, customers will be responsible for the accuracy of the data provided to TheHoster and for any consequence that may arise from errors in the information provided.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        It will be understood that the purchase of a service is formalized once the reservation process for the activity has been successfully completed and payment has been correctly processed with the subsequent confirmation email. Both the payment and the subsequent confirmation occur immediately if the process has been carried out correctly.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Cancellation and Refund Policy
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        In addition to the rights of the User recognized in terms of cancellations of combined travel services to which the provisions of Royal Legislative Decree 1/2007, of November 16, which approves the consolidated text of the Law General for the Defense of Consumers and Users and other complementary laws, each of the services offered by TheHoster on the Website has a specific cancellation policy, which the User may consult in the activity description sheet on the same. Website, as well as in the confirmation email that is sent to you once you have completed the purchase process satisfactorily.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Therefore, each service will be subject to its specific cancellation conditions, which will establish the cancellation period and whether there is any type of penalty or not. In general, there are two cancellation periods for all activities, the choice of one or the other depends on the provider and will be duly indicated in the description of the activity.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        24 hours before the activity takes place and that entitles you to a full refund of the price paid.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        72 hours before the activity takes place, which also entitles you to a full refund of the amount paid.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Ultimately, TheHoster will manage cancellations in accordance with the provisions of the cancellation policy for each activity.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Exclusion of Liability
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        In general and without prejudice to what is stated in the applicable laws, TheHoster is not responsible for the following cases:
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Untimely cancellations by clients of contracted activities. In no case will the refund of the amount paid be required from customers who have canceled the activity outside the period determined for it.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster will not be responsible for the total or partial loss of the activity generated as a result of the client's lack of punctuality or not being at the meeting point indicated for the start of the activity.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Theft or damage that may affect the client and the property owned by him while the activity is carried out. Likewise, TheHoster will not be responsible for the damages or injuries that the client may suffer during the activity or the provision of the contracted service, nor for those that occur before the start of the activity and that result in the non-attendance of the activity by part of the client.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Failures on the Website as a result of force majeure or the acts of third parties.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Intellectual property
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        All rights over the content, design and code of this Website and, especially over the images, texts, logos, designs, trademarks, trade names, data included in the Website and any other intellectual and industrial property rights are owned by TheHoster, or by third parties that have expressly authorized TheHoster to use them on the Website.
                    </p>
                </div>
            </template>
            <template v-else-if="language == 'fr'">
                <div class="mt-6">
                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Informations précédentes
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster, titular del sitio web https://thehoster.io/ , en adelante el “Sitio Web”, es una empresa que se dedica a la comercialización de servicios de carácter turístico online además de la facilitación de información turística sobre los destinos en los que la empresa il est présent.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Les données TheHoster sont les suivantes :
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Nom : Cityvities S.L.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Adresse fiscale : Avenida de la Buhaira 17, Portal 2, 2ºA. CP 41018 Municipalité : Séville, Séville. Espagne.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Numéro de téléphone : +34624609935
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        CIF : B16895708
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Objet du Site
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster a développé ce site Web pour offrir à l'utilisateur un service de réservation d'activités et d'expériences dans différents pays du monde dans lesquels il est actuellement présent. Elle offre également un service d'information touristique unique sur les destinations où elle est présente.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster vous informe que les activités et expériences proposées sur le site sont des services fournis directement par des sociétés tierces qui travaillent en tant que collaborateurs de TheHoster (ci-après, le(s) Prestataire(s). Par conséquent, TheHoster SE LIMITE EXCLUSIVEMENT À OFFRIR VIA LE SITE WEB UN SERVICE DE RÉSERVATION D'ACTIVITÉS DANS DIFFÉRENTS LIEUX DU MONDE, QUI SONT EXÉCUTÉS DIRECTEMENT PAR LES PRESTATAIRES.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        De même, via le site Web, TheHoster fournit à ses utilisateurs des informations gratuites sur différentes destinations, y compris des photographies, des informations sur les transports, les sites touristiques les plus importants, des cartes et des recommandations sur ces destinations. L'accès et la consultation desdites informations touristiques gratuites ne peuvent se faire qu'en ligne et leur commercialisation est interdite, l'Utilisateur acceptant cette fin et étant responsable de son utilisation abusive et non autorisée.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Les informations affichées par TheHoster via son site Web pour la fourniture de services sont toujours basées sur les informations fournies par les fournisseurs sur lesquels l'offre qui apparaît sur le site Web est basée dans tous les cas.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Acheter sur le Site
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Pour effectuer des réservations via le Site Web, le client devra fournir ses données personnelles (nom, prénoms, e-mail, téléphone et mobile), ou, le cas échéant, les données de la personne au nom de laquelle la réservation est effectuée. exercer. Ce processus sera effectué une fois que le client aura sélectionné l'expérience qu'il souhaite acquérir et le nombre de personnes pour lesquelles il souhaite le faire.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        En vertu des présentes Conditions Générales d'Utilisation, le client déclare fournir des informations vraies, exactes, à jour et complètes sur son identité ou, le cas échéant, sur la personne pour le compte de laquelle l'activité est réservée. En ce sens, les clients seront responsables de l'exactitude des données fournies à TheHoster et de toute conséquence pouvant découler d'erreurs dans les informations fournies.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Il sera entendu que l'achat d'un service est formalisé une fois que le processus de réservation de l'activité a été complété avec succès et que le paiement a été correctement traité avec l'e-mail de confirmation ultérieur. Le paiement et la confirmation ultérieure se produisent immédiatement si le processus a été effectué correctement.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Politique d'annulation et de remboursement
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        En plus des droits de l'Utilisateur reconnus en termes d'annulations de services de voyage combinés auxquels les dispositions du décret législatif royal 1/2007, du 16 novembre, qui approuve le texte consolidé de la loi générale pour la défense des consommateurs et des utilisateurs et autres lois complémentaires, chacun des services proposés par TheHoster sur le Site dispose d'une politique d'annulation spécifique, que l'Utilisateur peut consulter dans la fiche descriptive de l'activité sur le même Site, ainsi que dans l'e-mail de confirmation qui vous est envoyé une fois que vous avoir terminé le processus d'achat de manière satisfaisante.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Par conséquent, chaque service sera soumis à ses conditions d'annulation spécifiques, qui établiront la période d'annulation et s'il y a ou non un type de pénalité. En général, il existe deux délais d'annulation pour toutes les activités, le choix de l'un ou l'autre dépend du prestataire et sera dûment indiqué dans le descriptif de l'activité.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        24 heures avant le début de l'activité et cela vous donne droit à un remboursement complet du prix payé.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        72 heures avant le début de l'activité, ce qui vous donne également droit à un remboursement complet du montant payé.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        En définitive, TheHoster gérera les annulations conformément aux dispositions de la politique d'annulation de chaque activité.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Exclusion de responsabilité
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        De manière générale et sans préjudice de ce qui est stipulé dans les lois applicables, TheHoster n'est pas responsable des cas suivants :
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Annulations intempestives par les clients des activités contractées. En aucun cas, le remboursement du montant payé ne sera exigé des clients qui ont annulé l'activité en dehors de la période déterminée pour celle-ci.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster ne sera pas responsable de la perte totale ou partielle de l'activité générée du fait du manque de ponctualité du client ou de son absence au point de rendez-vous indiqué pour le début de l'activité.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Vols ou dommages pouvant affecter le client et ses biens pendant le déroulement de l'activité. De même, TheHoster ne sera pas responsable des dommages ou blessures que le client pourrait subir pendant l'activité ou la prestation du service contracté, ni de ceux qui se produisent avant le début de l'activité et qui entraînent la non-participation à l'activité. par une partie du client.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Défaillances sur le site Web dues à un cas de force majeure ou aux actes de tiers.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Propriété intellectuelle
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Tous les droits sur le contenu, la conception et le code de ce site Web et, en particulier sur les images, les textes, les logos, les dessins, les marques, les noms commerciaux, les données incluses dans le site Web et tout autre droit de propriété intellectuelle et industrielle sont la propriété de TheHoster, ou de des tiers ayant expressément autorisé TheHoster à les utiliser sur le Site.
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