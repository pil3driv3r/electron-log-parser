import React from 'react'
import { processFileAsChunks } from './logProcessor'

export const initialState = {
  filePath: ''
}

export const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ACTIONS.FILE_OPEN: {
      return { ...state, filePath: payload }
    }
    case ACTIONS.FILE_READ_COMPLETED: {
      if (payload) {
        let { filterDataSet, chunkedData } = processFileAsChunks(payload)
        return { ...state, fileData: chunkedData, filterDataSet }
      }
    }
    case ACTIONS.FILTER_ADDED: {
    }
    default: {
      return state
    }
  }
}

export const ACTIONS = {
  FILE_OPEN: 'file_open',
  FILE_READ_COMPLETED: 'file_read_completed',
  FILTER_ADDED: 'filter_added'
}

export const appContext = React.createContext('app')
