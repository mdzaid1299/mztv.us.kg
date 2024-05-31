import { createSlice } from "@reduxjs/toolkit";


const userReduxSlice =  createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            return action.payload;
        },
        removeUser: (state, action) => {
            return null;
        }
    }
})

export const { addUser, removeUser } = userReduxSlice.actions
export default userReduxSlice.reducer;