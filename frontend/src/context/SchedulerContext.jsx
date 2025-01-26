import { createContext, useContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { schedulerReducer } from "../utils/reducers";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const SchedulerContext = createContext();

const initialState = {
  classes: [],
  bookings: [],
  users: [],
  settings: {
    version: "1.0.0",
    businessHours: {
      start: "06:00:00",
      end: "23:00:00",
    },
  },
};

export function SchedulerProvider({ children }) {
  const [state, dispatch] = useReducer(
    schedulerReducer,
    loadFromStorage() || initialState
  );

  useEffect(() => {
    saveToStorage(state);
  }, [state]);

  return (
    <SchedulerContext.Provider value={{ state, dispatch }}>
      {children}
    </SchedulerContext.Provider>
  );
}

SchedulerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useScheduler = () => {
  const context = useContext(SchedulerContext);
  if (!context) {
    throw new Error("useScheduler must be used within a SchedulerProvider");
  }
  return context;
};
