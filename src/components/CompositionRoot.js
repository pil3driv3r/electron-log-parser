import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import React from 'react';
import FileBrowser from './FileBrowser';
import FileHost from './FileHost';
import FacetsHost from './FacetsHost';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow:1
  }
}));


export default function CompositionRoot(props) {
  const classes = useStyles();
  return(
    <div className = {classes.root}>
      <Grid container>
        <Grid item xs = {12}>
          <FileBrowser/>
        </Grid>
        <Grid item xs = {4}>
          <FacetsHost/>
        </Grid>
        <Grid item xs= {8}>
          <FileHost/>
        </Grid>
      </Grid>
    </div>
  )
}                                    
