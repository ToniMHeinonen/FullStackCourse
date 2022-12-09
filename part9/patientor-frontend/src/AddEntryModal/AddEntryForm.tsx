import { Button, Grid } from '@material-ui/core';
import { Field, Form, Formik, FormikErrors } from 'formik';
import {
  DiagnosisSelection,
  HealthCheckRatingOption,
  SelectField,
  StringOption,
  TextField,
} from '../components/FormField';
import { useStateValue } from '../state';
import { HealthCheckRating, NewEntry } from '../types';
import { isDate } from '../utils';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: -1, label: 'Select health rating' },
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'Low risk' },
  { value: HealthCheckRating.HighRisk, label: 'High risk' },
  { value: HealthCheckRating.CriticalRisk, label: 'Critical risk' },
];

const typeOptions: StringOption[] = [
  { value: 'HealthCheck', label: 'Health Check' },
  { value: 'Hospital', label: 'Hospital' },
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
      }}
      onSubmit={onSubmit}
      validate={(values) => {
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
        if (
          values.type === 'HealthCheck' &&
          !Object.values(HealthCheckRating).includes(values.healthCheckRating)
        ) {
          errors.healthCheckRating = requiredError;
        }
        if (values.type === 'Hospital') {
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
        }
        return errors;
      }}
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
              <SelectField
                label="Health Check Rating"
                name="healthCheckRating"
                options={healthCheckRatingOptions}
                error={{
                  message: errors.healthCheckRating,
                  touched: touched.healthCheckRating,
                }}
              />
            )}
            {values.type === 'Hospital' && (
              <Field
                label="Discharge date"
                placeholder="YYYY-MM-DD"
                name="discharge.date"
                component={TextField}
              />
            )}
            {values.type === 'Hospital' && (
              <Field
                label="Discharge criteria"
                placeholder="Criteria"
                name="discharge.criteria"
                component={TextField}
              />
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
