import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/:id', (req, res) => {
  const patient = patientService.getEntry(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send();
  }
});

router.get('/', (_req, res) => {
  const nonSsnPatients = patientService.getPublicEntries();
  res.send(nonSsnPatients);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addEntry(newPatientEntry);
    res.json(addedPatient);
  }
  catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;