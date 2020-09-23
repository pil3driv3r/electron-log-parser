import React, { useContext, useEffect, useState } from 'react';
import { appContext, ACTIONS } from '../contextProviders/appContextProvider';
const electron = window.require('electron').remote;
const fs = electron.require('fs');

const processFileAsChunks = (fileContent) => {
  let splitRegex = /\n/
  let chunks = fileContent.split(splitRegex);
  let formattedChunks = chunks.map ((chunk, index) => {
    try {
      console.log(chunk);
      let parsedChunk = JSON.parse(chunk);
      return parsedChunk;
    }
    catch (ex) {
      console.log("Error parsing chunk", chunk);
      return chunk;
    }
  });
  return formattedChunks.slice(0, formattedChunks.length - 1);
}

const parseFile = async (filePath) => {
  try {
    let fileContent = await fs.promises.readFile(filePath, 'utf8');
    let prettyPrint = processFileAsChunks(fileContent);
    return prettyPrint;
  }
  catch (ex){
    console.log(ex);
    return "Error reading File - " + filePath;
  }
};

export default () => {
  const {state, dispatch} = useContext(appContext);
  const [parsedResult, setParsedResult] = useState('');
  
  useEffect(() => {
    parseFile(state.filePath).then(payload => {
      dispatch({type: ACTIONS.FILE_READ_COMPLETED, payload });
    });
  }, [state.filePath])

  useEffect(() => {
    setParsedResult(JSON.stringify({data: state.fileData}, undefined, 2));
  }, [state.fileData])

  return (
    <pre> {parsedResult}</pre>
  )
}