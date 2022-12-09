import { Button, Grid } from '@material-ui/core';
import { Field, Form, Formik, FormikErrors, FormikTouched } from 'formik';
import {
  DiagnosisSelection,
  HealthCheckRatingOption,
  SelectField,
  StringOption,
  TextField,
} from '../components/FormField';
import { useStateValue } from '../state';
import { HealthCheckRating, NewEntry } from '../types';
import {
  HealthCheckFields,
  HospitalFields,
  OccupationalHealthcareFields,
} from './EntryFormFields';
import validateEntryForm from './EntryFormValidation';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

export interface ErrorProps {
  errors: FormikErrors<NewEntry>;
  touched: FormikTouched<NewEntry>;
}

export const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: -1, label: 'Select health rating' },
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'Low risk' },
  { value: HealthCheckRating.HighRisk, label: 'High risk' },
  { value: HealthCheckRating.CriticalRisk, label: 'Critical risk' },
];

const typeOptions: StringOption[] = [
  { value: 'HealthCheck', label: 'Health Check' },
  { value: 'Hospital', label: 'Hospital' },
  { value: 'OccupationalHealthcare', label: 'Occupational Healthcare' },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        type: 'HealthCheck',
        healthCheckRating: -1,
        discharge: { date: '', criteria: '' },
        employerName: '',
        sickLeave: { startDate: '', endDate: '' },
      }}
      onSubmit={onSubmit}
      validate={validateEntryForm}
    >
      {({
        isValid,
        dirty,
        setFieldValue,
        setFieldTouched,
        values,
        errors,
        touched,
      }) => {
        return (
          <Form className="form ui">
            <SelectField label="Type" name="type" options={typeOptions} />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="MD House"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {values.type === 'HealthCheck' && (
              <HealthCheckFields errors={errors} touched={touched} />
            )}
            {values.type === 'Hospital' && <HospitalFields />}
            {values.type === 'OccupationalHealthcare' && (
              <OccupationalHealthcareFields />
            )}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: 'left' }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
