import { configureStore } from '@reduxjs/toolkit';
import listReducer from './slices/listSlice';
import authReducer from './slices/authSlice';
import itemReducer from './slices/itemSlice';
import categoryReducer from './slices/categorySlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
        list: listReducer,
        auth: authReducer,
        item: itemReducer,
        category: categoryReducer,
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']