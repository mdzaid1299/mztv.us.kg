import { createSlice } from "@reduxjs/toolkit";

const gptreduxslice = createSlice({
    name: "gpt",
    initialState: {
        showGPTSearch: false,
        searchData: null,
        searchResults: null,
    },
    reducers: {
        toggleGPTSearchView: (state, action) => {
            state.showGPTSearch = !state.showGPTSearch;
        },
        addGPTSearchResults: (state, action) => {
            const {searchData,searchResults} = action.payload
            state.searchData = searchData;
            state.searchResults = searchResults;
        }
    }
})


export const { toggleGPTSearchView , addGPTSearchResults} = gptreduxslice.actions;
export default gptreduxslice.reducer;