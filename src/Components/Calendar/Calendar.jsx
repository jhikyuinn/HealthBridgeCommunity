import React from "react";
import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales={
    "ko":require("date-fns/locale/ko")
}

const localizer=dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

function Daily(){
    return(
        <div>
            <Calendar 
            className="calendar"
            localizer={localizer}
            startAccessor="start" 
            endAccessor="end" 
            style={{padding:"2px",
                border: "1px solid #15324B",
                width:"151.5%", 
                height:850, 
                backgroundColor:"white"}}/>
        </div>
    )
}
export default Daily;