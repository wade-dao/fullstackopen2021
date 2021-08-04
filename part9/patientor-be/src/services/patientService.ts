import { NewPatient, NonSsnPatient, Patient } from '../types';
import patientEntries from '../../data/patientEntries';
import {v1 as uuid} from 'uuid';


const getEntries = (): Array<Patient> => {
  return patientEntries;
};

const getNonSsnEntries = (): Array<NonSsnPatient> => {
  return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addEntry = (entry: NewPatient): NonSsnPatient => {
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

export default {
  getEntries,
  getNonSsnEntries,
  addEntry
};
