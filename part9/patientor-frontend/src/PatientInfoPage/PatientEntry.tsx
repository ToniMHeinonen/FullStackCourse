import { ReactElement } from 'react';
import { Entry } from '../types';

const PatientEntry = ({ entry }: { entry: Entry }): ReactElement => {
  return (
    <>
      <div>
        {entry.date} <i>{entry.description}</i>
      </div>
      <ul>
        {entry.diagnosisCodes?.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </>
  );
};

export default PatientEntry;
