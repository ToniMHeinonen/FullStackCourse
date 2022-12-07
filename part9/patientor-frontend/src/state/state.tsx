import React, { createContext, useContext, useReducer } from 'react';
import { Diagnosis, Patient } from '../types';

import { Action } from './reducer';

export type State = {
  patients: { [id: string]: Patient };
  patientInfos: { [id: string]: Patient };
  diagnoses: { [id: string]: Diagnosis };
};

const initialState: State = {
  patients: {},
  patientInfos: {},
  diagnoses: {},
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({ reducer, children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);

export const setPatientList = (patients: Patient[]): Action => {
  return { type: 'SET_PATIENT_LIST', payload: patients };
};

export const addPatient = (patient: Patient): Action => {
  return { type: 'ADD_PATIENT', payload: patient };
};

export const addPatientInfo = (patient: Patient): Action => {
  return { type: 'ADD_PATIENT_INFO', payload: patient };
};

export const setDiagnosesList = (diagnoses: Diagnosis[]): Action => {
  return { type: 'SET_DIAGNOSES_LIST', payload: diagnoses };
};
