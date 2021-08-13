import React from "react";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";

const PatientInfoPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find(p => p.id === id);

  React.useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const { data: patientInfoFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/api/patients/${id}`
        );
        dispatch({ type: "SET_PATIENT_INFO", payload: patientInfoFromApi });
      } catch (e) {
        console.error(e);
      }
    };

    if (patient && (!patient?.ssn || typeof(!patient.ssn) === undefined || (!patient.ssn))) {
      void fetchPatientInfo();
    }
  }, [dispatch]);
  
  if (patient) {
    return (
      <div className="App">
        <Container>
          <h2>{patient.name} <Icon name={patient.gender === 'male' ? 'mars' : 'venus'} /></h2>
          <div>ssn: {patient.ssn}</div>
          <div>occupation: {patient.occupation}</div>
          <div>date of birth: {patient.dateOfBirth}</div>
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
