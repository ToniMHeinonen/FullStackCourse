import { FormikErrors } from 'formik';
import { HealthCheckRating, NewEntry } from '../types';
import { assertNever, isDate } from '../utils';

const validateEntryForm = (values: NewEntry) => {
  const requiredError = 'Field is required';
  const dateError = 'Date formatted incorrectly (correct: YYYY-MM-DD)';
  const errors: FormikErrors<NewEntry> = {};
  if (!values.description) {
    errors.description = requiredError;
  }
  if (!values.date) {
    errors.date = requiredError;
  } else if (!isDate(values.date)) {
    errors.date = dateError;
  }
  if (!values.specialist) {
    errors.specialist = requiredError;
  }
  switch (values.type) {
    case 'HealthCheck':
      if (
        !Object.values(HealthCheckRating).includes(values.healthCheckRating)
      ) {
        errors.healthCheckRating = requiredError;
      }
      break;
    case 'Hospital':
      if (!values.discharge.date) {
        errors.discharge = {
          ...errors.discharge,
          date: requiredError,
        };
      } else if (!isDate(values.discharge.date)) {
        errors.discharge = {
          ...errors.discharge,
          date: dateError,
        };
      }
      if (!values.discharge.criteria) {
        errors.discharge = {
          ...errors.discharge,
          criteria: requiredError,
        };
      }
      break;
    case 'OccupationalHealthcare':
      if (!values.employerName) {
        errors.employerName = requiredError;
      }
      // Check start date if end date is defined
      if (values.sickLeave.endDate) {
        if (!values.sickLeave.startDate) {
          errors.sickLeave = {
            ...errors.sickLeave,
            startDate: requiredError,
          };
        } else if (!isDate(values.sickLeave.startDate)) {
          errors.sickLeave = {
            ...errors.sickLeave,
            startDate: dateError,
          };
        }
      }
      // Check end date if start date is defined
      if (values.sickLeave.startDate) {
        if (!values.sickLeave.endDate) {
          errors.sickLeave = {
            ...errors.sickLeave,
            endDate: requiredError,
          };
        } else if (!isDate(values.sickLeave.endDate)) {
          errors.sickLeave = {
            ...errors.sickLeave,
            endDate: dateError,
          };
        }
      }
      break;
    default:
      return assertNever(values.type);
  }
  return errors;
};

export default validateEntryForm;
