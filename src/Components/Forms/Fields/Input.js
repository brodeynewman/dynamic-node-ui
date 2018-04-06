import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

/**
 * Input stateless Component
 * @param {Object} input - input props
 * @param {string} label - input label
 * @param {string} type - input type
 * @param {Object} meta - input meta data
 * @returns {JSX}
 */
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

Input.propTypes = {
  input: PropTypes.objectOf(PropTypes.any).isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Input;
