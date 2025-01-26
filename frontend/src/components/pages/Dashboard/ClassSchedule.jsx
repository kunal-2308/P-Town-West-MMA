import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Paper, Box } from "@mui/material";
import { useScheduler } from "../../../context/SchedulerContext";

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
  const { state } = useScheduler();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log("Classes in state:", state.classes);

    if (!state.classes || state.classes.length === 0) {
      setEvents([]);
      return;
    }

    const mappedEvents = state.classes.flatMap((cls) => {
      const eventsForClass = [];

      if (!cls.isRecurring) {
        // Handle non-recurring classes
        const start = new Date(
          `${new Date().toISOString().split("T")[0]}T${cls.startTime}`
        );
        const end = new Date(start.getTime() + cls.duration * 60000);

        eventsForClass.push({
          id: `${cls.id}`,
          title: cls.title,
          start,
          end,
          backgroundColor: cls.color || "#3788d8",
          extendedProps: { type: cls.type, instructor: cls.instructor },
        });

        return eventsForClass;
      }

      // Recurring classes logic
      const recurringDays = cls.recurringDays.map((day) =>
        WEEK_DAYS.indexOf(day)
      );

      const startDate = new Date(); // Start from today
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + cls.recurrenceWeeks * 7);

      for (
        let currentDate = new Date(startDate);
        currentDate <= endDate;
        currentDate.setDate(currentDate.getDate() + 1)
      ) {
        const dayIndex = currentDate.getDay();
        if (recurringDays.includes(dayIndex)) {
          const start = new Date(
            `${currentDate.toISOString().split("T")[0]}T${cls.startTime}`
          );
          const end = new Date(start.getTime() + cls.duration * 60000);

          eventsForClass.push({
            id: `${cls.id}-${currentDate.toISOString().split("T")[0]}`,
            title: cls.title,
            start,
            end,
            backgroundColor: cls.color || "#3788d8",
            extendedProps: { type: cls.type, instructor: cls.instructor },
          });
        }
      }

      return eventsForClass;
    });

    setEvents(mappedEvents);
    console.log("Mapped Events:", mappedEvents);
  }, [state.classes]);

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
