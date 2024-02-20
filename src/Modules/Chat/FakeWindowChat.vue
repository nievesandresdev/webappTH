<template>
    
    <div class="height-chat hbg-gray-200 flex flex-col overflow-hidden no-scrollbar mb-[-26px]">
        <!-- header -->
        <div class="xs:py-2 py-3.5 text-center shadow-hoster hbg-white-100">
            <h1 class="xs:text-xs text-base font-medium">{{settings.name}}</h1>
            <div class="text-center xs:mt-0 mt-1.5">
                <p v-if="isAvailable" class="htext-green-600 xs:text-[10px] text-xs inline mr-2">Disponible</p>
                <p v-else class="htext-alert-negative xs:text-[10px] text-xs inline mr-2">No disponible</p>
                <p class="xs:text-[10px] text-xs inline mr-2">Horario</p>
            </div>
        </div>
        <!-- body chat -->
        <div class="body-chat flex-grow flex flex-col xs:p-2 p-3.5 overflow-y-auto  no-scrollbar">
            <!-- info chat -->
            <div class="hbg-white-100 rounded-[10px] xs:p-2 p-3.5">
                <p class="xs:text-[0.53rem] sm:text-sm text-center leading-[150%]">
                    Bienvenido al chat. Aquí tienes un listado con los idiomas hablados por nuestro personal, podrás comunicarte en cualquiera de ellos.
                </p>
                <div class="xs:mt-2 mt-3.5 flex flex-wrap justify-center">
                    <img 
                        class="xs:w-4 xs:h-4 w-5 h-5 mx-2" 
                        v-for="lg in settings.languages" 
                        :src="'/assets/icons/'+lg.abbreviation+'.svg'" alt=""
                        :key="lg"
                    >
                </div>
            </div>
            <template v-if="$route.query.responses">
                <template v-for="msg in chatMessages" :key="msg">
                    <div v-if="msg.show" class="w-3/4" :class="{'ml-auto':msg.by == 'Guest'}" >
                        <p class="text-[9px] p-1 rounded-[6px] mt-2" :class="{'hbg-gray-100':msg.by == 'Guest','hbg-white-100':msg.by !== 'Guest'}">
                            {{ msg.text }}
                        </p>
                        <p class="text-[8px] text-right">
                            {{ msg.date }} - {{ msg.hour }}
                        </p>
                    </div>
                </template>
            </template>
        </div>
        <!-- input chat -->
        <div class="input-chat xs:px-3 px-6 py-2 flex hbg-white-100" style="border-top: 1px solid var(--h-gray-400);">
            <input type="text" class="flex-grow border-0 rounded-[10px] hbg-gray-100 h-full px-3 py-2 min-w-[0px]">
            <img class="ml-2 xs:w-4 xs:h-4 w-6 h-6 my-auto cursor-pointer" src="/assets/icons/2.TH.Sendicon.svg" alt="">
        </div>

    </div>


    <!-- modal mockup -->
    <div v-if="$route.query.showAvailability" class="h-screen w-screen fixed top-0 left-0" style="background-color: rgba(0, 0, 0, 0.50);z-index:3000">  
        <div class="hbg-white-100 rounded-[10px] absolute top-16 left-0 mx-2">
            <!-- header -->
            <p class="relative text-center py-2 text-[11px] font-medium border-b px-2">
                <img class="w-4 h-4 absolute left-2 top-2" src="/assets/icons/1.TH.CLOSE.svg" alt="">
                Disponibilidad del Chat
            </p>
            <!-- body -->
            <div class="p-2">
                <template v-for="schedule in hotelStore?.hotelData?.chatHours" :key="schedule">
                    <div v-if="schedule.active" class="flex items-start mt-1">
                        <p class="w-14 text-[10px] font-medium">{{ schedule.day }}</p>
                        <p class="text-[10px] font-medium">
                            <template v-for="(hour, indexh) in schedule.horary" :key="hour">
                                {{ hour.start }}-{{ hour.end}} <br>
                            </template>
                        </p>
                    </div>
                </template>
                <p class="text-[8px] mt-2">**Durante periodos de alta demanda, es posible que nuestro personal aparezca como no disponible. Cuando la carga de trabajo disminuya, estará disponible para atender tus consultas.</p>
            </div>
        </div>
    </div>
    
</template>
        
<script setup>
    //import libraries
    import { onMounted, ref, toRefs, computed, provide } from 'vue';
    import Moment from 'moment'
    import { useHotelStore } from '@/stores/modules/hotel';

    //store
    const hotelStore = useHotelStore()


    //mounted
    onMounted(() => {
        watchAvailability();
        createMessages()
    });

    //data
    const isAvailable = ref(false);
    const chatMessages = ref([]);
    const settings = ref(hotelStore?.hotelData?.chatSettings);

    const watchAvailability = () =>{
        const currentDay = Moment().format('dddd'); 
        const currentTime = Moment().format('HH:mm');
        const todaysAvailability = hotelStore?.hotelData?.chatHours.find(item => item.day.toUpperCase() == currentDay.toUpperCase());
        if (!todaysAvailability || !todaysAvailability.active) {
            return false;
        }
        
        isAvailable.value = todaysAvailability.horary.some(timeSlot => {
            const startMoment = Moment(timeSlot.start, 'HH:mm');
            const endMoment = Moment(timeSlot.end, 'HH:mm');
            const currentMoment = Moment(currentTime, 'HH:mm');
            return currentMoment.isBetween(startMoment, endMoment, null, '[]');
        });
    }

    const createMessages = () => {
        chatMessages.value =[
            {
                text: "Buenos días. La ducha ha dejado de echar agua caliente.",
                date: "14/08/23",
                hour: "14:55",
                by: "Guest",
                show: true,
            },
            {
                text: settings.value.first_available_msg.es,
                date: "14/08/23",
                hour: "14:56",
                by: "Hoster",
                show: settings.value.first_available_show,
            },
            {
                text: settings.value.second_available_msg.es,
                date: "14/08/23",
                hour: "15:00",
                by: "Hoster",
                show: settings.value.second_available_show,
            },
            {
                text: settings.value.three_available_msg.es,
                date: "14/08/23",
                hour: "15:05",
                by: "Hoster",
                show: settings.value.three_available_show,
            }
        ];
    }
</script>
    
<style scoped>
.height-chat{
    height: calc(100vh - 72px);
}
@media (max-width:250px){
    .height-chat{
        height: calc(100vh - 38px);
    }
}
</style>
        