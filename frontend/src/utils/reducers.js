export const schedulerReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CLASS':
      return {
        ...state,
        classes: [...state.classes, action.payload]
      };
    case 'UPDATE_CLASS':
      return {
        ...state,
        classes: state.classes.map(cls => 
          cls.id === action.payload.id ? action.payload : cls
        )
      };
    case 'DELETE_CLASS':
      return {
        ...state,
        classes: state.classes.filter(cls => cls.id !== action.payload)
      };
    case 'ADD_BOOKING':
      return {
        ...state,
        bookings: [...state.bookings, action.payload]
      };
    case 'UPDATE_BOOKING':
      return {
        ...state,
        bookings: state.bookings.map(booking =>
          booking.id === action.payload.id ? action.payload : booking
        )
      };
    default:
      return state;
  }
};