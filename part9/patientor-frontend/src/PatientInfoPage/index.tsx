import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { addPatientInfo, useStateValue } from '../state';
import { Patient } from '../types';
import GenderIcon from '../components/GenderIcon';
import { Paper } from '@material-ui/core';

const PatientInfoPage = () => {
  const [{ patientInfos }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    void fetchPatient();
  }, []);

  if (!id) return null;

  const fetchPatient = async () => {
    // Do not fetch if patient has already been fetched
    if (patientInfos[id]) return;

    try {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(addPatientInfo(patientFromApi));
    } catch (e) {
      console.error(e);
    }
  };

  const patient = patientInfos[id];

  if (!patient) return null;

  return (
    <div>
      <h1>
        {patient.name} <GenderIcon gender={patient.gender} />
      </h1>
      <Paper variant="outlined">ssn: {patient.ssn}</Paper>
      <Paper variant="outlined">occupation: {patient.occupation}</Paper>
    </div>
  );
};

export default PatientInfoPage;
