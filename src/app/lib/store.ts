import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/users/usersSlice'

// const reHydrateStore = () => {
//   if (typeof window !== 'undefined') {
//     if (localStorage.getItem('count') !== null) {
//       return localStorage.getItem('count'); // re-hydrate the store
//     }
//   }
// };

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']