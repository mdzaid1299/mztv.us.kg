import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer from '../utils/userReduxSlice';
import moviesSliceReducer from '../utils/moviesReduxSlice';
import gptSliceReducer from '../utils/gptreduxslice';
import configSliceReducer from '../utils/configReduxSlice';

const appReduxStore = configureStore(
    {
        reducer: {
            user: userSliceReducer,
            movies: moviesSliceReducer,
            gpt: gptSliceReducer,
            config: configSliceReducer,
        }
    }
);

export default appReduxStore;