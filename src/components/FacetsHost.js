import React from 'react';
import {appContext, ACTIONS} from '../contextProviders/appContextProvider';
import fieldConfiguration from '../configurations/fieldConfiguration.json';

function getFilterFields(fieldConfiguration) {
  return (fieldConfiguration.defaultConfiguration || []).filter(field => field.allowFiltering)
}

export default () => {
  return (
    <div>
      {getFilterFields(fieldConfiguration).map(field => 
        <div>{field.label}</div>
      )}
    </div>
  )
}
