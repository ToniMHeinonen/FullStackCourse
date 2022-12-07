import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';

import {
  Entry,
  EntryUnionWithoutID,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from '../types';

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: EntryUnionWithoutID): Entry => {
  const patient = findById(id);
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patient?.entries.push(newEntry);

  return newEntry;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry,
};
