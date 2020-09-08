import React from 'react';
import Button from '@material-ui/core/Button';
import ReactDOM from 'react-dom';
const { dialog } = window.require('electron').remote;


function openFileBrowserDialog() {
  return dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] });
}


function fileBrowser() {
  return (
  <Button variant="contained" color="primary" onClick={openFileBrowserDialog}>
    Open log file(s)
  </Button>
  );
}

export default fileBrowser;