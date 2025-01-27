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
        console.log("Classes API Response:", response.data);
        const { classes } = response.data;

        if (classes && classes.length > 0) {
          const mappedEvents = classes.flatMap((cls) => {
            const eventsForClass = [];

            if (!cls.isRecurring) {
              // Non-recurring class logic
              if (!cls.startTime || !cls.duration) {
                console.warn(
                  `Skipping non-recurring class with missing data: ${cls.title}`
                );
                return [];
              }

              const startDate = new Date();
              const startTime = convertTimeTo12Hour(cls.startTime);
              if (!startTime) {
                console.warn(
                  `Invalid start time format for class: ${cls.title}`
                );
                return [];
              }

              const start = new Date(
                `${startDate.toISOString().split("T")[0]}T${startTime}`
              );
              const end = new Date(start.getTime() + cls.duration * 60000);

              eventsForClass.push({
                id: cls.id,
                title: cls.title,
                start,
                end,
                backgroundColor: cls.color || "#3788d8",
                extendedProps: { type: cls.type, instructor: cls.instructor },
              });

              return eventsForClass;
            }

            // Recurring class logic
            if (!cls.recurringDays || !Array.isArray(cls.recurringDays)) {
              console.warn(
                `Skipping recurring class with missing recurringDays: ${cls.title}`
              );
              return [];
            }

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
                const startTime = convertTimeTo12Hour(cls.startTime);
                if (!startTime) {
                  console.warn(
                    `Invalid start time format for class: ${cls.title}`
                  );
                  continue;
                }

                const start = new Date(
                  `${currentDate.toISOString().split("T")[0]}T${startTime}`
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
          console.log("Mapped events:", mappedEvents);
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

  // Convert 24-hour time format to 12-hour time format with AM/PM
  const convertTimeTo12Hour = (time) => {
    if (!time || typeof time !== "string" || !time.includes(":")) {
      console.warn(`Invalid time format: ${time}`);
      return null;
    }

    const [hours, minutes] = time.split(":");
    let hour = parseInt(hours, 10);
    const period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // Convert to 12-hour format, handle '0' hour (midnight)

    return `${hour}:${minutes.padStart(2, "0")} ${period}`;
  };

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
