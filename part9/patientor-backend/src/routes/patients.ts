import express from 'express';
import patientService from '../services/patientService';
import { convertError, toNewEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    res.status(400).json(convertError(error));
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = toNewEntry(req.body);

    const addedEntry = patientService.addEntry(req.params.id, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    res.status(400).json(convertError(error));
  }
});

export default router;
