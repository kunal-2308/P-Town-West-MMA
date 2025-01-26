import { Box, Grid } from "@mui/material";
import ClassSchedule from "./ClassSchedule";

function ClientView() {
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ClassSchedule />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ClientView;
