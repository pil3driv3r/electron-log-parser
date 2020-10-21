import React, { useContext, useEffect, useState } from 'react'
import { appContext, ACTIONS } from '../providers/appContextProvider'
const electron = window.require('electron').remote
const fs = electron.require('fs')

const parseFile = async filePath => {
  if (!filePath) {
    return null
  }
  try {
    let fileContent = await fs.promises.readFile(filePath, 'utf8')
    return fileContent
  } catch (ex) {
    console.log(ex)
    return 'Error reading File - ' + filePath
  }
}

export default () => {
  const { state, dispatch } = useContext(appContext)
  const [parsedResult, setParsedResult] = useState('')

  useEffect(() => {
    parseFile(state.filePath).then(payload => {
      dispatch({ type: ACTIONS.FILE_READ_COMPLETED, payload })
    })
  }, [state.filePath])

  useEffect(() => {
    if (state.filePath) {
      if (state.fileData) {
        setParsedResult(JSON.stringify({ data: state.fileData }, undefined, 2))
      } else {
        setParsedResult('Loading file...')
      }
    } else {
      setParsedResult('Please select a log file')
    }
  }, [state.filePath, state.fileData])

  return <pre>{parsedResult}</pre>
}
