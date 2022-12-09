import { Field } from 'formik';
import { SelectField, TextField } from '../components/FormField';
import { ErrorProps, healthCheckRatingOptions } from './AddEntryForm';

export const HealthCheckFields = ({ errors, touched }: ErrorProps) => (
  <SelectField
    label="Health Check Rating"
    name="healthCheckRating"
    options={healthCheckRatingOptions}
    error={{
      message: errors.healthCheckRating,
      touched: touched.healthCheckRating,
    }}
  />
);

export const HospitalFields = () => (
  <>
    <Field
      label="Discharge date"
      placeholder="YYYY-MM-DD"
      name="discharge.date"
      component={TextField}
    />
    <Field
      label="Discharge criteria"
      placeholder="Criteria"
      name="discharge.criteria"
      component={TextField}
    />
  </>
);

export const OccupationalHealthcareFields = () => (
  <>
    <Field
      label="Employer name"
      placeholder="Employer"
      name="employerName"
      component={TextField}
    />
    <div>Define sick leave days (optional)</div>
    <Field
      label="Start date"
      placeholder="YYYY-MM-DD"
      name="sickLeave.startDate"
      component={TextField}
    />
    <Field
      label="End date"
      placeholder="YYYY-MM-DD"
      name="sickLeave.endDate"
      component={TextField}
    />
  </>
);
