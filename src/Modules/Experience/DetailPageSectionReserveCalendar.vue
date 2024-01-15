<template>
    <div id="calendar-v3" class="">
      <DatePicker
        v-model="formReserve.date"
         class="custom-calendar"
        :select-attribute="attr"
        :disabled-dates="disabled_dates"
        expanded
        :min-page="min_page"
        :max-page="max_page"
        :min-date="min_date"
      />
    </div>
</template>

<script setup>
  import { provide, onMounted, computed, ref, inject, nextTick, reactive  } from 'vue'
  import { setupCalendar, Calendar, DatePicker } from 'v-calendar'
  import 'v-calendar/style.css'

  //DATA static
  const attr = {
    key: 'today',
    highlight: {
      contentClass: 'text-white',
      style:{
        background: '#34A98F',
        borderRadius: '100%',
      },
    },
  }

  const all_days_week = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY"
  ] 

  const name_days_of_week = {
      MONDAY: 2,
      TUESDAY: 3,
      WEDNESDAY: 4,
      THURSDAY: 5,
      FRIDAY: 6,
      SATURDAY: 7,
      SUNDAY: 1,
  }

  //INJECT
  const formReserve = inject('formReserve')
  const $moment = inject('$moment')
  const schedulesData = inject('schedulesData')

  //DATA
  const date = ref(null)
  const unavailable_dates_cal = ref([])
  const days_of_week_cal = ref([])

  //COMPUTED
  const min_page = computed(() => {
    let date_now = $moment()
    date_now = formatDateObjectNumber(date_now)
    return date_now
  })
  const min_date = computed(() => {
    let date_now = $moment().add(1, 'days')
    date_now = date_now.toISOString()
    return date_now
  })
  const max_page = computed(() => {
    let seasons = getSeasons()
    let last_date = seasons.reduce((acc, item, index) => {
      let end_date = $moment(item.end_date, 'YYYY-MM-DD')
      if (index == 0) {
        acc = $moment(end_date, 'YYYY-MM-DD')
        return acc
      }
      if (acc.format('YYYY-MM-DD') == end_date.format('YYYY-MM-DD')) {
        return acc
      }
      if (acc.isAfter(end_date)) {
        return acc
      } else {
        return end_date
      }
      return acc
    }, null)
    let date_now = $moment()
    last_date = formatDateObjectNumber(last_date)
    return last_date
  })
  const max_date = computed(() => {
    let date = ''
    return date
  })
  const disabled_dates = computed(() => {
    let unavailable_week = {
      repeat: {
        weekdays: days_of_week_cal.value,
      },
    }
    let disables = [
      unavailable_week,
    ]
    unavailable_dates_cal.value.forEach(item => {
      disables.push(item)
    })
    return disables
  })
  const min_date_format = computed(() => {
    // return min_date.value.format('DD/MM/YYYY')
    return ''
  })
  const bookable_items = computed(() => {
    return schedulesData?.value.bookableItems
  })

  //ONMOUNTED
  onMounted(() => {
    const calendarRef = ref(null);
    nextTick(() => {
    })
    days_of_week_cal.value = getDaysOfWeekEnable()
    unavailable_dates_cal.value = getUnavailableDates()
  })

  //FUNCTION
  function getDaysOfWeekEnable () {
    let days_of_week = []
    bookable_items.value.forEach(item_bookable => {
      item_bookable.seasons.forEach(item_season => {
        item_season.pricingRecords.forEach(item_pricing => {
          let d = item_pricing.daysOfWeek
          days_of_week.push(d)
          // let d = item_pricing.daysOfWeek.filter(item_include => !days_of_week.includes(item_include))
          // days_of_week.push(...d)
        })
      })
    })
    days_of_week = valuesCommon(days_of_week)
    let days_all = [1, 2, 3, 4, 5, 6, 7]
    days_of_week = days_of_week.map(item_day => name_days_of_week[item_day])
    // return days_of_week
    days_of_week = days_all.filter(item_n => !days_of_week.includes(item_n))
    return days_of_week
  }
  function getUnavailableDates () {
    var unavailables = []
    let unavailable_dates_all = []
    bookable_items.value.forEach((item_bookable, index_bookable) => {
        item_bookable.seasons.forEach(item_season => {
          item_season.pricingRecords.forEach(item_pricing => {
            item_pricing?.timedEntries?.forEach(item_time => {
              let date_enables = item_time?.unavailableDates || []
              if (!date_enables) return;
              date_enables = date_enables.forEach((item_date, index_date) => {
                let date_test = $moment(item_date.date)
                let date_test_format = date_test.format('YYYY-MM-DD')
                if(!unavailable_dates_all.includes(date_test_format)) {
                  unavailable_dates_all.push(date_test_format)
                }
              })
            })
          })
        })
    })

    unavailable_dates_all.forEach((item_date, index_date) => {
      let date_test_u = $moment(item_date)
      let valid_u = validUnavailableDate(date_test_u)
      let date_test_format_u = date_test_u.format('YYYY-MM-DD')
      if (valid_u) {
        // console.log(!unavailables.includes(date_test_format))
        if(!unavailables.includes(date_test_format_u)) {
          unavailables.push(date_test_format_u)
        }
      }
    })
    unavailables = unavailables.map(item_date => {
      return $moment(item_date).add(1, 'days').format('YYYY-MM-DD')
    })
    // return unavailable_dates
    // console.log(unavailables, 'unavailables')
    return unavailables
  }
  function validUnavailableDate (value) {
    let date_test = $moment(value)
    let day_date_test = date_test.locale('en').format("dddd").toUpperCase()
    let date_now = $moment()
    let v = true
    bookable_items.value.forEach((item_bookable, index_bookable) => {
      item_bookable.seasons.forEach(item_season => {

        let start_date = ''
        let end_date = ''
        if (item_season?.endDate) {
            start_date = $moment(item_season.startDate)
            end_date = $moment(item_season.endDate)
        } else {
            start_date =  $moment()
            end_date = $moment().add(384, 'days')
        }
        let compared_date = date_test.isSameOrAfter(start_date) && date_test.isSameOrBefore(end_date)
        if (!compared_date) return;

        item_season.pricingRecords.forEach(item_pricing => {

          let day_of_week = item_pricing.daysOfWeek.includes(day_date_test)
          if (!day_of_week) return;
          
          item_pricing?.timedEntries?.forEach((item_time, index_time) => {
            let date_enables = item_time?.unavailableDates || []
            date_enables = date_enables.map(item_date => {
              return item_date.date
            })
            let date_test_format = date_test.format('YYYY-MM-DD')
            // if (date_enables.includes(date_test_format)) {
            //   console.log('entro')
            // }
            if (!date_enables.includes(date_test_format)) {
              v = false
            }
          })
        })
      })
    })
    
    return v
  }
  function getSeasons () {
    let sesions = []
    bookable_items.value.forEach(item_bookable => {
      item_bookable.seasons.forEach(item_season => {
        let start_date = ''
        let end_date = ''
        if (item_season?.endDate) {
          start_date = item_season.startDate
          end_date = item_season.endDate
        } else {
          start_date =  $moment().format('YYYY-MM-DD')
          end_date = $moment().add(384, 'days').format('YYYY-MM-DD')
        }
        let date_now = $moment().format('YYYY-MM-DD h:m:s')
        let date = $moment(start_date).format('YYYY-MM-DD')
        if (date_now == date) {
          start_date = $moment(start_date).add(1, 'days').format('YYYY-MM-DD')
          end_date = $moment(end_date).add(-1, 'days').format('YYYY-MM-DD')
        }
        sesions.push({
          start_date,
          end_date,
        })
      })
    })
    return sesions
  }
  function valuesCommon (array) {
    if (array.length === 0) {
      return [];
    }

    // var ref = array[0]
    // var values_commun = ref.filter(function(item) {
    //   return array.every(function(sub_array) {
    //     return sub_array.includes(item)
    //   });
    // });
    let values_commun = array.reduce((acc, curr) => {
        curr.forEach(day => {
            if (!acc.includes(day)) acc.push(day);
        });
        return acc;
    }, []);

    return values_commun
  }
  function formatDateObject (value) {
    let date = $moment(value).add(1, 'days').toISOString()
    return {
        start: date,
        end: date,
    }
  }
  function formatDateObjectNumber (value) {
    let month = value.format('MM')
    let year = value.format('YYYY')
    return {
        month: Number(month),
        year: Number(year),
    }
  }

  
</script>

<style scoped>
  @media(max-width:300px) {
    #calendar-v3 {
        /* transform: scale(2) !important; */
        /* width: 220px; */
        /* display: none; */
        /* transform: scale(0.5); */
      transform: scale(0.75);
      transform-origin: top left;
      max-height: 204px;
    }
    .custom-calendar {
    }
}
</style>
