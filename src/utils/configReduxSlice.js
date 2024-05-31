import { createSlice } from "@reduxjs/toolkit"

const configReduxSlice=createSlice({
    name:"config",
    initialState:{
        lang:"en"
    },
    reducers:{
        changeLanguage:(state,action)=>{
            state.lang=action.payload
        }
    }
});

export default configReduxSlice.reducer;
export const {changeLanguage}=configReduxSlice.actions