// 日程安排 组件  https://www.jianshu.com/p/f98b2143d2e3 https://www.helloweba.net/javascript/447.html#fc-header
<template>
    <div id="page">

        <div class="main">
            <!-- <FullCalendar defaultView="dayGridMonth" locale="zh-cn" firstDay="1" weekNumberCalculation="ISO" 
            :eventTimeFormat="evnetTime"
            :header="header"
            @dateClick="handleDateClick" 
            :plugins="calendarPlugins"
            :events="calendarEvents"
            @eventClick="handleEventClick" -->
             <!-- /> -->
             <FullCalendar
      :config="config"
      :events="events"
    ></FullCalendar>
 
        </div>
    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import '@fullcalendar/core/main.css';

export default {
  components: { FullCalendar },
  data() {
      return {
        events: [{
          title: '事件内容',  // 事件内容
          start: '2019-05-20 09:00:00', // 事件开始时间
          end: '2019-05-21 12:00:00',   // 事件结束时间
          color: 'rgba(9, 9, 9, 0.2)'       // 事件的显示颜色
        }],
        config: {
          buttonText: { today: "今天", month: "月", week: "周", day: "日" },
          locale: "zh-cn",
          editable: false, //是否允许修改事件
          selectable: false,
          eventLimit: 4, //事件个数
          allDaySlot: false, //是否显示allDay
          defaultView: "month", //显示默认视图
          eventClick: this.eventClick, //点击事件
          dayClick: this.dayClick, //点击日程表上面某一天
       }
     }
  },
  methods: {
     // 点击事件
     eventClick (event, jsEvent, pos) {
       console.log('eventClick', event, jsEvent, pos)
     },
     // 点击当天
     dayClick (day, jsEvent) {
        console.log('dayClick', day, jsEvent)
     }
  }
}
</script>
<style>
    @import '~@fullcalendar/core/main.css';
    @import '~@fullcalendar/daygrid/main.css';

#page p{
    text-align: center;
    line-height: 42px;
}
#page h2{
    padding-top: 20px;
    text-align: center;
    font-size: 20px;
}
.main{
    margin: 10px;
    text-align: center;
    background: #fff;
    padding: 10px;
}
</style>