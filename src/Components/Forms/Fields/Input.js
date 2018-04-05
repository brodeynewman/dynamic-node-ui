import React from 'react';
import TextField from 'material-ui/TextField';

const Input = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
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
            (error && <span className="text-color-firebrick">{error}</span>) ||
            (warning && <span className="text-color-goldenrod">{warning}</span>)
          )
        }
      </div>
    </div>
  </div>
);

export default Input;
