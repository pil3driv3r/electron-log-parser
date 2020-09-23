import React from 'react';

export const initialState = {
  filePath: ''
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.FILE_OPEN: {
      return {...state, filePath: action.payload};
    }
    case ACTIONS.FILE_READ_COMPLETED: {
      return {...state, fileData: action.payload}
    }
    default: {
      return state;
    }
  }
}

export const ACTIONS = {
  "FILE_OPEN" : "file_open",
  "FILE_READ_COMPLETED": "file_read_completed",
  "FILTER_APPLIED": "filter_applied"
}

export const appContext = React.createContext('app');