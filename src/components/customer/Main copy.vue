// 日程安排 组件
<template>
    <div id="page">

        <div class="main">
            <FullCalendar defaultView="dayGridMonth" locale="zh-cn" firstDay="1" weekNumberCalculation="ISO" 
            :eventTimeFormat="evnetTime"
            :header="header"
            @dateClick="handleDateClick" 
            :plugins="calendarPlugins"
            :events="calendarEvents"
            @eventClick="handleEventClick"
             />
        </div>
    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import '@fullcalendar/core/main.css';

export default {
    components: {
        FullCalendar
    },
    data() {
        return {
            calendarPlugins: [ 
                dayGridPlugin,
                interactionPlugin // needed for dateClick
            ],
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            evnetTime: {
                hour: 'numeric',
                minute: '2-digit',
                hour12: false
            },
            calendarEvents: [ // initial event data
                { title: '部门会议', start: new Date() }
            ]
        }
    },
    mounted() {

    },
    created() {

    },
    methods: {
        handleDateClick(arg) {
            if (confirm('您是否要在' + arg.dateStr + '添加一个新的事件?')) {
                this.calendarEvents.push({ // add new event data
                  title: '新的事件',
                  start: arg.date,
                  allDay: arg.allDay
                })
            }
        },
        handleEventClick(info) {
            alert('Event: ' + info.event.title);
            //alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
            //alert('View: ' + info.view.type);

            // change the border color just for fun
            info.el.style.borderColor = 'red';
        }
    }
}
</script>
<style>


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