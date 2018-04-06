import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Input from './Fields/Input';

/**
 * Handles validation for AddFactoryForm
 * @param {Object} values - the form values
 * @returns {Object} errors
 */
const validation = (values) => {
  const errors = {};

  if (!_.get(values, 'factory.length')) {
    errors.factory = 'Factory must have a name';
  }

  return errors;
};

/**
 * AddFactoryForm stateless Component
 * @param {Object} props - Component props
 * @returns {JSX}
 */
const AddFactoryForm = (props) => {
  const {
    handleSubmit,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="text-color-heading">Add a factory node</h4>
      <MuiThemeProvider>
        <Field
          name="factory"
          type="text"
          component={Input}
          label="Name"
        />
        <div className="margin-top-10">
          <RaisedButton
            onClick={handleSubmit}
            label="Submit"
            primary
          />
        </div>
      </MuiThemeProvider>
    </form>
  );
};

AddFactoryForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'addFactory',
  validate: validation,
})(AddFactoryForm);

