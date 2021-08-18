import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntryOfPatient } from '../utils';

const router = express.Router();

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send();
  }
});

router.get('/', (_req, res) => {
  const publicPatients = patientService.getPublicPatients();
  res.send(publicPatients);
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntryOfPatient(req.body);
    const updatedPatient = patientService.addPatientEntry(req.params.id, newEntry);
    res.json(updatedPatient);
  }
  catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  }
  catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;