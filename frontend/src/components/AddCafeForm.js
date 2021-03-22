import React from 'react';
import FormElement from '../components/Form/FormElement';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FileInput from '../components/Form/FileInput';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(3),
      width: '100%',
    },
  },
}));

const AddCafeForm = ({
  state,
  inputChangeHandler,
  fileChangeHandler,
  submitFormHandler,
  checkboxChangeHandler,
}) => {

  const classes = useStyles();
  return (
    <>
      <form
        onSubmit={submitFormHandler}
        className={classes.root}
      >
        <FormElement
          name='title'
          value={state.title}
          type='text'
          label='Title'
          onChange={inputChangeHandler}
          required
        />
        <FormElement
          name='description'
          value={state.description}
          type='text'
          label="Description"
          multiline
          rows={5}
          onChange={inputChangeHandler}
          required
        />
        <FormControl
          variant="outlined"
        >
          <FileInput
            label="Image"
            name="image"
            id="image"
            onChange={fileChangeHandler}
          />
        </FormControl>
        <Typography>
          By submitting this form, you agree that the following information will
          be submitted to the public domain,and administrators of this site will
          have full control over the said information
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              value={state.agreement}
              checked={state.agreement}
              onChange={checkboxChangeHandler}
              name="subscription"
              id="subscription"
              color={'primary'}
            />
          }
          label='I understand'
        />
        <Button
          type='submit'
          color='primary'
          variant='contained'
          id='btn-contacts-form'
        >
          Submit
        </Button>
      </form>
    </>
  );
};

AddCafeForm.propTypes = {
  state: PropTypes.object.isRequired,
  t: PropTypes.any,
  inputChangeHandler: PropTypes.func.isRequired,
  submitFormHandler: PropTypes.func.isRequired,
};

export default AddCafeForm;