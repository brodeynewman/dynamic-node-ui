import React from 'react';
import TextField from 'material-ui/TextField';

const Input = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <label>{label}</label>
    <div>
      <TextField
        {...input}
        placeholder={label}
        type={type}
      />
      <div>
        {
          touched &&
          (
            (error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>)
          )
        }
      </div>
    </div>
  </div>
);

export default Input;
