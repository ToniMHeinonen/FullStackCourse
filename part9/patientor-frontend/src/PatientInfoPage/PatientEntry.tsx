import { ReactElement } from 'react';
import { Entry } from '../types';
import { assertNever } from '../utils';
import {
  HealthCheckElement,
  HospitalElement,
  OccupationalHealthcareElement,
} from './EntryTypes';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalElement entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckElement entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareElement entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientEntry = ({ entry }: { entry: Entry }): ReactElement => {
  const style = {
    border: 'solid',
    borderWidth: '2px',
    borderRadius: '5px',
    padding: 5,
    marginBottom: 5,
  };

  return (
    <div style={style}>
      <EntryDetails entry={entry} />
    </div>
  );
};

export default PatientEntry;
