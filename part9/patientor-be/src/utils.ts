import { NewPatient, Gender, Entry, EntryType } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isEntryType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };
const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries }: Fields): NewPatient => {
  const newPatientEntry: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDOB(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries)
  };

  return newPatientEntry;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender:' + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const parseDOB = (dob: unknown): string => {
  if (!dob || !isString(dob) || !isDate(dob)) {
    throw new Error('Incorrect or missing dateOfBirth: ' + dob);
  }
  return dob;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !Array.isArray(entries)) {
    throw new Error('Incorrect or missing entries: ' + entries);
  }

  entries.forEach(e => {
    if (!e.type || !isEntryType(e.type)) {
      throw new Error('Incorrect or missing type in entry : ' + e.id);
    }
  });

  return entries;
}

export default toNewPatientEntry;
