import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Paper, Box } from "@mui/material";
import axios from "axios";
import { API_URL } from "../../../../configure";

const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function ClassSchedule() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getClassDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/admin/all`);
        // console.log("Classes API Response:", response.data);
        const { classes } = response.data;

        if (classes && classes.length > 0) {
          const mappedEvents = classes.flatMap((cls) => {
            const eventsForClass = [];
            const recurringDays = cls.recurringDays.map((day) =>
              WEEK_DAYS.indexOf(day)
            );

            const parseTime = (timeString) => {
              const [time, period] = timeString.split(" "); // Split time and AM/PM
              const [hours, minutes] = time.split(":").map(Number);
              let startHours =
                period === "PM" && hours !== 12 ? hours + 12 : hours;
              if (period === "AM" && hours === 12) startHours = 0;
              return { hours: startHours, minutes };
            };

            const createEvent = (date, startTime) => {
              const { hours, minutes } = parseTime(startTime);
              const start = new Date(date);
              start.setHours(hours, minutes, 0, 0);

              const end = new Date(start.getTime() + cls.duration * 60000);
              return {
                id: `${cls.id}-${date.toISOString().split("T")[0]}`,
                title: cls.title,
                start,
                end,
                backgroundColor: cls.color || "#3788d8",
                extendedProps: { type: cls.type, instructor: cls.instructor },
              };
            };

            if (!cls.isRecurring) {
              const event = createEvent(new Date(), cls.startTime);
              eventsForClass.push(event);
              return eventsForClass;
            }

            // Recurring classes
            const startDate = new Date();
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + cls.recurrenceWeeks * 7);

            for (
              let currentDate = new Date(startDate);
              currentDate <= endDate;
              currentDate.setDate(currentDate.getDate() + 1)
            ) {
              if (recurringDays.includes(currentDate.getDay())) {
                const event = createEvent(currentDate, cls.startTime);
                eventsForClass.push(event);
              }
            }

            return eventsForClass;
          });

          setEvents(mappedEvents);
          // console.log("Mapped events:", mappedEvents);
        } else {
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching class details:", error);
        setEvents([]);
      }
    };

    getClassDetails();
  }, []);

  return (
    <Box sx={{ height: "calc(100vh - 200px)" }}>
      <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridWeek",
          }}
          events={events}
          slotMinTime="06:00:00"
          slotMaxTime="23:00:00"
          allDaySlot={false}
          height="100%"
        />
      </Paper>
    </Box>
  );
}

export default ClassSchedule;