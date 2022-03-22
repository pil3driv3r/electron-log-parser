import React, { useReducer } from 'react'
import CompositionRoot from './components/CompositionRoot'
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import {
  appContext,
  initialState,
  reducer
} from './providers/appContextProvider'

function App () {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <appContext.Provider value={{ state, dispatch }}>
        <CompositionRoot />
      </appContext.Provider>
    </LocalizationProvider>
  )
}

export default App
