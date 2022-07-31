// import { createSlice, configureStore } from '@reduxjs/toolkit'

// const themeSlice = createSlice({
//     name: 'theme',
//     initialState: {
//         theme: window.document.getItem('theme')
//     },
//     reducers: {
//         themeChange: state => {
//             state.value = !state.value
//         }
//     }
// })

// export const { themeChange } = themeSlice.actions

// const store = configureStore({
//     reducer: themeSlice.reducer
// })

// // Can still subscribe to the store
// store.subscribe(() => console.log(store.getState()))

// // Still pass action objects to `dispatch`, but they're created for us
// store.dispatch(themeChange())
// export const { setActiveUser, setUserLogOutState } = themeSlice.actions;
// export const selectUserName = state => state.user.userName;

// export default themeSlice.reducer;