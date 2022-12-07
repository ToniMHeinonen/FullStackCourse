import { ReactElement } from 'react';
import HealthStatusIcon from './HealthStatusIcon';
import WorkIcon from '@material-ui/icons/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import NextWeekIcon from '@mui/icons-material/NextWeek';
import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../types';
import DiagnosisInfo from './DiagnosisInfo';

const BaseEntryElement = ({
  entry,
  element,
  icon,
}: {
  entry: Entry;
  element: ReactElement | null;
  icon: ReactElement;
}): ReactElement => (
  <div>
    <div>
      {entry.date} {icon}
    </div>
    <div>
      <i>{entry.description}</i>
    </div>
    <ul>
      {entry.diagnosisCodes?.map((c) => (
        <li key={c}>
          <DiagnosisInfo code={c} />
        </li>
      ))}
    </ul>
    {element}
    <div>diagnose by {entry.specialist}</div>
  </div>
);

export const HospitalElement = ({
  entry,
}: {
  entry: HospitalEntry;
}): ReactElement => {
  const element = (
    <div>
      <h3>Discharge</h3>
      <ul>
        <li>Date: {entry.discharge.date}</li>
        <li>Criteria: {entry.discharge.criteria}</li>
      </ul>
    </div>
  );
  const icon = <MedicalServicesIcon />;
  return <BaseEntryElement entry={entry} element={element} icon={icon} />;
};

export const HealthCheckElement = ({
  entry,
}: {
  entry: HealthCheckEntry;
}): ReactElement => {
  const element = <HealthStatusIcon status={entry.healthCheckRating} />;
  const icon = <WorkIcon />;
  return <BaseEntryElement entry={entry} element={element} icon={icon} />;
};

export const OccupationalHealthcareElement = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}): ReactElement => {
  const element = entry.sickLeave ? (
    <div>
      Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
    </div>
  ) : null;
  const icon = (
    <>
      <NextWeekIcon /> <i>{entry.employerName}</i>
    </>
  );
  return <BaseEntryElement entry={entry} element={element} icon={icon} />;
};
