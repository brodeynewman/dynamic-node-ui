import React from 'react';
import fp from 'lodash/fp';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Input from './Fields/Input';

/**
 * Lowest number bound
 */
const LOWEST_NUMBER_BOUND = 0;

/**
 * Highest number bound
 */
const HIGHEST_NUMBER_BOUND = 100000;

/**
 * Gets validation methods for each input
 */
const validationMapping = {
  numberOfChildren: (errors = {}, value) => {
    const newErrors = { ...errors };

    if (isNaN(value) || Number(value) > 15 || Number(value) < 0) {
      newErrors.numberOfChildren = 'Children must be between 0 and 15';
    }

    return newErrors;
  },
  lowerBound: (errors = {}, value, formValues) => {
    const newErrors = { ...errors };
    const { lowerBound, upperBound } = formValues;

    if (isNaN(value) || Number(value) > HIGHEST_NUMBER_BOUND || Number(value) < LOWEST_NUMBER_BOUND) {
      newErrors.lowerBound = `Lower must be between ${LOWEST_NUMBER_BOUND} and ${HIGHEST_NUMBER_BOUND}`;
    }

    if (Number(upperBound) < Number(lowerBound)) {
      newErrors.lowerBound = `Lower number must be greater than ${upperBound !== '' ? upperBound : 'Upper'}`;
    }

    return newErrors;
  },
  upperBound: (errors = {}, value) => {
    const newErrors = { ...errors };

    if (isNaN(value) || Number(value) > HIGHEST_NUMBER_BOUND || Number(value) < LOWEST_NUMBER_BOUND) {
      newErrors.upperBound = `Upper must be between ${LOWEST_NUMBER_BOUND} and ${HIGHEST_NUMBER_BOUND}`;
    }

    return newErrors;
  },
};

/**
 * Validates the redux-form
 * @param {Object} values - the form values
 * @returns {Object} object containing errors
 */
const validation = values => fp.compose(
  fp.reduce((acc, curr) => ({
    ...acc,
    ...curr,
  }), {}),
  fp.map(formKey => validationMapping[formKey]({}, values[formKey], values)),
  fp.keys,
)(values);

/**
 * AddFactoryForm Component
 * @extends {React.Component}
 */
class AddFactoryForm extends React.Component {
  componentWillMount() {
    const {
      initialize,
      lowerBound,
      upperBound,
      numberOfChildren,
    } = this.props;

    initialize({
      numberOfChildren,
      lowerBound,
      upperBound,
    });
  }

  render() {
    const {
      handleSubmit,
      name,
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <h4 className="text-color-heading">Add children to <b>{name}</b></h4>
        <div className="margin-top-10">
          <MuiThemeProvider>
            <span className="font-size-small">Number of children</span>
            <Field
              name="numberOfChildren"
              type="text"
              component={Input}
              label="15"
            />
            <span className="font-size-small">Lower bound</span>
            <Field
              name="lowerBound"
              type="text"
              component={Input}
              label="0"
            />
            <span className="font-size-small">Upper bound</span>
            <Field
              name="upperBound"
              type="text"
              component={Input}
              label="1000000"
            />
            <div className="margin-top-10">
              <RaisedButton
                onClick={handleSubmit}
                label="Submit"
                primary
              />
            </div>
          </MuiThemeProvider>
        </div>
      </form>
    );
  }
}

AddFactoryForm.propTypes = {
  initialize: PropTypes.func.isRequired,
  lowerBound: PropTypes.number.isRequired,
  upperBound: PropTypes.number.isRequired,
  numberOfChildren: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default reduxForm({
  form: 'addFactory',
  validate: validation,
})(AddFactoryForm);

