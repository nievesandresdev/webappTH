<template>
    <div class="container-fluid-landing pt-14">
        <div class="titulo px-2.5 lg:px-0">
            <h1 class="text-center font-medium text-[40px] leading-[150%]">
                <template v-if="language == 'es'">
                    POLÍTICA DE PRIVACIDAD
                </template>
                <template v-if="language == 'en'">
                    PRIVACY POLICY
                </template>
                <template v-else-if="language == 'fr'">
                    POLITIQUE DE CONFIDENTIALITÉ
                </template>
            </h1>
        </div>    
        <div class="parrafo px-2.5 lg:px-0">
            <template v-if="language == 'es'">
                <div class="mt-6">
                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Protección de datos de carácter personal según la LOPD
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                         Cityvities S.L. (en adelante “TheHoster”), en aplicación de la normativa vigente 
                        en materia de protección de datos de carácter personal, informa que los datos 
                        personales que se recogen a través de los formularios del Sitio web: 
                        https://thehoster.io/ (en adelante “Sitio Web”), se incluyen en los ficheros 
                        automatizados específicos de usuarios de los servicios de TheHoster.  
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        La recogida y tratamiento automatizado de los datos de carácter personal tiene como finalidad el 
                        mantenimiento de la relación comercial y el desempeño de tareas de información, formación, 
                        asesoramiento y otras actividades propias de TheHoster.   
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Estos datos únicamente serán cedidos a aquellas entidades que sean necesarias con el único 
                        objetivo de dar cumplimiento a la finalidad anteriormente expuesta.    
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster adopta las medidas necesarias para garantizar la seguridad, integridad y 
                        confidencialidad de los datos conforme a lo dispuesto en el Reglamento (UE) 
                        2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a 
                        la protección de las personas físicas en lo que respecta al tratamiento de datos 
                        personales y a la libre circulación de los mismos.    
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        El usuario podrá en cualquier momento ejercitar los derechos de acceso, oposición, 
                        rectificación y cancelación reconocidos en el citado Reglamento (UE). El ejercicio 
                        de estos derechos puede realizarlo el propio usuario a través de email a: 
                        info@thehoster.com 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        El usuario manifiesta que todos los datos facilitados por él son ciertos y 
                        correctos, y se compromete a mantenerlos actualizados, comunicando los cambios a 
                        TheHoster.     
                    </p>
                    

                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Finalidad del tratamiento de los datos personales:
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        En TheHoster, trataremos tus datos personales recabados a través del Sitio Web, con 
                        las siguientes finalidades:  
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        1. En caso de contratación de los bienes y servicios ofertados a través del Sitio Web 
                        para mantener la relación contractual, así como la gestión, administración, información, 
                        prestación y mejora del servicio.   
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        2. Envío de información solicitada a través de los formularios dispuestos en el Sitio Web.   
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        3. Remitir boletines (newsletters), así como comunicaciones comerciales de promociones y/o 
                        publicidad de TheHoster y del sector.   
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Te recordamos que puedes oponerte al envío de comunicaciones comerciales por cualquier vía y 
                        en cualquier momento, remitiendo un correo electrónico a la dirección indicada anteriormente.   
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        ¿Por cuánto tiempo se conservan los datos personales recabados?
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Los datos proporcionados se conservarán por TheHoster y sus proveedores mientras se mantenga 
                        la relación comercial o durante el tiempo necesario para cumplir con las obligaciones legales 
                        y atender las posibles responsabilidades que pudieran derivar del cumplimiento de 
                        la finalidad para la que los datos fueron recabados.   
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6 font-semibold">
                        Legitimación:   
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        El tratamiento de tus datos se realiza con las siguientes bases jurídicas que 
                        legitiman el mismo:
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        1. La solicitud de información y/o la contratación de los servicios de TheHoster, cuyos términos y condiciones se pondrán a tu disposición en todo caso, de forma previa a una eventual contratación.   
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        2. El consentimiento libre, específico, informado e inequívoco, en tanto que te informamos poniendo a tu disposición la presente política de privacidad, que, tras la lectura de la misma, en caso de estar conforme, puedes aceptar mediante una declaración o una clara acción afirmativa, como el marcado de una casilla dispuesta al efecto.    
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        En caso de que no nos facilites tus datos o lo hagas de forma errónea o incompleta, no podremos atender tu solicitud, resultando del todo imposible proporcionarte la información solicitada o llevar a cabo la contratación de los servicios. 
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Comunicación de datos a terceros: 
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Para la necesaria prestación de los servicios contratados, aceptas que TheHoster, en calidad de intermediario, comunique tus datos de carácter personal a terceras empresas, incluidos los de otras personas en nombre de las cuales hayas realizado la reserva. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Nuestros proveedores solo recopilarán, usarán y divulgarán tu información en la medida que sea necesaria para que les permita desempeñar los servicios que nos proveen hasta finalizar la relación comercial. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Estos proveedores tienen suscrito con TheHoster los contratos de cesión y tratamiento de datos exigidos por la normativa vigente, aplicando las garantías y salvaguardas necesarias para preservar la privacidad de tus datos. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Una vez que abandonas el sitio web de nuestra tienda o te rediriges a un sitio o aplicación de terceros, ya no estás siendo regulados por la presente Política de Privacidad o los Términos de Servicio de nuestra página web. 
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Datos recopilados por usuarios de los servicios 
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        En los casos en que el usuario incluya ficheros con datos de carácter personal en los servidores de alojamiento compartido, TheHoster no se hace responsable del incumplimiento por parte del usuario del RGPD. 
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Retención de datos en conformidad a la LSSI
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster informa de que, como prestador de servicio de alojamiento de datos y en virtud de lo establecido en la Ley 34/2002 de 11 de julio de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI), retiene por un periodo máximo de 12 meses la información imprescindible para identificar el origen de los datos alojados y el momento en que se inició la prestación del servicio. La retención de estos datos no afecta al secreto de las comunicaciones y sólo podrán ser utilizados en el marco de una investigación criminal o para la salvaguardia de la seguridad pública, poniéndose a disposición de los jueces y/o tribunales o del Ministerio que así los requiera. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        La comunicación de datos a las Fuerzas y Cuerpos del Estado se hará en virtud a lo dispuesto en la normativa sobre protección de datos personales.                    
                    </p>

                    
                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Derechos propiedad intelectual de TheHoster
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster es titular de todos los derechos de autor, propiedad intelectual, industrial, "know how" y cuantos otros derechos guardan relación con los contenidos del Sitio Web y los servicios ofertados en el mismo, así como de los programas necesarios para su implementación y la información relacionada. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        No se permite la reproducción, publicación y/o uso no estrictamente privado de los contenidos, totales o parciales, del Sitio Web sin el consentimiento previo y por escrito. 
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Propiedad intelectual del software
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        El usuario debe respetar los programas de terceros puestos a su disposición por TheHoster, aun siendo gratuitos y/o de disposición pública. TheHoster dispone de los derechos de explotación y propiedad intelectual necesarios del software. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        El usuario no adquiere derecho alguno o licencia por el servicio contratado, sobre el software necesario para la prestación del servicio, ni tampoco sobre la información técnica de seguimiento del servicio, excepción hecha de los derechos y licencias necesarios para el cumplimiento de los servicios contratados y únicamente durante la duración de los mismos. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Para toda actuación que exceda del cumplimiento del contrato, el usuario necesitará autorización por escrito por parte de TheHoster, quedando prohibido al usuario acceder, modificar, visualizar la configuración, estructura y ficheros de los servidores propiedad de TheHoster, asumiendo la responsabilidad civil y penal derivada de cualquier incidencia que se pudiera producir en los servidores y sistemas de seguridad como consecuencia directa de una actuación negligente o maliciosa por su parte. 
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Propiedad intelectual de los contenidos alojados 
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Se prohíbe el uso contrario a la legislación sobre propiedad intelectual de los servicios prestados por TheHoster y, en particular de: 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        • La utilización que resulte contraria a las leyes españolas o que infrinja los derechos de terceros. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        • La publicación o la transmisión de cualquier contenido que, a juicio de TheHoster, resulte violento, obsceno, abusivo, ilegal, racial, xenófobo o difamatorio. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        • Los cracks, números de serie de programas o cualquier otro contenido que vulnere derechos de la propiedad intelectual de terceros. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        • La recogida y/o utilización de datos personales de otros usuarios sin su consentimiento expreso o contraviniendo lo dispuesto en Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de los mismos. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        • La utilización del servidor de correo del dominio y de las direcciones de correo electrónico para el envío de correo masivo no deseado. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        El usuario es responsable respecto a las leyes y reglamentos en vigor y las reglas que tienen que ver con el funcionamiento del servicio online, comercio electrónico, derechos de autor, mantenimiento del orden público, así como principios universales de uso de Internet. 
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Protección de la información alojada 
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster realiza copias de seguridad de los contenidos alojados en sus servidores, sin embargo, no se responsabiliza de la pérdida o el borrado accidental de los datos por parte de los usuarios. De igual manera, no garantiza la reposición total de los datos borrados por los usuarios, ya que los citados datos podrían haber sido suprimidos y/o modificados durante el periodo del tiempo transcurrido desde la última copia de seguridad. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Los servicios ofertados, excepto los servicios específicos de backup, no incluyen la reposición de los contenidos conservados en las copias de seguridad realizadas por TheHoster, cuando esta pérdida sea imputable al usuario; en este caso, se determinará una tarifa acorde a la complejidad y volumen de la recuperación, siempre previa aceptación del usuario. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        La reposición de datos borrados sólo está incluida en el precio del servicio cuando la pérdida del contenido sea debida a causas atribuibles a TheHoster. 
                    </p>

                    
                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Comunicaciones comerciales 
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        En aplicación de la LSSI. TheHoster no enviará comunicaciones publicitarias o promocionales por correo electrónico u otro medio de comunicación electrónica equivalente que previamente no hubieran sido solicitadas o expresamente autorizadas por los destinatarios de las mismas. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        En el caso de usuarios con los que exista una relación contractual previa, TheHoster sí está autorizado al envío de comunicaciones comerciales referentes a productos o servicios de TheHoster que sean similares a los que inicialmente fueron objeto de contratación con el cliente. 
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        En todo caso, el usuario, tras acreditar su identidad, podrá solicitar que no se le haga llegar más información comercial a través de los canales de Atención al Cliente.
                    </p>
                </div>
            </template>
            <template v-if="language == 'en'">
                <div class="mt-6">
                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Protection of personal data according to the LOPD
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                         Cityvities S.L. (hereinafter “TheHoster”), in application of current regulations
                        regarding the protection of personal data, informs that the data
                        data that are collected through the forms on the Website:
                        www.TheHoster.com (hereinafter "Website"), are included in the files
                        specific automated users of TheHoster services.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        The collection and automated processing of personal data is intended to
                        maintenance of the commercial relationship and the performance of information tasks, training,
                        advice and other activities of TheHoster.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        These data will only be transferred to those entities that are necessary with the sole
                        objective of fulfilling the aforementioned purpose.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster adopts the necessary measures to guarantee the security, integrity and
                        confidentiality of the data in accordance with the provisions of the Regulation (EU)
                        2016/679 of the European Parliament and of the Council, of April 27, 2016, regarding
                        the protection of natural persons with regard to data processing
                        and the free movement of the same.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        The user may at any time exercise the rights of access, opposition,
                        rectification and cancellation recognized in the aforementioned Regulation (EU). The exercise
                        of these rights can be done by the user himself through email to:
                        info@thehoster.com
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        The user declares that all the data provided by him are true and
                        correct, and undertakes to keep them updated, communicating changes to
                        TheHoster.
                    </p>
                    

                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Purpose of the processing of personal data:
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        At TheHoster, we will treat your personal data collected through the Website, with
                        the following purposes:
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        1. In case of contracting the goods and services offered through the Website
                        to maintain the contractual relationship, as well as the management, administration, information,
                        provision and improvement of service.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        2. Sending requested information through the forms provided on the Website.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        3. Send bulletins (newsletters), as well as commercial communications of promotions and/or
                        TheHoster and industry advertising.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        We remind you that you can oppose the sending of commercial communications by any means and
                        at any time, by sending an email to the address indicated above.
                    </p>

                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        For how long is the personal data collected kept?
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        The data provided will be kept by TheHoster and its suppliers as long as it is kept
                        the business relationship or for the time necessary to comply with legal obligations
                        and attend to the possible responsibilities that could derive from the fulfillment of
                        the purpose for which the data was collected.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6 font-semibold">
                        Legitimation:
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        The treatment of your data is carried out with the following legal bases that
                        legitimize the same:
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        1. The request for information and/or the contracting of TheHoster services, whose terms and conditions will be made available to you in any case, prior to a possible contracting.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        2. The free, specific, informed and unequivocal consent, insofar as we inform you by making this privacy policy available to you, which, after reading it, if you agree, you can accept by means of a statement or a clear affirmative action, such as marking a box provided for that purpose.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        In the event that you do not provide us with your data or do so in an erroneous or incomplete manner, we will not be able to attend to your request, making it completely impossible to provide you with the information requested or to carry out the contracting of the services.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Communication of data to third parties:
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        For the necessary provision of the contracted services, you accept that TheHoster, as an intermediary, communicates your personal data to third-party companies, including those of other people on behalf of whom you have made the reservation.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Our vendors will only collect, use and disclose your information to the extent necessary to enable them to perform the services they provide to us until the end of the business relationship.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        These providers have signed with TheHoster the transfer and data processing contracts required by current regulations, applying the necessary guarantees and safeguards to preserve the privacy of your data.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Once you leave our store website or are redirected to a third party site or application, you are no longer governed by this Privacy Policy or our website Terms of Service.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Data collected by users of the services
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        In cases where the user includes files with personal data on shared hosting servers, TheHoster is not responsible for the user's breach of the RGPD.
                    </p>

                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Data retention in accordance with the LSSI
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster informs that, as a data hosting service provider and by virtue of the provisions of Law 34/2002 of July 11, Services of the Information Society and Electronic Commerce (LSSI), it retains for a maximum period of 12 months the essential information to identify the origin of the hosted data and the moment in which the provision of the service began. The retention of these data does not affect the secrecy of communications and may only be used within the framework of a criminal investigation or to safeguard public security, making themselves available to the judges and/or courts or the Ministry that requires them. .
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        The communication of data to the State Forces and Bodies will be done in accordance with the provisions of the regulations on the protection of personal data.
                    </p>

                    
                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        TheHoster Intellectual Property Rights
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster is the owner of all copyright, intellectual and industrial property, "know how" and any other rights related to the contents of the Website and the services offered therein, as well as the necessary programs for its implementation and related information.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        The reproduction, publication and/or non-strictly private use of the contents, in whole or in part, of the Website is not permitted without prior written consent.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Software Intellectual Property
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        The user must respect the third-party programs made available by TheHoster, even if they are free and/or publicly available. TheHoster has the necessary exploitation and intellectual property rights for the software.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        The user does not acquire any right or license for the contracted service, on the software necessary for the provision of the service, nor on the technical information for monitoring the service, except for the rights and licenses necessary for the fulfillment of the contracted services and only for their duration.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        For any action that exceeds the fulfillment of the contract, the user will need written authorization from TheHoster, the user being prohibited from accessing, modifying, viewing the configuration, structure and files of the servers owned by TheHoster, assuming the civil and criminal liability derived of any incident that may occur in the servers and security systems as a direct consequence of negligent or malicious action on their part.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Intellectual property of the hosted content
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        The use contrary to the legislation on intellectual property of the services provided by TheHoster and, in particular:
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        • The use that is contrary to Spanish law or that infringes the rights of third parties.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        • Posting or transmitting any content that, in TheHoster's opinion, is violent, obscene, abusive, illegal, racial, xenophobic or defamatory.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        • The cracks, serial numbers of programs or any other content that violates the intellectual property rights of third parties.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        • The collection and/or use of personal data of other users without their express consent or contravening the provisions of Regulation (EU) 2016/679 of the European Parliament and of the Council, of April 27, 2016, regarding the protection of people with regard to the processing of personal data and the free movement of the same.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        • The use of the domain's mail server and email addresses for sending spam.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        The user is responsible for the laws and regulations in force and the rules that have to do with the operation of the online service, electronic commerce, copyright, maintenance of public order, as well as universal principles of Internet use.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Protection of hosted information
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster makes backup copies of the content hosted on its servers, however, it is not responsible for the loss or accidental deletion of data by users. In the same way, it does not guarantee the total replacement of the data deleted by the users, since the aforementioned data could have been deleted and/or modified during the period of time that has elapsed since the last backup.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        The services offered, except the specific backup services, do not include the replacement of the contents preserved in the backup copies made by TheHoster, when this loss is attributable to the user; in this case, a rate will be determined according to the complexity and volume of the recovery, always with prior acceptance by the user.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        The replacement of deleted data is only included in the price of the service when the loss of content is due to causes attributable to TheHoster.
                    </p>

                    
                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        commercial communications
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        In application of the LSSI. TheHoster will not send advertising or promotional communications by email or other equivalent means of electronic communication that have not previously been requested or expressly authorized by the recipients thereof.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        In the case of users with whom there is a prior contractual relationship, TheHoster is authorized to send commercial communications regarding TheHoster products or services that are similar to those initially contracted with the client.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        In any case, the user, after proving their identity, may request that no more commercial information be sent to them through the Customer Service channels.
                    </p>
                </div>
            </template>
            <template v-else-if="language == 'fr'">
                <div class="mt-6">
                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Protection des données personnelles selon la LOPD
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                         Cityvities S.L. (ci-après « TheHoster »), en application de la réglementation en vigueur
                        concernant la protection des données personnelles, informe que les données
                        données collectées via les formulaires du Site :
                        https://thehoster.io/ (ci-après "Site"), sont inclus dans les fichiers
                        utilisateurs automatisés spécifiques des services TheHoster.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        La collecte et le traitement automatisé des données personnelles ont pour finalité
                        entretien de la relation commerciale et réalisation des missions d'information, de formation,
                        conseils et autres activités de TheHoster.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Ces données ne seront transférées qu'aux entités nécessaires à la seule
                        objectif de remplir l'objectif susmentionné.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster adopte les mesures nécessaires pour garantir la sécurité, l'intégrité et
                        confidentialité des données conformément aux dispositions du règlement (UE)
                        2016/679 du Parlement européen et du Conseil, du 27 avril 2016, concernant
                        la protection des personnes physiques à l'égard du traitement des données
                        et la libre circulation de ceux-ci.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        L'utilisateur peut à tout moment exercer ses droits d'accès, d'opposition,
                        la rectification et l'annulation reconnues dans le règlement (UE) susmentionné. L'exercice
                        de ces droits peut être exercé par l'utilisateur lui-même par courrier électronique à :
                        info@thehoster.com
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        L'utilisateur déclare que toutes les données fournies par lui sont vraies et
                        correctes et s'engage à les tenir à jour, en communiquant les modifications à
                        SalutCité.
                    </p>
                    

                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Finalité du traitement des données personnelles :
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Chez TheHoster, nous traiterons vos données personnelles collectées via le site Web, avec
                        les finalités suivantes :
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        1. En cas de sous-traitance des biens et services proposés via le site Web
                        maintenir la relation contractuelle, ainsi que la gestion, l'administration, l'information,
                        la fourniture et l'amélioration du service.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        2. Envoi des informations demandées via les formulaires fournis sur le site Web.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        3. Envoyer des bulletins (newsletters), ainsi que des communications commerciales de promotions et/ou
                        TheHoster et la publicité de l'industrie.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Nous vous rappelons que vous pouvez vous opposer à l'envoi de communications commerciales par tout moyen et
                        à tout moment, en envoyant un courrier électronique à l'adresse indiquée ci-dessus.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Combien de temps les données personnelles collectées sont-elles conservées ?
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Les données fournies seront conservées par TheHoster et ses fournisseurs tant qu'elles seront conservées
                        la relation d'affaires ou pendant le temps nécessaire pour se conformer aux obligations légales
                        et s'occuper des éventuelles responsabilités qui pourraient découler de l'accomplissement des
                        la finalité pour laquelle les données ont été collectées.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6 font-semibold">
                        Légitimation:
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Le traitement de vos données est effectué avec les bases légales suivantes qui
                        légitimer le même :
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        1. La demande d'informations et/ou la souscription des services TheHoster, dont les termes et conditions seront mis à votre disposition dans tous les cas, préalablement à une éventuelle souscription.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        2. Le consentement libre, spécifique, éclairé et sans équivoque, dans la mesure où nous vous informons en mettant à votre disposition cette politique de confidentialité, que, après l'avoir lue, si vous êtes d'accord, vous pouvez accepter au moyen d'une déclaration ou d'une action affirmative claire, comme cocher une case prévue à cet effet.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Dans le cas où vous ne nous fournissez pas vos données ou le faites de manière erronée ou incomplète, nous ne serons pas en mesure de répondre à votre demande, ce qui rend totalement impossible de vous fournir les informations demandées ou d'exécuter le contrat. des prestations.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Communication des données à des tiers :
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Pour la fourniture nécessaire des services contractés, vous acceptez que TheHoster, en tant qu'intermédiaire, communique vos données personnelles à des sociétés tierces, y compris celles d'autres personnes pour le compte desquelles vous avez effectué la réservation.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Nos fournisseurs ne collecteront, n'utiliseront et ne divulgueront vos informations que dans la mesure nécessaire pour leur permettre d'exécuter les services qu'ils nous fournissent jusqu'à la fin de la relation commerciale.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Ces prestataires ont signé avec TheHoster les contrats de transfert et de traitement de données requis par la réglementation en vigueur, en appliquant les garanties et sauvegardes nécessaires pour préserver la confidentialité de vos données.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Une fois que vous quittez le site Web de notre boutique ou que vous êtes redirigé vers un site ou une application tiers, vous n'êtes plus régi par la présente politique de confidentialité ou les conditions d'utilisation de notre site Web.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Données collectées par les utilisateurs des services
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Dans les cas où l'utilisateur inclut des fichiers avec des données personnelles sur des serveurs d'hébergement mutualisé, TheHoster n'est pas responsable de la violation par l'utilisateur du RGPD.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Conservation des données conformément à la LSSI
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster informe qu'en tant que fournisseur de services d'hébergement de données et en vertu des dispositions de la loi 34/2002 du 11 juillet, Services de la société de l'information et du commerce électronique (LSSI), il conserve pendant une période maximale de 12 mois les informations essentielles pour identifier l'origine des données hébergées et le moment où la fourniture du service a commencé. La conservation de ces données ne porte pas atteinte au secret des communications et ne peut être utilisée que dans le cadre d'une enquête pénale ou pour sauvegarder la sécurité publique, en se mettant à la disposition des juges et/ou des tribunaux ou du ministère qui les requiert. .
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        La communication des données aux Forces et Corps de l'Etat se fera conformément aux dispositions de la réglementation sur la protection des données personnelles.
                    </p>

                    
                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Droits de propriété intellectuelle TheHoster
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster est propriétaire de tous les droits d'auteur, de la propriété intellectuelle et industrielle, du "savoir-faire" et de tout autre droit lié au contenu du site Web et des services qui y sont proposés, ainsi que des programmes nécessaires à sa mise en œuvre et des informations connexes.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        La reproduction, la publication et/ou l'utilisation non strictement privée du contenu, en tout ou en partie, du Site n'est pas autorisée sans autorisation écrite préalable.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Propriété intellectuelle des logiciels
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        L'utilisateur doit respecter les programmes tiers mis à disposition par TheHoster, même s'ils sont gratuits et/ou accessibles au public. TheHoster dispose des droits d'exploitation et de propriété intellectuelle nécessaires pour le logiciel.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        L'utilisateur n'acquiert aucun droit ou licence pour le service contracté, sur le logiciel nécessaire à la fourniture du service, ni sur les informations techniques pour le suivi du service, à l'exception des droits et licences nécessaires à l'exécution des services contractés et uniquement pour leur durée.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Pour toute action dépassant l'exécution du contrat, l'utilisateur aura besoin d'une autorisation écrite de TheHoster, l'utilisateur étant interdit d'accéder, de modifier, de visualiser la configuration, la structure et les fichiers des serveurs appartenant à TheHoster, en assumant la responsabilité civile et pénale dérivée de tout incident pouvant survenir dans les serveurs et les systèmes de sécurité en conséquence directe d'une action négligente ou malveillante de leur part.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Propriété intellectuelle du contenu hébergé
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        L'utilisation contraire à la législation sur la propriété intellectuelle des services fournis par TheHoster et notamment :
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        • L'utilisation qui est contraire à la loi espagnole ou qui porte atteinte aux droits de tiers.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        • Publier ou transmettre tout contenu qui, de l'avis de TheHoster, est violent, obscène, abusif, illégal, racial, xénophobe ou diffamatoire.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        • Les fissures, les numéros de série des programmes ou tout autre contenu qui viole les droits de propriété intellectuelle de tiers.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        • La collecte et/ou l'utilisation de données personnelles d'autres utilisateurs sans leur consentement exprès ou contrevenant aux dispositions du Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 relatif à la protection des personnes handicapées. concernant le traitement des données personnelles et la libre circulation de celles-ci.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        • L'utilisation du serveur de messagerie et des adresses e-mail du domaine pour l'envoi de spam.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        L'utilisateur est responsable des lois et règlements en vigueur et des règles relatives au fonctionnement du service en ligne, au commerce électronique, au droit d'auteur, au maintien de l'ordre public, ainsi qu'aux principes universels d'utilisation d'Internet.
                    </p>


                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Protection des informations hébergées
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        TheHoster fait des copies de sauvegarde du contenu hébergé sur ses serveurs, cependant, il n'est pas responsable de la perte ou de la suppression accidentelle de données par les utilisateurs. De même, il ne garantit pas le remplacement total des données supprimées par les utilisateurs, puisque lesdites données pourraient avoir été supprimées et/ou modifiées pendant la période de temps qui s'est écoulée depuis la dernière sauvegarde.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Les services proposés, à l'exception des services de sauvegarde spécifiques, n'incluent pas le remplacement du contenu conservé dans les copies de sauvegarde réalisées par TheHoster, lorsque cette perte est imputable à l'utilisateur ; dans ce cas, un tarif sera déterminé en fonction de la complexité et du volume de la reprise, toujours avec acceptation préalable de l'utilisateur.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Le remplacement des données supprimées n'est inclus dans le prix du service que lorsque la perte de contenu est due à des causes imputables à TheHoster.
                    </p>

                    
                    <h3 class="sub-title-info-legal mb-3.5 lg:mb-6">
                        Communication commerciale
                    </h3>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        En application de la LSSI. TheHoster n'enverra pas de communications publicitaires ou promotionnelles par courrier électronique ou tout autre moyen de communication électronique équivalent qui n'aurait pas été préalablement demandé ou expressément autorisé par les destinataires de celles-ci.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Dans le cas d'utilisateurs avec lesquels il existe une relation contractuelle préalable, TheHoster est autorisée à envoyer des communications commerciales concernant des produits ou services TheHoster similaires à ceux initialement contractés avec le client.
                    </p>
                    <p class="content-info-legal mb-3.5 lg:mb-6">
                        Dans tous les cas, l'utilisateur, après avoir justifié de son identité, pourra demander qu'aucune information commerciale ne lui soit transmise par les canaux du Service Client.
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