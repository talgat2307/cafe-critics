import React from "react";
import {
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const FormElement = ({
  id,
  name,
  label,
  value,
  onChange,
  required,
  error,
  type,
  select,
  options,
  multiline,
  rows,
  hide,
  checkbox,
  margin,
  size
}) => {
  let inputChildren = null;
  if (hide) return null;
  const onCheckboxChange = (event) => {
    event.target.value = event.target.checked;
    onChange(event);
  };
  if (checkbox)
    return (
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            onChange={onCheckboxChange}
            color="primary"
          />
        }
        label={label}
      />
    );
  if (options) {
    inputChildren = options.map((option) => (
      <MenuItem key={option} value={option} id={{ id }}>
        {option}
      </MenuItem>
    ));
  }
  return (
    <Grid item xs={12}>
      <TextField
        variant="outlined"
        fullWidth
        select={select}
        required={required}
        error={!!error}
        helperText={error}
        id={id}
        label={label}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={name}
        multiline={multiline}
        rows={rows}
        margin={margin}
        size={size}
      >
        {inputChildren}
      </TextField>
    </Grid>
  );
};

export default FormElement;
