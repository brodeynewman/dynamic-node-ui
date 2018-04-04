import _ from 'lodash';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Input from './Fields/Input';

const validation = (values) => {
  const errors = {};

  if (!_.get(values, 'factory.length')) {
    errors.factory = 'Factory must have a name';
  }

  return errors;
};

const AddFactoryForm = (props) => {
  const {
    handleSubmit,
    onSubmit,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <MuiThemeProvider>
        <Field
          name="factory"
          type="text"
          placeholder="Factory Name"
          component={Input}
        />
        <div>
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

export default reduxForm({
  form: 'addFactory',
  validate: validation,
})(AddFactoryForm);

