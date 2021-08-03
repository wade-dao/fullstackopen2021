import { NonSsnPatient, Patient } from '../types';
import patientEntries from '../../data/patientEntries';

const getEntries = (): Array<Patient> => {
  return patientEntries;
};

const getNonSsnEntries = (): Array<NonSsnPatient> => {
  return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  getNonSsnEntries,
  addEntry
};
