import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import React from 'react';
import FileBrowser from './FileBrowser';
import FileHost from './FileHost';
import FacetsHost from './FacetsHost';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CompositionRoot(props) {
  return(
    <Box sx={{ flexGrow: 1 }}>
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
    </Box>
  )
}                                    
