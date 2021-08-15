import React from "react";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { setPatientInfo, useStateValue } from "../state";
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
        dispatch(setPatientInfo(patientInfoFromApi));
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
          {/* <div>date of birth: {patient.dateOfBirth}</div> */}
          <h3>entries</h3>
          {
            patient.entries.map(e => 
              <div key={e.id}>
                <p>{e.date} <em>{e.description}</em></p>
                {e.diagnosisCodes === null ? null : <ul>
                  {e.diagnosisCodes?.map(c => <li key={c}>{c}</li>)}
                </ul> 
                }
              </div>)
          }
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
