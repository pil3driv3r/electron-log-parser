import React, { useReducer } from 'react';
import CompositionRoot from './components/CompositionRoot'

import {appContext, initialState, reducer} from './contextProviders/appContextProvider';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

 return (
  <appContext.Provider value = {{state, dispatch}}>
    <CompositionRoot/>;
  </appContext.Provider>
 );
}

export default App;