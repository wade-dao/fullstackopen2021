import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
    type: "SET_PATIENT_INFO";
    payload: Patient;
  }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    };

export const setPatientList = (patientList: Patient[]): Action => {
  // return (dispatch: (arg0: { type: string; payload: Patient[]; }) => void) => {
  //   dispatch({ type: "SET_PATIENT_LIST", payload: patientList });
  // };
  return { type: "SET_PATIENT_LIST", payload: patientList };
};

export const setPatientInfo = (patientInfo: Patient): Action => {
  // return (dispatch: (arg0: { type: string; payload: Patient; }) => void) => {
  //   dispatch({ type: "SET_PATIENT_INFO", payload: patientInfo });
  // };
  return { type: "SET_PATIENT_INFO", payload: patientInfo };
};

export const addPatient = (newPatient: Patient): Action => {
  // return (dispatch: (arg0: { type: string; payload: Patient; }) => void) => {
  //   dispatch({ type: "ADD_PATIENT", payload: newPatient });
  // };
  return { type: "ADD_PATIENT", payload: newPatient };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_PATIENT_INFO":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
