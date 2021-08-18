import React from "react";
import axios from "axios";
import { Button, Card, Container, Icon, Rating } from "semantic-ui-react";

import { Gender, Patient, HealthCheckEntry, OccupationalHealthCareEntry, HospitalEntry, Diagnosis, NewHealthCheckEntry } from "../types";
import { apiBaseUrl } from "../constants";
import { setPatientInfo, useStateValue } from "../state";
import { useParams } from "react-router-dom";
import AddPatientEntryModal from "../AddPatientEntryModal";

const PatientInfoPage = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find(p => p.id === id);

  React.useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const { data: patientInfoFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/api/patients/${id}`
        );
        dispatch(setPatientInfo(patientInfoFromApi));
      } catch (e) {
        setError(e.response?.data);
      }
    };

    if ((patient && (!patient?.ssn || typeof(!patient.ssn) === undefined || (!patient.ssn))) || !patient) {
      void fetchPatientInfo();
    }
  }, [dispatch, patient]);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatientEntry = async (values: NewHealthCheckEntry) => {
    try {
      if (!patient || typeof patient === 'undefined') {
        setError('Missing Patient error');
      }
      else {
        const { data: newPatient } = await axios.post<Patient>(
          `${apiBaseUrl}/api/patients/${patient.id}/entries`,
          values
        );
        dispatch(setPatientInfo(newPatient));
        closeModal();
      }
    } catch (e) {
      setError(e.response?.data);
    }
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const HealthCheckEntry = (props: HealthCheckEntry) => {
    return (
      <Card key={props.id}>
        <Card.Content>
          <Card.Header>
            {props.date} 
            <Icon name="user md" />
          </Card.Header>
          <Card.Meta><em>{props.description}</em></Card.Meta>
          {typeof props.diagnosisCodes === 'undefined'
            ? null
            : <DiagnosisList list={props.diagnosisCodes}/> 
          }
          <Card.Description>
            <Rating icon="heart" disabled rating={4 - props.healthCheckRating} maxRating={4} />
          </Card.Description>
        </Card.Content>
      </Card>
    );
  };

  const OccupationalHealthcare = (props: OccupationalHealthCareEntry) => {
    return (
      <Card key={props.id}>
        <Card.Content>
          <Card.Header>
            {props.date} 
            <Icon name="first aid" /> 
            {props.employerName}
          </Card.Header>
          <Card.Meta><em>{props.description}</em></Card.Meta>
          {typeof props.diagnosisCodes === 'undefined'
            ? null
            : <DiagnosisList list={props.diagnosisCodes}/> 
          }
        </Card.Content>
      </Card>
    );
  };

  interface DiagnosisListProps {
    list: Array<Diagnosis['code']>;
  }

  const DiagnosisList = (props: DiagnosisListProps) => {
    return (
      <Card.Description>
        <p>
          Diagnoses:
        </p>
        <ul>
          {props.list.map(c => 
            <li key={c}>{c} {Object.values(diagnoses).find(d => d.code === c)?.name}</li>)
          }
        </ul> 
      </Card.Description>
    );
  };

  const Hospital = (props: HospitalEntry) => {
    return (
      <Card key={props.id}>
        <Card.Content>
          <Card.Header>
            {props.date}
            <Icon name="hospital" />
          </Card.Header>
          <Card.Meta><em>{props.description}</em></Card.Meta>
          {typeof props.diagnosisCodes === 'undefined'
            ? null
            : <DiagnosisList list={props.diagnosisCodes}/>
          }
          <Card.Description>Discharged on {props.discharge.date}: {props.discharge.criteria}</Card.Description>
        </Card.Content>
      </Card>
    );
  };
  
  if (patient) {
    return (
      <div className="App">
        <Container>
          <h2>{patient.name} <Icon name={patient.gender === Gender.Male ? 'mars' : 'venus'} /></h2>
          <div>ssn: {patient.ssn}</div>
          <div>occupation: {patient.occupation}</div>
          <h3>entries</h3>
          {
            patient.entries.map(e => {
              switch (e.type) {
                case 'Hospital':
                  return <Hospital {...e} />;
                case 'HealthCheck':
                  return <HealthCheckEntry {...e} />;
                case 'OccupationalHealthcare':
                  return <OccupationalHealthcare {...e} />;
                default:
                  return assertNever(e);
              }
            })
          }
          <AddPatientEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewPatientEntry}
            error={error}
            onClose={closeModal}
          />
          <Button onClick={() => openModal()}>Add New Entry</Button>
        </Container>
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <h3>Not found</h3>
      </div>
    );
  }  
};

export default PatientInfoPage;
