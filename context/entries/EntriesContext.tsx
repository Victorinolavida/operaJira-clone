import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface PropsContext {
  entries:Entry[],
  addEntry: (description:string) => void,
  updateEntry:(entry:Entry) => void;
}


export const EntriesContext = createContext( {} as PropsContext);