import { ReactElement } from 'react';
import { Entry, Patient } from '../types';
import PatientEntry from './PatientEntry';

const PatientEntryList = ({ patient }: { patient: Patient }): ReactElement => {
  const entries: Entry[] = patient.entries;
  return (
    <div>
      <h2>entries</h2>
      {entries.map((e) => (
        <PatientEntry key={e.id} entry={e} />
      ))}
    </div>
  );
};

export default PatientEntryList;
