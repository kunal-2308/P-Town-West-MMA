import React from "react";
import PropTypes from "prop-types";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Checkbox,
  ListItemText,
  Autocomplete,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { API_URL } from "../../../configure";
import Cookies from "js-cookie";

const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function ClassForm({ classData }) {
  const [formData, setFormData] = React.useState({
    id: "",
    title: "",
    type: "MMA",
    instructor: "",
    startTime: "",
    duration: 60,
    capacity: "",
    description: "",
    difficulty: "Beginner",
    recurringDays: [],
    isRecurring: false,
    recurrenceWeeks: 1,
    color: "#1976d2",
    currentBookings: [],
  });

  React.useEffect(() => {
    if (classData) {
      setFormData(classData);
    } else {
      setFormData((prev) => ({ ...prev, id: uuidv4() }));
    }
  }, [classData]);

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;

  //   if (type === "checkbox") {
  //     setFormData((prev) => ({ ...prev, [name]: checked }));
  //   } else if (type === "select-multiple") {
  //     const options = Array.from(e.target.selectedOptions);
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: options.map((opt) => opt.value),
  //     }));
  //   } else {
  //     setFormData((prev) => ({ ...prev, [name]: value }));
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("jwt_token");

    if (!token) {
      throw new Error("Authorization token not found");
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/add`,
        formData,
        config
      );

      console.log("Class added successfully!", response.data);

      setFormData({
        id: uuidv4(),
        title: "",
        type: "MMA",
        instructor: "",
        startTime: "",
        duration: 60,
        capacity: "",
        description: "",
        difficulty: "Beginner",
        recurringDays: [],
        isRecurring: false,
        recurrenceWeeks: 1,
        color: "#1976d2",
        currentBookings: [],
      });

      // Call the parent component's onSubmit handler if provided
    } catch (error) {
      console.error(
        "Error submitting class:",
        error.response?.data || error.message
      );
    }
  };
  const options = ["MMA", "Boxing", "Yoga", "Dance"];
  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle>{classData ? "Edit Class" : "Add New Class"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Title */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </Grid>
          {/* Type */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Autocomplete
                freeSolo
                options={options}
                value={formData.type}
                onChange={(event, newValue) =>
                  setFormData({ ...formData, type: newValue })
                }
                onInputChange={(event, newValue) =>
                  setFormData({ ...formData, type: newValue })
                }
                renderInput={(params) => <TextField {...params} label="Type" />}
              />
            </FormControl>
          </Grid>
          {/* Instructor */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Instructor"
              value={formData.instructor}
              onChange={(e) =>
                setFormData({ ...formData, instructor: e.target.value })
              }
              required
            />
          </Grid>
          {/* Start Time */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="time"
              label="Start Time"
              value={formData.startTime}
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          {/* Duration */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Duration (minutes)"
              value={formData.duration}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  duration: parseInt(e.target.value, 10),
                })
              }
              required
            />
          </Grid>
          {/* Capacity */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Capacity"
              value={formData.capacity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  capacity: parseInt(e.target.value, 10),
                })
              }
              required
            />
          </Grid>
          {/* Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </Grid>
          {/* Difficulty */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData({ ...formData, difficulty: e.target.value })
                }
              >
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Recurring Days */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Choose Days</InputLabel>
              <Select
                multiple
                value={formData.recurringDays}
                onChange={(e) =>
                  setFormData({ ...formData, recurringDays: e.target.value })
                }
                renderValue={(selected) => selected.join(", ")}
              >
                {WEEK_DAYS.map((day) => (
                  <MenuItem key={day} value={day}>
                    <Checkbox
                      checked={formData.recurringDays.indexOf(day) > -1}
                    />
                    <ListItemText primary={day} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Is Recurring */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Recurring?</InputLabel>
              <Select
                value={formData.isRecurring ? "Yes" : "No"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isRecurring: e.target.value === "Yes",
                  })
                }
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* Recurrence Weeks */}
          {formData.isRecurring && (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Number of Weeks (if recurring)"
                value={formData.recurrenceWeeks}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    recurrenceWeeks: parseInt(e.target.value, 10),
                  })
                }
                required
              />
            </Grid>
          )}
          {/* Color */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="color"
              label="Class Color"
              value={formData.color}
              onChange={(e) =>
                setFormData({ ...formData, color: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained">
          {classData ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </form>
  );
}

ClassForm.propTypes = {
  classData: PropTypes.object,
};

export default ClassForm;
