import { createSlice } from '@reduxjs/toolkit';

export const AlertBannerSlice = createSlice({
  name: 'alertBanner',
  initialState: {
    alerts: [],
  },
  reducers: {
    createAlert: (state, action) => {
      state.alerts.push({
        message: action.payload.message,
        severity: action.payload.severity,
      });
    },
  },
});

// TO CREATE A NOTIFICATION, IMPORT { createAlert } FROM THIS FILE AND DO SOMETHING LIKE THIS:
// dispatch(createAlert({
//   message: `Successfully added event ${event.title}!`,
//   severity: 'success',
// }));
// MORE SEVERITIES/COLORS HERE: https://material-ui.com/components/alert/

export const { createAlert } = AlertBannerSlice.actions;

export default AlertBannerSlice.reducer;
