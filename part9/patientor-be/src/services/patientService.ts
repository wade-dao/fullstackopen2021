import { NewPatient, PublicPatient, Patient, Entry, NewEntry, PatientDetails } from '../types';
import patientEntries from '../../data/patientEntries';
import {v1 as uuid} from 'uuid';


const getPatients = (): Array<Patient> => {
  return patientEntries;
};

const getPatient = (id: String): Patient | undefined => {
  return patientEntries.find(p => p.id === id);
}

const getPublicPatients = (): Array<PublicPatient> => {
  return patientEntries.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, name, dateOfBirth, gender, occupation, entries
  }));
};

const addPatient = (entry: NewPatient): PublicPatient => {
  const newEntry = {
    id: uuid(),
    ...entry
  };
  patientEntries.push(newEntry);

  const newNon = {
    id: newEntry.id,
    name: newEntry.name,
    dateOfBirth: newEntry.dateOfBirth,
    gender: newEntry.gender,
    occupation: newEntry.occupation
  };
  return newNon;
};

const addPatientEntry = (id: String, entry: NewEntry): PatientDetails => {
  const newEntry: Entry = {
    id: uuid(),
    ...entry
  };
  const patient = getPatient(id);
  patient?.entries.push(newEntry);

  const newPatient = {
    id: patient!.id,
    name: patient!.name,
    dateOfBirth: patient!.dateOfBirth,
    gender: patient!.gender,
    occupation: patient!.occupation,
    entries: patient!.entries
  };
  return newPatient;
}

export default {
  getPatients,
  getPatient,
  getPublicPatients,
  addPatient,
  addPatientEntry
};
