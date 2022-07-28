import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    alertMessage: null,
    alertType: null,
}
const alertSlics = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert: (state, action) => {
            state.alertMessage = action.payload.alertMessage;
            state.alertType = action.payload.alertType;
        },
        setAlertNull: state => {
            state.alertMessage = null;
            state.alertType = null;
        },
    }
});
export const { setActiveAlert, setAlertNull } = alertSlics.actions;
export const selectAlertMessage = state => state.user.alertMessage;
export const selectAlertType = state => state.user.alertType;

export default alertSlics.reducer;