import { Diagnose } from '../types';
import diagnoseEntries from '../../data/diagnoseEntries';

const getEntries = (): Array<Diagnose> => {
  return diagnoseEntries;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};
