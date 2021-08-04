import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const nonSsnPatients = patientService.getNonSsnEntries();
  res.send(nonSsnPatients);
});

// router.post('/', ({ body: { name, dateOfBirth, ssn, gender, occupation } }, res) => {
router.post('/', (req, res) => {
  try {
    // const newPatientEntry = toNewPatientEntry({
    //   name, dateOfBirth, ssn, gender, occupation 
    // });
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addEntry(newPatientEntry);
    res.json(addedPatient);
  }
  catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;