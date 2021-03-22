import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createCafe } from '../store/actions/cafeActions';
import AddCafeForm from '../components/AddCafeForm';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center'
  },
  alert: {
    marginTop: theme.spacing(2)
  }
}))


const AddCafe = () => {

  const [cafe, setCafe] = useState({
    title: '',
    description: '',
    image: '',
    agreement: false,
  });

  const [agreementError, setAgreementError] = useState({message: ''});

  const dispatch = useDispatch();

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCafe(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const fileChangeHandler = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setCafe((prevState) => ({
      ...prevState,
      [name]: file,
    }));
  };

  const checkboxChangeHandler = () => {
    if (!cafe.agreement) {
      setCafe(prevState => {
        return { ...prevState, agreement: true };
      });
    } else {
      setCafe(prevState => {
        return { ...prevState, agreement: false };
      });
    }
  }

  const submitFormHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(cafe).forEach((key) => {
      formData.append(key, cafe[key]);
    });

    if (!cafe.agreement) {
      setAgreementError({message: 'Field "I understand" is required to fill'});
    } else {
      dispatch(createCafe(formData));

      setCafe({
        title: '',
        description: '',
        image: '',
        agreement: false,
      });
    }

  };


  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant={'h4'}>Create new place</Typography>
      <Grid item xs={8}>
        {agreementError.message !== '' && !cafe.agreement ? <Alert className={classes.alert} severity={'error'}>{agreementError.message}</Alert> : null}
        <AddCafeForm
          state={cafe}
          content={cafe.description}
          fileChangeHandler={fileChangeHandler}
          inputChangeHandler={inputChangeHandler}
          submitFormHandler={submitFormHandler}
          checkboxChangeHandler={checkboxChangeHandler}
        />
      </Grid>
    </div>
  );
};

export default AddCafe;