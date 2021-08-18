import { NewPatient, Gender, EntryType, NewEntry, HealthCheckRating, Entry } from "./types";

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

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const isDischarge = (param: any): param is { date: string, criteria: string } => {
  return isString(param.date) && isString (param.criteria) && isDate(param.date);
}

const isSickLeave = (param: any): param is { startDate: string, endDate: string } => {
  return isString(param.startDate) && isDate(param.startDate) && isString (param.endDate) && isDate(param.endDate);
}

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };
export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation, entries }: Fields): NewPatient => {
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
  if (entries)
  {
    if (!Array.isArray(entries)) {
      throw new Error('Incorrect or missing entries: ' + entries);
    }

    entries.forEach(e => {
      parseEntryType(e.type);
      parseDescription(e.description);
      parseDOE(e.date);
      parseSpecialist(e.specialist);
    });
    return entries;
  }
  else
    return [];
}

//Patient's Entry Validation
const parseEntryType = (type: unknown): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error('Incorrect or missing type:' + type);
  }

  return type;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }

  return description;
};

const parseDOE = (doe: unknown): string => {
  if (!doe || !isString(doe) || !isDate(doe)) {
    throw new Error('Incorrect or missing dateOfEntry: ' + doe);
  }
  return doe;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }

  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<string> => {
  if (!diagnosisCodes || !Array.isArray(diagnosisCodes)) {
    throw new Error('Incorrect diagnosisCodes: ' + diagnosisCodes);
  }

  diagnosisCodes.forEach(c => {
    if (!isString(c)) {
      throw new Error('Incorrect or missing code: ' + c);
    }
  });

  return diagnosisCodes;
};

const parseHealthCheckRating = (healthCheckRating: Number): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthCheckRating:' + healthCheckRating);
  }

  return healthCheckRating;
};

const parseDischarge = (discharge: unknown): { date: string, criteria: string } => {
  if (!discharge) {
    throw new Error('Missing discharge: ' + discharge);
  }

  if (!isDischarge(discharge)) {
    throw new Error('Incorrect discharge: ' + discharge);
  }
  return discharge;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employerName');
  }

  return employerName;
};

const parseSickLeave = (sickLeave: unknown): { startDate: string, endDate: string } | undefined => {
  if (sickLeave)
  {
    if (!isSickLeave(sickLeave)) {
      throw new Error('Incorrect or missing sickLeave: ' + sickLeave);
    }
    return sickLeave;
  }
  else
    return undefined;
};

type EntryFields = {
  description: unknown,
  date: unknown,
  specialist: unknown,
  diagnosisCodes?: unknown,
  type: unknown,
  healthCheckRating?: unknown,
  employerName?: unknown,
  sickLeave?: unknown,
  discharge?: unknown
};
export const toNewEntryOfPatient = ({ description, date, specialist, diagnosisCodes, type, healthCheckRating, employerName, sickLeave, discharge }: EntryFields): NewEntry => {
  const validatedType = parseEntryType(type);

  let validatedDiagnosisCodes: Array<string> = [];
  if (diagnosisCodes) {
    validatedDiagnosisCodes = parseDiagnosisCodes(diagnosisCodes);
  }

  switch (true) {
    case (validatedType === EntryType.HealthCheck):
      const newHealthCheckEntry: NewEntry = {
        description: parseDescription(description),
        date: parseDOE(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: validatedDiagnosisCodes.length !== 0 ? validatedDiagnosisCodes : undefined,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(Number(healthCheckRating))
      };
      return newHealthCheckEntry;
    case (validatedType === EntryType.Hospital):
      const newHospitalEntry: NewEntry = {
        description: parseDescription(description),
        date: parseDOE(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: validatedDiagnosisCodes.length !== 0 ? validatedDiagnosisCodes : undefined,
        type: 'Hospital',
        discharge: parseDischarge(discharge)
      };
      return newHospitalEntry;
    case (validatedType === EntryType.OccupationalHealthcare):
      const newOccupationalHealthcareEntry: NewEntry = {
        description: parseDescription(description),
        date: parseDOE(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: validatedDiagnosisCodes.length !== 0 ? validatedDiagnosisCodes : undefined,
        type: 'OccupationalHealthcare',
        employerName: parseEmployerName(employerName),
        sickLeave: parseSickLeave(sickLeave)
      };
      return newOccupationalHealthcareEntry;
    default:
      throw new Error('Incorrect or missing type:' + validatedType);;
  }  
};