import React from 'react'
import { processFileAsChunks, applyFiltersToDataSet } from './logProcessor'

export const initialState = {
  filePath: '',
  filters: []
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.FILE_OPEN: {
      return { ...state, filePath: payload };
    }
    case ACTIONS.FILE_READ_COMPLETED: {
      if (payload) {
        let { filterDataSet, chunkedData } = processFileAsChunks(payload)
        return { ...state, fileData: chunkedData, filterDataSet };
      }
    }
    case ACTIONS.FILTER_ADDED: {
      if(payload && state.fileData && state.fileData.length > 0) {
        let filters = addOrUpdateFilters(state.filters, payload);
        let filteredData = applyFiltersToDataSet(state.fileData, filters);
        return {...state, filters, filteredData };
      }
    }
    case ACTIONS.FILTER_REMOVED: {
      return state;
    }
    default: {
      return state;
    }
  }
};

const addOrUpdateFilters = (filters, newFilter) => {
  console.log(filters);
  let updatedFilters = filters.slice();
  let matchedFilterIndex = updatedFilters.findIndex(item => item.id === newFilter.id);
  if(matchedFilterIndex == -1) {
    updatedFilters.push(newFilter);;
  } else {
    updatedFilters[matchedFilterIndex] = newFilter;
  }
  return updatedFilters;
}

export const ACTIONS = {
  FILE_OPEN: 'file_open',
  FILE_READ_COMPLETED: 'file_read_completed',
  FILTER_ADDED: 'filter_added',
  FILTER_REMOVED: 'filter_removed'
};

export const appContext = React.createContext('app');
