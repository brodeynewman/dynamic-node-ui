import React from 'react';
import TextField from 'material-ui/TextField';

const Input = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <div className="width-full">
      <TextField
        className="width-full"
        {...input}
        placeholder={label}
        type={type}
      />
      <div>
        {
          touched &&
          (
            (error && <span className="font-size-small margin-bottom-10 text-color-firebrick">{error}</span>) ||
            (warning && <span className="font-size-small text-color-goldenrod">{warning}</span>)
          )
        }
      </div>
    </div>
  </div>
);

export default Input;
