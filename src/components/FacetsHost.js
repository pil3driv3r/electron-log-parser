import React, { useContext, useEffect } from 'react'
import { appContext, ACTIONS } from '../providers/appContextProvider'
import fieldConfiguration from '../configurations/fieldConfiguration.json'
import { addMinutes } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function getFilterFields (fieldConfiguration) {
  return (fieldConfiguration.defaultConfiguration || []).filter(
    field => field.allowFiltering
  )
}

const Filter = props => {
  let config = props.field;
  let element;
  switch (props.type) {
    case "date": {
      return (<DateTimeFilter {...props}/>);
    }
    default:{
      return (<div>{props.label}</div>);
      break;
    }
  }
}

const DateTimeFilter = props => {
  const { state, dispatch } = useContext(appContext)
  const classes = useStyles();
  let { min, max } = props;
  return (
    <form className={classes.container} noValidate>
      <TextField
        id='datetime-local'
        label='Next appointment'
        type='datetime-local'
        defaultValue= {min}
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
      />
    </form>
  )
}

const SetFilter = props => {}

export default () => {
  const { state, dispatch } = useContext(appContext)
  useEffect(() => {}, [state.filterDataSet])
  const { filterDataSet } = state;
  return (
    <div>
      {getFilterFields(fieldConfiguration).map(field => (
        <Filter label = {field.label} values= {(filterDataSet || {}) [field.key]} type={field.filterType}/>
      ))}
    </div>
  )
}
