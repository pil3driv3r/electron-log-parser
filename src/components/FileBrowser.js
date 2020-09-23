import React from 'react';
import Button from '@material-ui/core/Button';
import {appContext,ACTIONS } from '../contextProviders/appContextProvider';
const { dialog } = window.require('electron').remote;



function openFileBrowserDialog(dispatch) {
  const filePath = dialog.showOpenDialogSync({ 
    properties: ['openFile', 'multiSelections'] 
  });
  if(filePath && filePath.length)
   dispatch({type: ACTIONS.FILE_OPEN, payload: filePath[0] });
}


export default function FileBrowser() {
  const {dispatch} = React.useContext(appContext);
  return (
  <Button variant="contained" color="primary" onClick={() => openFileBrowserDialog(dispatch)}>
    Open log file(s)
  </Button>
  );
}