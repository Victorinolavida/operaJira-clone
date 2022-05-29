import React,{ useReducer } from 'react'
import { Entry } from '../../interfaces'
import { EntriesContext,entriesReducer } from './'
import { v4 as uuidv4 } from 'uuid';

export interface EntriesProps {
  entries:Entry[]
}

const  ENTRIES_INITIAL_STATE: EntriesProps = {
  entries:[
    {
      _id: uuidv4(),
      description:' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem',
      status:'pending',
      createdAt:Date.now()+10000
    },
    {
      _id: uuidv4(),
      description:' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem',
      status:'finished',
      createdAt:Date.now()-10000
    },
    {
      _id: uuidv4(),
      description:' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem',
      status:'in-progress',
      createdAt:Date.now()
    }
  ]
}

interface Props{
  children?: React.ReactNode[] | React.ReactNode
}

export const EntriesProvider:React.FC<React.PropsWithChildren<Props>> = ({children}) => {

  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

  const addEntry = (description:string)=>{
    const newEntry:Entry ={
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: 'pending'
    }
    console.log(newEntry)
    dispatch({type:'add-Entry', payload:newEntry})
  }

  const updateEntry=(entry:Entry)=>{

    dispatch({type:'update-Entry',payload:entry})
  }

  return (
    <EntriesContext.Provider value={{
      ...state,

      addEntry,
      updateEntry
      
    }}>

        {children }
    </EntriesContext.Provider>
  )
}

