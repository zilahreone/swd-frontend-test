import { useDispatch, useSelector, useStore } from 'react-redux'
import type { RootState, AppDispatch, AppStore } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const UseAppDispatch = useDispatch.withTypes<AppDispatch>()
export const UseAppSelector = useSelector.withTypes<RootState>()
export const UseAppStore = useStore.withTypes<AppStore>()