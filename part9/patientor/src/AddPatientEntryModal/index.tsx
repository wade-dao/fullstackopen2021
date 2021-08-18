import React from 'react';
import { Dropdown, Modal, Segment } from 'semantic-ui-react';
import { EntryType, NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthCareEntry } from '../types';
import AddHealthCheckEntryForm from './AddHealthCheckEntryForm';
import AddHospitalEntryForm from './AddHospitalEntryForm';
import AddOccupationalHealthCareEntryForm from './AddOccupationalHealthCareEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewHealthCheckEntry | NewHospitalEntry | NewOccupationalHealthCareEntry) => void;
  error?: string;
}

const entryTypeOptions = [
  { key: "HealthCheck", value: EntryType.HealthCheck, text: "HealthCheck" },
  { key: "Hospital", value: EntryType.Hospital, text: "Hospital" },
  { key: "OccupationalHealthcare", value: EntryType.OccupationalHealthcare, text: "OccupationalHealthcare" },
];

const AddPatientEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [entryType, setEntryType] = React.useState<string>("");

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <p><strong>Type of entry</strong></p>
        <Dropdown
          placeholder="Select entry type"
          fluid
          selection
          options={entryTypeOptions}
          onChange={(_event, data) => {setEntryType(String(data.value));}}
        />
        <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} show={entryType === "HealthCheck"}/>
        <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} show={entryType === "Hospital"}/>
        <AddOccupationalHealthCareEntryForm onSubmit={onSubmit} onCancel={onClose} show={entryType === "OccupationalHealthcare"}/>
      </Modal.Content>
    </Modal>
  );
};

export default AddPatientEntryModal;
