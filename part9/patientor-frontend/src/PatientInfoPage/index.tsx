import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { addPatientEntry, addPatientInfo, useStateValue } from '../state';
import { Entry, Patient } from '../types';
import GenderIcon from '../components/GenderIcon';
import { Button, Paper } from '@material-ui/core';
import PatientEntryList from './PatientEntryList';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const PatientInfoPage = () => {
  const [{ patientInfos }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

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

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const submitNewPatient = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      patient.entries.push(newEntry);
      dispatch(addPatientEntry(patient));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.log('error', e?.response?.data);
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(
          String(e?.response?.data?.error) || 'Unrecognized axios error'
        );
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return (
    <div>
      <h1>
        {patient.name} <GenderIcon gender={patient.gender} />
      </h1>
      <Paper variant="outlined">ssn: {patient.ssn}</Paper>
      <Paper variant="outlined">occupation: {patient.occupation}</Paper>
      <PatientEntryList patient={patient} />
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        onClose={closeModal}
        error={error}
      />
      <Button variant="contained" color="secondary" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientInfoPage;
