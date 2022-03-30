import React, { useContext, useEffect, useState } from 'react';
import fieldConfiguration from '../configurations/fieldConfiguration.json';
import { appContext } from '../providers/appContextProvider';
import DateTimeFilter from  './Filters/DateTimeFilter';

function getFilterFields(fieldConfiguration) {
  return (fieldConfiguration.defaultConfiguration || []).filter(
    field => field.allowFiltering
  )
}

const Filter = props => {
  switch (props.type) {
    case "date": {
      return (<DateTimeFilter {...props} />);
    }
    default: {
      return (<div>{props.label}</div>);
      break;
    }
  }
}

export default () => {
  const { state, dispatch } = useContext(appContext);

  useEffect(() => { }, [state.filterDataSet]);
  const { filterDataSet } = state;
  return (
    <div>
      {getFilterFields(fieldConfiguration).map((field, id) => (
        <Filter label={field.label} values={(filterDataSet || {})[field.key]} type={field.filterType} key={`filter${id}`} filterKey={field.key} />
      ))}
    </div>
  )
}
