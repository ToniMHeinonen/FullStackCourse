import {
  Entry,
  EntryType,
  EntryUnionWithoutID,
  Gender,
  HealthCheckRating,
  HospitalDischarge,
  NewEntry,
  NewHealthCheckEntry,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
  NewPatient,
  SickLeave,
} from './types';

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseString = (value: unknown, fieldName: string): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing ${fieldName}: ${value}`);
  }

  return value;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (rating === undefined || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing health check rating: ' + rating);
  }
  return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHospitalDischarge = (param: any): param is HospitalDischarge => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return
  return param.date && param.criteria;
};

const parseHospitalDischarge = (discharge: unknown): HospitalDischarge => {
  if (!discharge || !isHospitalDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }
  return discharge;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (param: any): param is SickLeave => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return
  return param.startDate && param.endDate;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sickLeave: ' + sickLeave);
  }
  return sickLeave;
};

type PatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: PatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(name, 'name'),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseString(occupation, 'occupation'),
    entries: entries as Entry[],
  };

  return newPatient;
};

type EntryFields = {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
  type: unknown;
  healthCheckRating?: unknown;
  discharge?: unknown;
  employerName?: unknown;
  sickLeave?: unknown;
};

export const toNewEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  type,
  healthCheckRating,
  discharge,
  employerName,
  sickLeave,
}: EntryFields): EntryUnionWithoutID => {
  const entryType = type as EntryType;

  const baseEntry: NewEntry = {
    description: parseString(description, 'description'),
    date: parseDate(date),
    specialist: parseString(specialist, 'specialist'),
    diagnosisCodes: diagnosisCodes ? (diagnosisCodes as string[]) : undefined,
    type: entryType,
  };

  const createEntry = () => {
    switch (entryType) {
      case 'HealthCheck':
        return {
          ...baseEntry,
          healthCheckRating: parseHealthCheckRating(healthCheckRating),
        } as NewHealthCheckEntry;
      case 'Hospital':
        return {
          ...baseEntry,
          discharge: parseHospitalDischarge(discharge),
        } as NewHospitalEntry;
      case 'OccupationalHealthcare':
        return {
          ...baseEntry,
          employerName: parseString(employerName, 'employerName'),
          sickLeave: sickLeave ? parseSickLeave(sickLeave) : undefined,
        } as NewOccupationalHealthcareEntry;
      default:
        return assertNever(entryType);
    }
  };

  return createEntry();
};
