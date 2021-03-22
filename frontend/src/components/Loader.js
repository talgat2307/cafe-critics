import React from 'react';
import {
  Backdrop,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  backdrop: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    color: '#000',
    backgroundColor: '#fff',
  },
}));

const Loader = ({ open }) => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress color="inherit"/>
    </Backdrop>
  );
};

export default Loader;